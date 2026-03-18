import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
try {
    const posts = await prisma.post.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
});

    return Response.json(posts);
} catch (error) {
    console.error("GET ERROR:", error);
    return Response.json([], { status: 200 });
}
}

export async function POST(req: Request) {
const { userId } = await auth();

console.log("USER ID:", userId);

if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
}

const body = await req.json();

const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
});

if (!dbUser) {
    return Response.json({ error: "Create profile first" }, { status: 400 });
}

const post = await prisma.post.create({
    data: {
    content: body.content,
    userId: dbUser.id,
},
});

return Response.json(post);
}