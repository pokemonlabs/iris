/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.OrganizationRoleInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organizationRole.createMany(input as any))),

        create: procedure.input($Schema.OrganizationRoleInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organizationRole.create(input as any))),

        deleteMany: procedure.input($Schema.OrganizationRoleInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organizationRole.deleteMany(input as any))),

        delete: procedure.input($Schema.OrganizationRoleInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organizationRole.delete(input as any))),

        findFirst: procedure.input($Schema.OrganizationRoleInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).organizationRole.findFirst(input as any))),

        findMany: procedure.input($Schema.OrganizationRoleInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).organizationRole.findMany(input as any))),

        findUnique: procedure.input($Schema.OrganizationRoleInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).organizationRole.findUnique(input as any))),

        updateMany: procedure.input($Schema.OrganizationRoleInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organizationRole.updateMany(input as any))),

        update: procedure.input($Schema.OrganizationRoleInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organizationRole.update(input as any))),

        count: procedure.input($Schema.OrganizationRoleInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).organizationRole.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.OrganizationRoleCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationRoleCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationRoleCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationRoleCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.OrganizationRoleCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationRoleCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationRoleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationRoleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationRoleCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationRoleCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationRoleGetPayload<T>, Context>) => Promise<Prisma.OrganizationRoleGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.OrganizationRoleDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationRoleDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationRoleDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationRoleDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.OrganizationRoleDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationRoleDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationRoleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationRoleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationRoleDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationRoleDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationRoleGetPayload<T>, Context>) => Promise<Prisma.OrganizationRoleGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.OrganizationRoleFindFirstArgs, TData = Prisma.OrganizationRoleGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.OrganizationRoleFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OrganizationRoleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationRoleFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.OrganizationRoleFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OrganizationRoleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OrganizationRoleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.OrganizationRoleFindManyArgs, TData = Array<Prisma.OrganizationRoleGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.OrganizationRoleFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.OrganizationRoleGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationRoleFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.OrganizationRoleFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.OrganizationRoleGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.OrganizationRoleGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.OrganizationRoleFindUniqueArgs, TData = Prisma.OrganizationRoleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.OrganizationRoleFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OrganizationRoleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationRoleFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.OrganizationRoleFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OrganizationRoleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OrganizationRoleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.OrganizationRoleUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationRoleUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationRoleUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationRoleUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.OrganizationRoleUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationRoleUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationRoleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationRoleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationRoleUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationRoleUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationRoleGetPayload<T>, Context>) => Promise<Prisma.OrganizationRoleGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.OrganizationRoleCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.OrganizationRoleCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.OrganizationRoleCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.OrganizationRoleCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.OrganizationRoleCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.OrganizationRoleCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.OrganizationRoleCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.OrganizationRoleCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
