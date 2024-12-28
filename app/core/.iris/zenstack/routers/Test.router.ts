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

        createMany: procedure.input($Schema.TestInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).test.createMany(input as any))),

        create: procedure.input($Schema.TestInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).test.create(input as any))),

        deleteMany: procedure.input($Schema.TestInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).test.deleteMany(input as any))),

        delete: procedure.input($Schema.TestInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).test.delete(input as any))),

        findFirst: procedure.input($Schema.TestInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).test.findFirst(input as any))),

        findMany: procedure.input($Schema.TestInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).test.findMany(input as any))),

        findUnique: procedure.input($Schema.TestInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).test.findUnique(input as any))),

        updateMany: procedure.input($Schema.TestInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).test.updateMany(input as any))),

        update: procedure.input($Schema.TestInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).test.update(input as any))),

        count: procedure.input($Schema.TestInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).test.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TestCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TestCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestGetPayload<T>, Context>) => Promise<Prisma.TestGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TestDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TestDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestGetPayload<T>, Context>) => Promise<Prisma.TestGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TestFindFirstArgs, TData = Prisma.TestGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TestFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TestFindManyArgs, TData = Array<Prisma.TestGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TestFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TestGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TestGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TestGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TestFindUniqueArgs, TData = Prisma.TestGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TestFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TestFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TestUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TestUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestGetPayload<T>, Context>) => Promise<Prisma.TestGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TestCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TestCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TestCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TestCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TestCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TestCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
