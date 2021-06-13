const nodemailer=require('nodemailer');

const sendEmail=async options=>{
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d679c94ce15282",
          pass: "06b6c68e597219"
        }
      });

      const message={
          from:`shopit <noreply@shopit.com>`,
          to:options.email,
          subject:options.subject,
          text:options.message,

        }
        await transporter.sendMail(message)


}

// email noreply@shopit.com
// name shopit

module.exports=sendEmail