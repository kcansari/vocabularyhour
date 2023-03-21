import nodemailer from 'nodemailer'

const sendEmail = async (email, subject, text) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Vocabulary Hour 👻" <vocabulary@hour>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: `<a href=${text}>
      
          <b>${subject}</b>
        </a>`, // html body
    })
  } catch (error) {
    return error
  }
}

export default sendEmail
