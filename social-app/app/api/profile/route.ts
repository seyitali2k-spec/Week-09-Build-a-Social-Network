import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
const user = await currentUser();
const body = await req.json();

if (!user) return new Response("Unauthorized", { status: 401 });

const existing = await prisma.user.findUnique({
    where: { clerkId: user.id },
});

if (existing) return Response.json(existing);

const newUser = await prisma.user.create({
    data: {
    clerkId: user.id,
    bio: body.bio,
},
});

return Response.json(newUser);
}