import { Utility } from '@/core/helpers/utility'
import { Organization, User } from '@prisma/client'
import { useLocation, useParams } from '@remix-run/react'
import { useEffect, useMemo } from 'react'
import { useUserContext } from '~/core/context'
import { Api } from '~/core/trpc'
import route from '~/routes/_auth.login_/route'

const getStorageKey = (user: User) => {
  return `organizationId-${user?.id}`
}

const getOrganizationIdStored = (user: User) => {
  const key = getStorageKey(user)
  return typeof window !== 'undefined' ? localStorage.getItem(key) : null
}

const storeOrganizationId = (user: User, organization: Organization) => {
  if (user) {
    const key = getStorageKey(user)
    localStorage.setItem(key, organization.id)
  }
}

const removeOrganizationId = (user: User) => {
  if (user) {
    const key = getStorageKey(user)
    localStorage.removeItem(key)
  }
}

export const useOrganizationContext = (options: { user: User }) => {
  const params = useParams<{ organizationId?: string }>()

  /* --------------------------------- QUERIES -------------------------------- */

  const queryOrganizations = Api.organization.findMany.useQuery(
    {
      where: { roles: { some: { userId: options.user?.id } } },
      orderBy: { name: 'asc' },
    },
    { enabled: false, initialData: [] },
  )

  const organizationId =
    params.organizationId ??
    getOrganizationIdStored(options.user) ??
    queryOrganizations.data?.[0]?.id

  const queryOrganization = Api.organization.findUnique.useQuery(
    {
      where: { id: organizationId },
      include: { roles: { where: { userId: options.user?.id } } },
    },
    {
      enabled: false,
      onSuccess(organization) {
        if (!organization) {
          window.location.replace('/home')
        }
      },
    },
  )

  /* -------------------------------- COMPUTED -------------------------------- */

  const isLoadingOrganization =
    queryOrganization.isLoading ||
    queryOrganization.isRefetching ||
    queryOrganizations.isLoading ||
    queryOrganizations.isRefetching

  const organization = queryOrganization.data
  const organizations = queryOrganizations.data
  const organizationRoles = organization?.roles ?? []

  /* --------------------------------- EFFECTS -------------------------------- */

  useEffect(() => {
    handleRefreshOrganizations()
  }, [options.user?.id])

  useEffect(() => {
    handleRefreshOrganization()
  }, [organizationId, options.user?.id])

  useEffect(() => {
    if (organization?.id) {
      storeOrganizationId(options.user, organization)
    } else {
      removeOrganizationId(options.user)
    }
  }, [organization])

  /* -------------------------------- HANDLERS -------------------------------- */

  const checkOrganizationRole = (roleName: string) => {
    return !!organizationRoles?.find(role => role.name === roleName)
  }

  const handleRefreshOrganizations = async () => {
    const canFetch = Utility.isDefined(options.user?.id)

    if (canFetch) {
      await queryOrganizations.refetch().catch(() => { })
    }
  }

  const handleRefreshOrganization = async () => {
    const canFetch =
      Utility.isDefined(organizationId) && Utility.isDefined(options.user)

    if (canFetch) {
      await queryOrganization.refetch().catch(() => { })
    }
  }

  return {
    isLoadingOrganization,
    organizations,
    organization,
    organizationRoles,
    refetchOrganization: handleRefreshOrganization,
    refetchOrganizations: handleRefreshOrganizations,
    checkOrganizationRole,
  }
}

const CACHE_KEY = 'subscription_status';
const CACHE_DURATION = 30 * 1000;

export const useOrganizationSubscription = () => {
  const location = useLocation();
  const { organization } = useUserContext();
  const endpoint = useMemo(() => location.pathname.split("/").pop() || '', [location.pathname]);

  // Get subscriptions and their associated products
  const subscriptionsQuery = Api.billing.findManySubscriptions.useQuery(
    { organizationId: organization?.id },
    {
      enabled: !!organization?.id,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  const productIds = useMemo(() =>
    subscriptionsQuery.data?.map(sub => sub.productId) || [],
    [subscriptionsQuery.data]
  );

  // Get all products
  const productsQuery = Api.billing.findProductsByIds.useQuery(
    { ids: productIds },
    {
      enabled: !!organization?.id && productIds.length > 0,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  const subscriptionStatus = useMemo(() => {
    if (!organization || !subscriptionsQuery.data || !productsQuery.data) {
      return {
        hasActiveSubscription: false,
        isLoading: subscriptionsQuery.isLoading || productsQuery.isLoading
      };
    }

    try {
      // Check cache first
      const cachedData = getCachedSubscriptionStatus(endpoint);
      if (cachedData) {
        return {
          hasActiveSubscription: cachedData.hasAccess,
          isLoading: false
        };
      }

      // Check if any of the subscribed products have the required endpoint
      const hasRequired = productsQuery.data
        .some(product => product.metadata?.routes?.includes(endpoint));

      // Cache the result
      cacheSubscriptionStatus(endpoint, hasRequired);

      return {
        hasActiveSubscription: hasRequired,
        isLoading: false
      };
    } catch (error) {
      console.error('Error checking subscription:', error);
      return {
        hasActiveSubscription: false,
        isLoading: false
      };
    }
  }, [
    organization,
    endpoint,
    subscriptionsQuery.data,
    productsQuery.data,
    subscriptionsQuery.isLoading,
    productsQuery.isLoading
  ]);

  return subscriptionStatus;
};

const cacheSubscriptionStatus = (route: string, hasAccess: boolean) => {
  const data = {
    hasAccess,
    timestamp: Date.now(),
  };
  localStorage.setItem(`${CACHE_KEY}_${route}`, JSON.stringify(data));
};

const getCachedSubscriptionStatus = (location: string) => {

  const cached = localStorage.getItem(`${CACHE_KEY}_${route}`);
  if (!cached) return null;

  const data = JSON.parse(cached);
  const isExpired = Date.now() - data.timestamp > CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(`${CACHE_KEY}_${route}`);
    return null;
  }

  return data;
};


export type OrganizationContextType = ReturnType<typeof useOrganizationContext>
