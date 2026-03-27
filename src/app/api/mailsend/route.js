const nodemailer = require('nodemailer');
import { connectToDb } from '@/lib/db';

export async function POST(request) {
    const req = await request.json()

    const email    = req.email    ?? ''
    const contactNo = req.contact ?? ''
    const Name     = req.name     ?? ''
    const interest = req.interest ?? ''
    const message  = req.message  ?? ''

    // Save to MongoDB
    try {
        const { client } = await connectToDb();
        await client.db().collection('inquiries').insertOne({
            name: Name,
            email,
            contact: contactNo,
            interest,
            message,
            read: false,
            createdAt: new Date(),
        });
    } catch (err) {
        console.error('Failed to save inquiry:', err);
    }

    // Send email
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: process.env.email, pass: process.env.pass },
        });

        await transporter.sendMail({
            from: process.env.email,
            to: process.env.sendEmail,
            subject: 'Fill Form on super handlers',
            text: `email = ${email}\nname = ${Name}\ncontact No = ${contactNo}\ninterest = ${interest}\nmessage = ${message}`,
        });
    } catch (err) {
        console.error('Failed to send email:', err);
    }

    return new Response('success');
}
    