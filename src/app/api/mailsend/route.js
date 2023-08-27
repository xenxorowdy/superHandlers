const nodemailer = require('nodemailer');

export async function POST(request) {
    const req = await request.json()

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.email,
          pass: process.env.pwd
        },
        tls: {
            ciphers: 'SSLv3',
          },
      });
      const email = req.email ?? ''
      const contactNo = req.contact ?? ''
      const Name = req.name ?? ''
      const interest = req.interest ?? ''
      const message = req.interest ?? ''
    
const mailConfigurations = {
  
    from: process.env.email,
    to: process.env.sendEmail,
    subject: 'Fill Form on super handlers',
    text: `
      email = ${email} \n
      name = ${Name} \n
      contact No = ${contactNo} \n
      interest = ${interest} \n
      message = ${message} \n
    `
};
 const status = await transporter.sendMail(mailConfigurations)

    return new Response(`success`);
}
    