import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectToDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response('Unauthorized', { status: 401 });

    const { id } = await params;
    const { client } = await connectToDb();
    await client.db().collection('inquiries').deleteOne({ _id: new ObjectId(id) });

    return new Response('Deleted', { status: 200 });
}

export async function PATCH(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response('Unauthorized', { status: 401 });

    const { id } = await params;
    const { client } = await connectToDb();
    await client.db().collection('inquiries').updateOne(
        { _id: new ObjectId(id) },
        { $set: { read: true } }
    );

    return new Response('Updated', { status: 200 });
}
