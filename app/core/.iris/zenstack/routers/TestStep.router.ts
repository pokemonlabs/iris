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

        createMany: procedure.input($Schema.TestStepInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testStep.createMany(input as any))),

        create: procedure.input($Schema.TestStepInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testStep.create(input as any))),

        deleteMany: procedure.input($Schema.TestStepInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testStep.deleteMany(input as any))),

        delete: procedure.input($Schema.TestStepInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testStep.delete(input as any))),

        findFirst: procedure.input($Schema.TestStepInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).testStep.findFirst(input as any))),

        findMany: procedure.input($Schema.TestStepInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).testStep.findMany(input as any))),

        findUnique: procedure.input($Schema.TestStepInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).testStep.findUnique(input as any))),

        updateMany: procedure.input($Schema.TestStepInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testStep.updateMany(input as any))),

        update: procedure.input($Schema.TestStepInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).testStep.update(input as any))),

        count: procedure.input($Schema.TestStepInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).testStep.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TestStepCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestStepCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestStepCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestStepCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TestStepCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestStepCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestStepGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestStepGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestStepCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestStepCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestStepGetPayload<T>, Context>) => Promise<Prisma.TestStepGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TestStepDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestStepDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestStepDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestStepDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TestStepDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestStepDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestStepGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestStepGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestStepDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestStepDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestStepGetPayload<T>, Context>) => Promise<Prisma.TestStepGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TestStepFindFirstArgs, TData = Prisma.TestStepGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TestStepFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestStepGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestStepFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestStepFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestStepGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestStepGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TestStepFindManyArgs, TData = Array<Prisma.TestStepGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TestStepFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TestStepGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestStepFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TestStepFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TestStepGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TestStepGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TestStepFindUniqueArgs, TData = Prisma.TestStepGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TestStepFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TestStepGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TestStepFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TestStepFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TestStepGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TestStepGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TestStepUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestStepUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestStepUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestStepUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TestStepUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TestStepUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TestStepGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TestStepGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TestStepUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TestStepUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TestStepGetPayload<T>, Context>) => Promise<Prisma.TestStepGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TestStepCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestStepCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TestStepCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TestStepCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TestStepCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TestStepCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TestStepCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TestStepCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
