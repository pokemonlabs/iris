/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createProjectRouter from "./Project.router";
import createTestRouter from "./Test.router";
import createTestRunRouter from "./TestRun.router";
import createTestStepRouter from "./TestStep.router";
import createTestShareRouter from "./TestShare.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createAgentRouter from "./Agent.router";
import createIntegrationRouter from "./Integration.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as ProjectClientType } from "./Project.router";
import { ClientType as TestClientType } from "./Test.router";
import { ClientType as TestRunClientType } from "./TestRun.router";
import { ClientType as TestStepClientType } from "./TestStep.router";
import { ClientType as TestShareClientType } from "./TestShare.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as AgentClientType } from "./Agent.router";
import { ClientType as IntegrationClientType } from "./Integration.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        project: createProjectRouter(router, procedure),
        test: createTestRouter(router, procedure),
        testRun: createTestRunRouter(router, procedure),
        testStep: createTestStepRouter(router, procedure),
        testShare: createTestShareRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        agent: createAgentRouter(router, procedure),
        integration: createIntegrationRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    project: ProjectClientType<AppRouter>;
    test: TestClientType<AppRouter>;
    testRun: TestRunClientType<AppRouter>;
    testStep: TestStepClientType<AppRouter>;
    testShare: TestShareClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    agent: AgentClientType<AppRouter>;
    integration: IntegrationClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}
