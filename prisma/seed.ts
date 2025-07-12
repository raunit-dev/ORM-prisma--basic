import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createDummyUsers() {
    const user = await client.user.create({
        data: {
            username: "punit bhaiya",
            password: "rish45",
            age: 21,
            city: "kolkata"
        }
    });

    await client.todo.createMany({
        data: [
            {
                title: "CA",
                description: "baba bhootnath medical",
                done: false,
                userId: user.id,
                time: new Date()
            },
            {
                title: "yo yo honey singh",
                description: "Hey guys how are you ?",
                done: false,
                userId: user.id,
                time: new Date()
            }
        ]
    });

    console.log("User and Todos created.");
}

createDummyUsers()
    .catch((err) => console.error("Error:", err))
    .finally(() => client.$disconnect());
