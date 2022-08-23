const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eventbrite.app.clone@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports.sendRegistrationEvent = (event, user) => {
  // console.log(user)
  transporter
    .sendMail({
      from: "Eventbrite<eventbrite.app.clone@gmail.com>",
      to: user.email,
      subject: `Tus entradas para el evento ${event.title}`,
      //   subject: `Tus entradas para el evento ${event.title}`
      html: `
        <div style="margin-left:280px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Eventbrite_Logo.svg/200px-Eventbrite_Logo.svg.png" style="width:150px; margin-top: 50px; margin-left:35px" >

            <td valign="top" class="m_6691485310297503091mcnTextContent" style="padding:18px;color:#222222;font-family:Roboto,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-size:16px;font-style:normal;font-weight:bold;text-align:center;word-break:break-word;line-height:150%">
                <span style="font-family:roboto,helvetica neue,helvetica,arial,sans-serif"><strong>${user.name},<br>
                ¡tienes entradas!<br>
                <br>
                <img height="80" src="https://ci3.googleusercontent.com/proxy/RV5gmr2ZfbXdD8ItxU86mCG-wCzORf4vc9qoByxbWB5lBOrOB2ki__Z2YCWP8HnRdg9WwyyjDJYj_OunY4NssBCKrEpfR2LexkZ-2rwL2Zu3qFXiwa-8VfLHJuQzwEACx7MCIMF8IZalyMEPpolyKEZ4eyrh7Q=s0-d-e1-ft#https://mcusercontent.com/45cf93e362eb3e6e748a6a471/images/6d7c4990-49e2-f5c1-be59-a63b17583d7f.png" style="border:0px initial;width:80px;height:80px;margin:0px;outline:none;text-decoration:none" width="80" class="CToWUd" data-bit="iit"><br>
                <br>
                ¡Aquí tienes tus entradas!<br>
                
                <a href="https://qr-creator.com/" target="_blank" style="cursor:default; margin-bottom:20px;"><img src="https://qr-api.quel.jp/v1/?size=4&data=https%3A%2F%2Fbit.ly%2F3cfO6Bo" alt="QR Code" border="0" /></a>
            </td>
        </div>
        
        <p style="font-size:18px">${event.title} en ${event.address}</p>
        <img src="${event.image}" style="border: 0px  ; width: 800px; height: 400px; margin: 0px;" width="800" />
        <br/>
        <div>
            <p>${event.address}</p>
        </div>
        <br/>
        <div style="width: 800px", margin:20px;>
            <h3>Detalles del evento</h3>
            <p style="font-size:14px;">${event.description}</p>
        </div>
        
       
        

       
    `,
    })
    .then(() => {
      console.log("email sent!");
    })
    .catch((err) => {
      console.error("error sending email, ", err);
    });
};
