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

        createMany: procedure.input($Schema.IntegrationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).integration.createMany(input as any))),

        create: procedure.input($Schema.IntegrationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).integration.create(input as any))),

        deleteMany: procedure.input($Schema.IntegrationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).integration.deleteMany(input as any))),

        delete: procedure.input($Schema.IntegrationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).integration.delete(input as any))),

        findFirst: procedure.input($Schema.IntegrationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).integration.findFirst(input as any))),

        findMany: procedure.input($Schema.IntegrationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).integration.findMany(input as any))),

        findUnique: procedure.input($Schema.IntegrationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).integration.findUnique(input as any))),

        updateMany: procedure.input($Schema.IntegrationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).integration.updateMany(input as any))),

        update: procedure.input($Schema.IntegrationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).integration.update(input as any))),

        count: procedure.input($Schema.IntegrationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).integration.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.IntegrationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.IntegrationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.IntegrationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.IntegrationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.IntegrationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.IntegrationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.IntegrationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.IntegrationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.IntegrationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.IntegrationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.IntegrationGetPayload<T>, Context>) => Promise<Prisma.IntegrationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.IntegrationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.IntegrationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.IntegrationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.IntegrationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.IntegrationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.IntegrationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.IntegrationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.IntegrationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.IntegrationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.IntegrationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.IntegrationGetPayload<T>, Context>) => Promise<Prisma.IntegrationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.IntegrationFindFirstArgs, TData = Prisma.IntegrationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.IntegrationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.IntegrationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.IntegrationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.IntegrationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.IntegrationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.IntegrationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.IntegrationFindManyArgs, TData = Array<Prisma.IntegrationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.IntegrationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.IntegrationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.IntegrationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.IntegrationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.IntegrationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.IntegrationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.IntegrationFindUniqueArgs, TData = Prisma.IntegrationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.IntegrationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.IntegrationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.IntegrationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.IntegrationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.IntegrationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.IntegrationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.IntegrationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.IntegrationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.IntegrationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.IntegrationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.IntegrationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.IntegrationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.IntegrationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.IntegrationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.IntegrationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.IntegrationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.IntegrationGetPayload<T>, Context>) => Promise<Prisma.IntegrationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.IntegrationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.IntegrationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.IntegrationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.IntegrationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.IntegrationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.IntegrationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.IntegrationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.IntegrationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
