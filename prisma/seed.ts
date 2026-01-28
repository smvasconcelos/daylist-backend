import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaClient } from './generated/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    const password = '123123';
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email: 'email@gmail.com' },
        update: {},
        create: {
            id: randomUUID(),
            email: 'email@gmail.com',
            name: 'tester',
            password: hashedPassword,
            createdAt: new Date()
        },
    });

    console.log('Seed finalizado com sucesso:', user.email);
}

main()
    .catch((e) => {
        console.error('Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });