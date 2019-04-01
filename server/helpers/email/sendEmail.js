import dotenv from 'dotenv';
import sgMail  from '@sendgrid/mail';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, emailTemplate) => {

    const { subject, from, text } = emailTemplate;
    let { html } = emailTemplate;

    const linkUrl = process.env.FRONTEND_lOGIN;
    html = `${html}
    <h2><a href="${linkUrl}" style="background-color: #6C54EC;
    color: white; padding: 5px 10px; text-decoration: none;
    border-radius: 2px;">Go To CHEMCOS</a></h2>
    `;

    const messageProperty = { to, from, subject, text, html };
    return sgMail.send(messageProperty);
}

export default sendEmail;
