const sgMail=require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'abhishekchaurasia0786@gmail.com',
        subject:'Thanks for joining in! ',
        text:`Welcome to the app , ${name}.Let me know how you get along with the app`,
        // html:`<h1>Welcomet to the Task App,${name}</h1><p>Let me know how you get along with the app</p>`

    })
}
const sendCancelationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'abhishekchaurasia0786@gmail.com',
        subject:'GoodBye friend, sorry to see you go!' ,
        text:`Goodbye,${name}. I hope to see you back sometime soon.`
    })
}
module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}