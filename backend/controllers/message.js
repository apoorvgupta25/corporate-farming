const Message = require('../models/message')

exports.addMessage = async (req, res) => {

    const newMessage = new Message(req.body.message);
    const contact = req.body.contact;
    const isCorporate = req.body.isCorporate;
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
