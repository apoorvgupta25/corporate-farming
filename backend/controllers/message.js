const nodemailer = require('nodemailer');
const Message = require('../models/message');
const User = require('../models/user');
const getUserById = require('../controllers/user');

exports.addMessage = async (req, res) => {

    const newMessage = new Message(req.body.message);
    const contact = req.body.contact;
    const isCorporate = req.body.isCorporate;
    const sender = req.body.message.sender;
    const conversationId = req.body.message.conversationId;
    const email = "";
    console.log(isCorporate);
    try{
      if (isCorporate == 1) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        await client.messages
          .create({
            body: newMessage.text,
            from: '+19853042594',
            to: "+91".concat(contact),
          })
          .then(message => console.log(message.sid));

      }else{
        const myArray = conversationId.split("_");
        const user1 = myArray[1];
        const user2 = myArray[2];
        
        console.log(process.env.EMAIL_ID);
        console.log(process.env.EMAIL_PASSWORD);
        let corporate ="";
        if(user1 == sender){
           corporate = user2;
        }else{
          corporate = user1;
        }
        User.findById(corporate).exec((err, user) => {
            if(err || !user){
                console.log("No user found in DB");
            }
            console.log(user.email);
            const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            
            var spacing = "                       "
            var mailOptions = {
              from: process.env.EMAIL_ID,
              to: user.email,
              subject: 'New Message from the farmer',
              text: `Hi ${user.name},\n`+"New Message from farmer is: "+newMessage.text+`\n`+"Please login to the webiste to reply"
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            
        });
        
      }
    } catch (err) {
       //res.status(500).json(err);
    } finally{
        try {
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

exports.getMessages = async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
}
