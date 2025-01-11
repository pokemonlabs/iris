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

        createMany: procedure.input($Schema.PwaSubscriptionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pwaSubscription.createMany(input as any))),

        create: procedure.input($Schema.PwaSubscriptionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pwaSubscription.create(input as any))),

        deleteMany: procedure.input($Schema.PwaSubscriptionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pwaSubscription.deleteMany(input as any))),

        delete: procedure.input($Schema.PwaSubscriptionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pwaSubscription.delete(input as any))),

        findFirst: procedure.input($Schema.PwaSubscriptionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).pwaSubscription.findFirst(input as any))),

        findMany: procedure.input($Schema.PwaSubscriptionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).pwaSubscription.findMany(input as any))),

        findUnique: procedure.input($Schema.PwaSubscriptionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).pwaSubscription.findUnique(input as any))),

        updateMany: procedure.input($Schema.PwaSubscriptionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pwaSubscription.updateMany(input as any))),

        update: procedure.input($Schema.PwaSubscriptionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pwaSubscription.update(input as any))),

        count: procedure.input($Schema.PwaSubscriptionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).pwaSubscription.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PwaSubscriptionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PwaSubscriptionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PwaSubscriptionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PwaSubscriptionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PwaSubscriptionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PwaSubscriptionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PwaSubscriptionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PwaSubscriptionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PwaSubscriptionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PwaSubscriptionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PwaSubscriptionGetPayload<T>, Context>) => Promise<Prisma.PwaSubscriptionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PwaSubscriptionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PwaSubscriptionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PwaSubscriptionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PwaSubscriptionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PwaSubscriptionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PwaSubscriptionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PwaSubscriptionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PwaSubscriptionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PwaSubscriptionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PwaSubscriptionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PwaSubscriptionGetPayload<T>, Context>) => Promise<Prisma.PwaSubscriptionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PwaSubscriptionFindFirstArgs, TData = Prisma.PwaSubscriptionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PwaSubscriptionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PwaSubscriptionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PwaSubscriptionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PwaSubscriptionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PwaSubscriptionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PwaSubscriptionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PwaSubscriptionFindManyArgs, TData = Array<Prisma.PwaSubscriptionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PwaSubscriptionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PwaSubscriptionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PwaSubscriptionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PwaSubscriptionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PwaSubscriptionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PwaSubscriptionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PwaSubscriptionFindUniqueArgs, TData = Prisma.PwaSubscriptionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PwaSubscriptionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PwaSubscriptionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PwaSubscriptionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PwaSubscriptionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PwaSubscriptionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PwaSubscriptionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PwaSubscriptionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PwaSubscriptionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PwaSubscriptionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PwaSubscriptionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PwaSubscriptionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PwaSubscriptionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PwaSubscriptionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PwaSubscriptionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PwaSubscriptionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PwaSubscriptionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PwaSubscriptionGetPayload<T>, Context>) => Promise<Prisma.PwaSubscriptionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PwaSubscriptionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PwaSubscriptionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PwaSubscriptionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PwaSubscriptionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PwaSubscriptionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PwaSubscriptionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PwaSubscriptionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PwaSubscriptionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
