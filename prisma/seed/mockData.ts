import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('4dc226f3-e9c4-42bb-ab81-f2ce1ff2220c', '1Jordy_Torphy@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('96dcbc06-2180-4cd7-9958-1ec073bc4ef1', '9Margret_Waelchi@gmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('f6a9abda-9c2e-4475-911b-091790f70954', '25Gwendolyn.Steuber3@hotmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e13abe39-4dcf-4abf-a7b5-e3e863589af6', '33Scottie_Skiles84@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('71e5e294-35bf-4c87-a3c3-12bcc0c62cfb', '41Xzavier_Watsica@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e7d5f515-9c69-417f-8a7c-9c70d4e1e992', '49Celestino32@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('3cd37428-b34f-4191-b4b2-eea911bb589d', '57Nikki_Connelly@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2d42c30b-e99a-4d03-b15b-248f7b6909f6', '65Franz.Rosenbaum@hotmail.com', 'Charlie Black', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('71a96bbc-fb18-472f-94ca-9780149eea16', '73Ethelyn_Langosh@hotmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('693f70ef-7c65-4943-9f5d-d617a3d59d00', 'NextGen Software Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('4885795d-cbf1-4a9a-9919-9e87df473ca2', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('75fe4f8a-9e1e-4e04-b198-dc5cdb3164e1', 'AI Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('812b9f86-6bbb-4ade-9cc8-8365080f6390', 'NextGen Software Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('45c215a2-2237-4c3c-be12-f6f435f33359', 'FutureTech Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('65594431-406a-4c75-a2ab-75193fd3f80e', 'Digital Pioneers Co.', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('4dae2065-6ee3-4269-b787-8ff65bc64654', 'AI Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ce4acc41-4231-40d5-a4f8-46d53b324915', 'NextGen Software Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('c49670fb-fa53-4d17-8da2-3c0cb5da906e', 'FutureTech Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ef8bb731-b58b-42d9-90d0-da61b709971d', 'Digital Pioneers Co.', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('26d1324f-8fbc-4c6e-8e7b-9d04d6914f2a', 'Administrator', 'f6a9abda-9c2e-4475-911b-091790f70954', '4885795d-cbf1-4a9a-9919-9e87df473ca2');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('f01e220a-f90a-4aa0-aa5f-2d523bb82371', 'Quality Analyst', '4dc226f3-e9c4-42bb-ab81-f2ce1ff2220c', '4885795d-cbf1-4a9a-9919-9e87df473ca2');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('1c4596cf-a914-40b5-ba1d-1cd5e9eb75fd', 'Project Manager', '4dc226f3-e9c4-42bb-ab81-f2ce1ff2220c', '693f70ef-7c65-4943-9f5d-d617a3d59d00');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('5792200f-dafd-4d3d-aed6-c52d5cfa55bc', 'Quality Analyst', '3cd37428-b34f-4191-b4b2-eea911bb589d', '693f70ef-7c65-4943-9f5d-d617a3d59d00');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('77ba6b13-5f97-4a9b-abed-3d878dd6b8bb', 'Administrator', 'e13abe39-4dcf-4abf-a7b5-e3e863589af6', '693f70ef-7c65-4943-9f5d-d617a3d59d00');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('d05d65e3-cb0a-4ea3-b12f-ffafdaeab41c', 'Project Manager', 'f6a9abda-9c2e-4475-911b-091790f70954', 'c49670fb-fa53-4d17-8da2-3c0cb5da906e');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('f147e04c-2f8b-4470-9fe8-1ab571c9315d', 'DevOps Specialist', '3cd37428-b34f-4191-b4b2-eea911bb589d', 'c49670fb-fa53-4d17-8da2-3c0cb5da906e');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('8cf29c6f-4084-4acc-9244-852f5a76cd13', 'Project Manager', '3cd37428-b34f-4191-b4b2-eea911bb589d', 'c49670fb-fa53-4d17-8da2-3c0cb5da906e');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('043c45f5-6144-4fe4-8cf0-0aba873258d5', 'Test Engineer', '2d42c30b-e99a-4d03-b15b-248f7b6909f6', '75fe4f8a-9e1e-4e04-b198-dc5cdb3164e1');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('9bb7da8b-6156-446f-9e61-f77fffa34b61', 'Quality Analyst', '71e5e294-35bf-4c87-a3c3-12bcc0c62cfb', '45c215a2-2237-4c3c-be12-f6f435f33359');

INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('ea3a4084-9968-4e90-b83a-874f7bab959f', 'TestGenie', 'A project focused on simulating real user interactions using AI.', '45c215a2-2237-4c3c-be12-f6f435f33359');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('f11b3f43-4d8e-4e0b-8762-0e26eb6a5c21', 'AI Test Suite', 'An AIdriven platform for automated test generation.', '4dae2065-6ee3-4269-b787-8ff65bc64654');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('ed6952f5-cf89-454e-9226-600590bfd6cf', 'SimuTest', 'An innovative solution for natural language test creation.', 'c49670fb-fa53-4d17-8da2-3c0cb5da906e');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('d9ff0a80-a0a2-4e47-aefe-338136fc6dc8', 'SimuTest', 'A comprehensive tool for AIbased test execution and analysis.', '693f70ef-7c65-4943-9f5d-d617a3d59d00');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('c6108a1b-66b6-4d42-8f35-e59bd28ffb01', 'AI Test Suite', 'A project dedicated to enhancing test automation with AI.', '65594431-406a-4c75-a2ab-75193fd3f80e');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('16a3f709-6891-468a-a134-7652799842f9', 'TestGenie', 'An innovative solution for natural language test creation.', 'ef8bb731-b58b-42d9-90d0-da61b709971d');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('f794ca36-2b67-4eda-bf11-160d74ff6f03', 'SimuTest', 'A project focused on simulating real user interactions using AI.', '45c215a2-2237-4c3c-be12-f6f435f33359');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('a792e35d-6ab1-4096-93ff-3acced03c6ef', 'SmartQA Project', 'An innovative solution for natural language test creation.', '65594431-406a-4c75-a2ab-75193fd3f80e');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('023a1646-480a-4f3b-a464-53b7243fa920', 'AI Test Suite', 'An AIdriven platform for automated test generation.', 'c49670fb-fa53-4d17-8da2-3c0cb5da906e');
INSERT INTO "Project" ("id", "name", "description", "organizationId") VALUES ('4274605f-7c11-4476-b30e-01b03f056f7a', 'SimuTest', 'An innovative solution for natural language test creation.', '4885795d-cbf1-4a9a-9919-9e87df473ca2');

INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('2f88c98e-d129-4375-9e0c-ae9225919e33', 'Login Functionality Test', 'Tests the profile update functionality for users', 'https://i.imgur.com/YfJQV5z.png?id=163', 'Search for laptops and check the results', 'In Progress', 'ea3a4084-9968-4e90-b83a-874f7bab959f', '71e5e294-35bf-4c87-a3c3-12bcc0c62cfb');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('9215df8a-2240-4c73-85ca-013f7d29b162', 'Checkout Process Test', 'Ensures the checkout process is smooth and errorfree', 'https://i.imgur.com/YfJQV5z.png?id=169', 'Update the profile picture and save changes', 'In Progress', 'c6108a1b-66b6-4d42-8f35-e59bd28ffb01', 'e7d5f515-9c69-417f-8a7c-9c70d4e1e992');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('6b7ba83b-278e-4119-8acf-1fe027b88ac3', 'Profile Update Test', 'Ensures the checkout process is smooth and errorfree', 'https://i.imgur.com/YfJQV5z.png?id=175', 'Complete the purchase using a credit card', 'Failed', '023a1646-480a-4f3b-a464-53b7243fa920', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('bb121fa6-6f33-424a-9994-23c546d839e8', 'User Registration Test', 'Tests the profile update functionality for users', 'https://i.imgur.com/YfJQV5z.png?id=181', 'Update the profile picture and save changes', 'Pending', 'f11b3f43-4d8e-4e0b-8762-0e26eb6a5c21', '2d42c30b-e99a-4d03-b15b-248f7b6909f6');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('3b6d0472-1e11-4ee1-937b-232143bf2457', 'Profile Update Test', 'Ensures the checkout process is smooth and errorfree', 'https://i.imgur.com/YfJQV5z.png?id=187', 'Register a new account with email and password', 'On Hold', '023a1646-480a-4f3b-a464-53b7243fa920', '4dc226f3-e9c4-42bb-ab81-f2ce1ff2220c');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('fab5c31e-962b-473e-8062-e9daa9e9d5ab', 'Checkout Process Test', 'Tests the profile update functionality for users', 'https://i.imgur.com/YfJQV5z.png?id=193', 'Log in using username and password', 'Completed', '023a1646-480a-4f3b-a464-53b7243fa920', '96dcbc06-2180-4cd7-9958-1ec073bc4ef1');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('41dc0c54-ffef-404f-b36f-e433826407dc', 'Checkout Process Test', 'Test to verify login with valid credentials', 'https://i.imgur.com/YfJQV5z.png?id=199', 'Complete the purchase using a credit card', 'Completed', 'f11b3f43-4d8e-4e0b-8762-0e26eb6a5c21', '71e5e294-35bf-4c87-a3c3-12bcc0c62cfb');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('df2c366d-e498-4934-bbb0-c652d483f9d3', 'Login Functionality Test', 'Ensures the checkout process is smooth and errorfree', 'https://i.imgur.com/YfJQV5z.png?id=205', 'Register a new account with email and password', 'On Hold', 'd9ff0a80-a0a2-4e47-aefe-338136fc6dc8', '2d42c30b-e99a-4d03-b15b-248f7b6909f6');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('5256f60a-c4f0-4b6f-89c1-6a0244052aa1', 'Search Feature Test', 'Validates user registration with all required fields', 'https://i.imgur.com/YfJQV5z.png?id=211', 'Search for laptops and check the results', 'Failed', '023a1646-480a-4f3b-a464-53b7243fa920', '71a96bbc-fb18-472f-94ca-9780149eea16');
INSERT INTO "Test" ("id", "name", "description", "url", "naturalLanguageInput", "status", "projectId", "createdById") VALUES ('8b4567d0-49d1-4330-bdf5-4f0594fabfd8', 'Login Functionality Test', 'Test to verify login with valid credentials', 'https://i.imgur.com/YfJQV5z.png?id=217', 'Complete the purchase using a credit card', 'Pending', 'f11b3f43-4d8e-4e0b-8762-0e26eb6a5c21', 'f6a9abda-9c2e-4475-911b-091790f70954');

INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('71558e2b-cb61-4423-964d-edd98bb0a117', 'Cancelled', 'Assertion error on page load', 'https://i.imgur.com/YfJQV5z.png?id=223', '8b4567d0-49d1-4330-bdf5-4f0594fabfd8', 'e7d5f515-9c69-417f-8a7c-9c70d4e1e992');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('c39542ca-7e37-47cf-92ee-f987491c7515', 'Completed', 'Script execution interrupted', 'https://i.imgur.com/YfJQV5z.png?id=227', 'bb121fa6-6f33-424a-9994-23c546d839e8', '4dc226f3-e9c4-42bb-ab81-f2ce1ff2220c');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('abd7a46c-85bb-4fce-89d2-e3ddc31bc353', 'Running', 'Assertion error on page load', 'https://i.imgur.com/YfJQV5z.png?id=231', '6b7ba83b-278e-4119-8acf-1fe027b88ac3', '71a96bbc-fb18-472f-94ca-9780149eea16');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('4adf47d5-7f93-4f1a-bc6e-5240ee902f43', 'Running', 'Element not found exception', 'https://i.imgur.com/YfJQV5z.png?id=235', '41dc0c54-ffef-404f-b36f-e433826407dc', '3cd37428-b34f-4191-b4b2-eea911bb589d');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('eb5365da-fc47-4fd1-96a0-260e59456835', 'Failed', 'Assertion error on page load', 'https://i.imgur.com/YfJQV5z.png?id=239', 'bb121fa6-6f33-424a-9994-23c546d839e8', 'e7d5f515-9c69-417f-8a7c-9c70d4e1e992');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('49f81bba-0123-4698-88a5-7ffdcb335a0f', 'Queued', 'Timeout error at step 3', 'https://i.imgur.com/YfJQV5z.png?id=243', '5256f60a-c4f0-4b6f-89c1-6a0244052aa1', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('688dadee-711e-4428-b0ee-aac9bb61208f', 'Running', 'Assertion error on page load', 'https://i.imgur.com/YfJQV5z.png?id=247', 'df2c366d-e498-4934-bbb0-c652d483f9d3', '4dc226f3-e9c4-42bb-ab81-f2ce1ff2220c');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('9f84ceaf-ccdc-4340-a8bb-460879ece2ea', 'Cancelled', 'Script execution interrupted', 'https://i.imgur.com/YfJQV5z.png?id=251', '41dc0c54-ffef-404f-b36f-e433826407dc', '71e5e294-35bf-4c87-a3c3-12bcc0c62cfb');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('f5b92c68-8804-484b-a82c-cdf090d6ec56', 'Running', 'Element not found exception', 'https://i.imgur.com/YfJQV5z.png?id=255', '9215df8a-2240-4c73-85ca-013f7d29b162', 'e7d5f515-9c69-417f-8a7c-9c70d4e1e992');
INSERT INTO "TestRun" ("id", "status", "errorLog", "reportUrl", "testId", "executedById") VALUES ('d495fc32-4f6e-4569-8cae-bacf00f68774', 'Queued', 'Element not found exception', 'https://i.imgur.com/YfJQV5z.png?id=259', '9215df8a-2240-4c73-85ca-013f7d29b162', '2d42c30b-e99a-4d03-b15b-248f7b6909f6');

INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('b86bdd9b-2aad-48dc-80b2-9ebea8551815', 424, 'select dropdown', 'in progress', 'https://i.imgur.com/YfJQV5z.png?id=264', 'abd7a46c-85bb-4fce-89d2-e3ddc31bc353');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('8d4dea48-1f42-48fc-8a07-142d69615455', 721, 'enter text', 'not started', 'https://i.imgur.com/YfJQV5z.png?id=269', '49f81bba-0123-4698-88a5-7ffdcb335a0f');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('277da0a1-5a2c-4af8-8ca0-be57a9a8cf55', 452, 'enter text', 'failed', 'https://i.imgur.com/YfJQV5z.png?id=274', 'eb5365da-fc47-4fd1-96a0-260e59456835');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('7ecce239-7aa3-49ad-888a-8fd12cc2b342', 295, 'scroll down', 'failed', 'https://i.imgur.com/YfJQV5z.png?id=279', '4adf47d5-7f93-4f1a-bc6e-5240ee902f43');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('b5dec8f9-9f31-4f3a-abaf-2900d07ff774', 172, 'scroll down', 'in progress', 'https://i.imgur.com/YfJQV5z.png?id=284', 'c39542ca-7e37-47cf-92ee-f987491c7515');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('c1383ff8-af6c-4df9-b4dc-4fc5a9d46909', 211, 'scroll down', 'failed', 'https://i.imgur.com/YfJQV5z.png?id=289', 'f5b92c68-8804-484b-a82c-cdf090d6ec56');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('292f1045-a532-4719-8d75-c1dd15c249fd', 821, 'select dropdown', 'skipped', 'https://i.imgur.com/YfJQV5z.png?id=294', 'eb5365da-fc47-4fd1-96a0-260e59456835');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('2544d272-64ad-49d6-b129-a4c2cd3d9005', 165, 'enter text', 'failed', 'https://i.imgur.com/YfJQV5z.png?id=299', 'd495fc32-4f6e-4569-8cae-bacf00f68774');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('06a644bd-9750-4802-bb89-4fbf1adb57bb', 221, 'enter text', 'skipped', 'https://i.imgur.com/YfJQV5z.png?id=304', 'f5b92c68-8804-484b-a82c-cdf090d6ec56');
INSERT INTO "TestStep" ("id", "order", "action", "status", "screenshotUrl", "testRunId") VALUES ('049c7695-de86-4f5e-9f1b-01cc908ec540', 805, 'select dropdown', 'not started', 'https://i.imgur.com/YfJQV5z.png?id=309', '688dadee-711e-4428-b0ee-aac9bb61208f');

INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('71102226-0e51-457f-8247-7d069dcb643e', 'execute', '3b6d0472-1e11-4ee1-937b-232143bf2457', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('64254573-53ee-4166-93e9-350464e1884c', 'write', '3b6d0472-1e11-4ee1-937b-232143bf2457', '2d42c30b-e99a-4d03-b15b-248f7b6909f6');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('60bb6c4e-8542-4942-bcae-d0074df69090', 'fullaccess', 'df2c366d-e498-4934-bbb0-c652d483f9d3', '71e5e294-35bf-4c87-a3c3-12bcc0c62cfb');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('9ab5873b-9316-4199-8c5b-31d2393f43cf', 'fullaccess', 'bb121fa6-6f33-424a-9994-23c546d839e8', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('f3f02c48-08d8-48bc-a530-260485cca171', 'write', 'bb121fa6-6f33-424a-9994-23c546d839e8', 'f6a9abda-9c2e-4475-911b-091790f70954');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('3e2d8fe2-4b01-4069-8c13-8d5c85860392', 'execute', '6b7ba83b-278e-4119-8acf-1fe027b88ac3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('de2c9d18-bc3e-4ff0-8edd-020c716ddba2', 'admin', 'df2c366d-e498-4934-bbb0-c652d483f9d3', 'f6a9abda-9c2e-4475-911b-091790f70954');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('73fe8ea4-1c2b-4334-9158-cf836790f7a6', 'fullaccess', '6b7ba83b-278e-4119-8acf-1fe027b88ac3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('c272bd9f-39a4-415f-b49d-2b465d76a387', 'admin', '6b7ba83b-278e-4119-8acf-1fe027b88ac3', '96dcbc06-2180-4cd7-9958-1ec073bc4ef1');
INSERT INTO "TestShare" ("id", "permission", "testId", "userId") VALUES ('8d7f886c-0729-4094-809e-bb3ea4cf6eed', 'readonly', 'fab5c31e-962b-473e-8062-e9daa9e9d5ab', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
