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

        createMany: procedure.input($Schema.TestShareInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testShare.createMany(input as any))),

        create: procedure.input($Schema.TestShareInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testShare.create(input as any))),

        deleteMany: procedure.input($Schema.TestShareInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testShare.deleteMany(input as any))),

        delete: procedure.input($Schema.TestShareInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testShare.delete(input as any))),

        findFirst: procedure.input($Schema.TestShareInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).testShare.findFirst(input as any))),

        findMany: procedure.input($Schema.TestShareInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).testShare.findMany(input as any))),

        findUnique: procedure.input($Schema.TestShareInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).testShare.findUnique(input as any))),

        updateMany: procedure.input($Schema.TestShareInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testShare.updateMany(input as any))),

        update: procedure.input($Schema.TestShareInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testShare.update(input as any))),

        count: procedure.input($Schema.TestShareInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).testShare.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TestShareCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestShareCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestShareCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestShareCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TestShareCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestShareCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestShareGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestShareGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestShareCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestShareCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestShareGetPayload<T>, Context>) => Promise<Prisma.TestShareGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TestShareDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestShareDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestShareDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestShareDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TestShareDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestShareDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestShareGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestShareGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestShareDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestShareDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestShareGetPayload<T>, Context>) => Promise<Prisma.TestShareGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TestShareFindFirstArgs, TData = Prisma.TestShareGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TestShareFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestShareGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestShareFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestShareFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestShareGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestShareGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TestShareFindManyArgs, TData = Array<Prisma.TestShareGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TestShareFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TestShareGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestShareFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestShareFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TestShareGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TestShareGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TestShareFindUniqueArgs, TData = Prisma.TestShareGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TestShareFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestShareGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestShareFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TestShareFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestShareGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestShareGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TestShareUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestShareUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestShareUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestShareUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TestShareUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestShareUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestShareGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestShareGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestShareUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestShareUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestShareGetPayload<T>, Context>) => Promise<Prisma.TestShareGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TestShareCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestShareCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TestShareCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TestShareCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TestShareCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TestShareCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TestShareCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestShareCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
