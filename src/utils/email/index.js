import nodemailer from "nodemailer";
export const sendEmail = async ({to, subject, html}) =>{
  const transporter =nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure:false,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS,
        }, 
    });
    // send email
    const info = await transporter.sendMail({
        from:`"saraha app" <${process.env.EMAIL}>`,
        to,
        subject,
        text:"hi",
        html
    });
    if(info.rejected.length >0) return false;
    return true;

  
};