import { PrismaClient } from '@prisma/client';
import { hash, genSalt } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin.admin@gmail.com' },
    update: {},
    create: {
      username: 'admin.admin@gmail.com',
      password: await hash('Zaxscd#123', await genSalt(10)),
      firstname: 'Shomas',
      lastname: 'Thelby',
      role: 'Admin'
    }
  });
  console.log(admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
