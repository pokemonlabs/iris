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

        createMany: procedure.input($Schema.OrganizationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.createMany(input as any))),

        create: procedure.input($Schema.OrganizationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.create(input as any))),

        deleteMany: procedure.input($Schema.OrganizationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.deleteMany(input as any))),

        delete: procedure.input($Schema.OrganizationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.delete(input as any))),

        findFirst: procedure.input($Schema.OrganizationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).organization.findFirst(input as any))),

        findMany: procedure.input($Schema.OrganizationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).organization.findMany(input as any))),

        findUnique: procedure.input($Schema.OrganizationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).organization.findUnique(input as any))),

        updateMany: procedure.input($Schema.OrganizationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.updateMany(input as any))),

        update: procedure.input($Schema.OrganizationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.update(input as any))),

        count: procedure.input($Schema.OrganizationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).organization.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.OrganizationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.OrganizationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationGetPayload<T>, Context>) => Promise<Prisma.OrganizationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.OrganizationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.OrganizationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationGetPayload<T>, Context>) => Promise<Prisma.OrganizationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.OrganizationFindFirstArgs, TData = Prisma.OrganizationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.OrganizationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.OrganizationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OrganizationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.OrganizationFindManyArgs, TData = Array<Prisma.OrganizationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.OrganizationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.OrganizationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.OrganizationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.OrganizationFindUniqueArgs, TData = Prisma.OrganizationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.OrganizationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.OrganizationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OrganizationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.OrganizationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.OrganizationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationGetPayload<T>, Context>) => Promise<Prisma.OrganizationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.OrganizationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.OrganizationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.OrganizationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.OrganizationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.OrganizationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.OrganizationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.OrganizationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.OrganizationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
