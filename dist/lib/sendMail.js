import nodemailer from "nodemailer";
const sendMail = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "41847b2a3f6b1d",
            pass: "316d6ee4c9fe78",
        },
    });
    const mailInfo = await transporter.sendMail({
        from: "annshulch1@gmail.com",
        to: email,
        subject,
        text: "Hello world?",
        html
    });
    return mailInfo;
};
export default sendMail;
