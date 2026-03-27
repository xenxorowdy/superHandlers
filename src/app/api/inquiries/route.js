import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDb } from '@/lib/db';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return new Response('Unauthorized', { status: 401 });

    const { client } = await connectToDb();
    const inquiries = await client
        .db()
        .collection('inquiries')
        .find()
        .sort({ createdAt: -1 })
        .toArray();

    return Response.json(inquiries.map(i => ({ ...i, _id: i._id.toString() })));
}
