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

        createMany: procedure.input($Schema.AgentInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agent.createMany(input as any))),

        create: procedure.input($Schema.AgentInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agent.create(input as any))),

        deleteMany: procedure.input($Schema.AgentInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agent.deleteMany(input as any))),

        delete: procedure.input($Schema.AgentInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agent.delete(input as any))),

        findFirst: procedure.input($Schema.AgentInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).agent.findFirst(input as any))),

        findMany: procedure.input($Schema.AgentInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).agent.findMany(input as any))),

        findUnique: procedure.input($Schema.AgentInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).agent.findUnique(input as any))),

        updateMany: procedure.input($Schema.AgentInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agent.updateMany(input as any))),

        update: procedure.input($Schema.AgentInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agent.update(input as any))),

        count: procedure.input($Schema.AgentInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).agent.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AgentCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AgentCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AgentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AgentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AgentGetPayload<T>, Context>) => Promise<Prisma.AgentGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AgentDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AgentDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AgentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AgentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AgentGetPayload<T>, Context>) => Promise<Prisma.AgentGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AgentFindFirstArgs, TData = Prisma.AgentGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.AgentFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AgentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AgentFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AgentFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AgentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AgentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AgentFindManyArgs, TData = Array<Prisma.AgentGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.AgentFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AgentGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AgentFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AgentFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AgentGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AgentGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AgentFindUniqueArgs, TData = Prisma.AgentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AgentFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AgentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AgentFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AgentFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AgentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AgentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AgentUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AgentUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AgentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AgentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AgentGetPayload<T>, Context>) => Promise<Prisma.AgentGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.AgentCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AgentCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.AgentCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.AgentCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.AgentCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.AgentCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.AgentCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AgentCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
