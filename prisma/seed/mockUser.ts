import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `
INSERT INTO "User" (
  "id",
  "email", 
  "name", 
  "globalRole",
  "pictureUrl", 

"password"
) VALUES (
  '21a857f1-ba5f-4435-bcf6-f910ec07c0dc',
  'test@test.com',
  'John Doe',
  'ADMIN',
  'https://i.imgur.com/sdjqd62.jpeg',

'$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC'
);

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('6ae3ce30-c530-4a80-b9eb-d7acfcf7ee73', 'NextGen Enterprises', 'https://i.imgur.com/BgkFiid.jpeg');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('44cbc057-6a21-41ab-a4b4-eea465dfa02d', 'owner', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '6ae3ce30-c530-4a80-b9eb-d7acfcf7ee73');

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
