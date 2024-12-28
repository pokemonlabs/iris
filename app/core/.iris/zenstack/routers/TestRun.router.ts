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

        createMany: procedure.input($Schema.TestRunInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testRun.createMany(input as any))),

        create: procedure.input($Schema.TestRunInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testRun.create(input as any))),

        deleteMany: procedure.input($Schema.TestRunInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testRun.deleteMany(input as any))),

        delete: procedure.input($Schema.TestRunInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testRun.delete(input as any))),

        findFirst: procedure.input($Schema.TestRunInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).testRun.findFirst(input as any))),

        findMany: procedure.input($Schema.TestRunInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).testRun.findMany(input as any))),

        findUnique: procedure.input($Schema.TestRunInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).testRun.findUnique(input as any))),

        updateMany: procedure.input($Schema.TestRunInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testRun.updateMany(input as any))),

        update: procedure.input($Schema.TestRunInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testRun.update(input as any))),

        count: procedure.input($Schema.TestRunInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).testRun.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TestRunCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestRunCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestRunCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestRunCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TestRunCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestRunCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestRunGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestRunGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestRunCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestRunCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestRunGetPayload<T>, Context>) => Promise<Prisma.TestRunGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TestRunDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestRunDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestRunDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestRunDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TestRunDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestRunDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestRunGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestRunGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestRunDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestRunDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestRunGetPayload<T>, Context>) => Promise<Prisma.TestRunGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TestRunFindFirstArgs, TData = Prisma.TestRunGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TestRunFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestRunGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestRunFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestRunFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestRunGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestRunGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TestRunFindManyArgs, TData = Array<Prisma.TestRunGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TestRunFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TestRunGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestRunFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestRunFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TestRunGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TestRunGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TestRunFindUniqueArgs, TData = Prisma.TestRunGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TestRunFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestRunGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestRunFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TestRunFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestRunGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestRunGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TestRunUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestRunUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestRunUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestRunUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TestRunUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestRunUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestRunGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestRunGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestRunUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestRunUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestRunGetPayload<T>, Context>) => Promise<Prisma.TestRunGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TestRunCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestRunCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TestRunCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TestRunCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TestRunCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TestRunCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TestRunCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestRunCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
