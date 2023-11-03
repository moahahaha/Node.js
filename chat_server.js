const express = require('express');
const sessions = require('express-session')
const path = require('path');
const app = express();
const PORT = 8080
const oneHour = 1000 * 60 * 60

var users = [
    {username: "Ida", password: "Passord1"},
    {username: "Bob", password: "Passord2"}
]

var messages = ["Hei", "Hallo", "Heisan"]

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(sessions({
    secret: "thisisasecretkey",
    saveUninitialized: true, 
    cookie: {
        maxAge: oneHour
    },
    resave: false
}))

app.get('/', function (req, res) {
	console.log("/ requested")
    res.sendFile(path.join(__dirname, 'public', 'index.html'))  
    session = req.session
    if (session.username) {
        res.sendFile(path.join(__dirname, 'public', 'login.html'))
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'))
    }
});


app.post('/add', (req, res) => {
    var text = req.body.text;
    console.log(text);

    if (text){
         messages.push(text);
        res.json({ success: true})
        console.log("message added")
        console.log(messages)
    } else {
        res.json({ success: false, message: "No message sent"})
    }
});

app.get('/load', (req, res) =>  {
  
    console.log('sendt messages')
    res.json({liste: messages})
})


app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
);

app.post('/login', (req,res) =>  {
    console.log(req.body.username)
    console.log(req.body.password)

        //Find user, velg bruker som har det brukernavnet som ble sendt fra client.
        var user = users.find(u => u.username === req.body.username)

        // (if) Sammenlign passord som er submittet fra client med passord i user. user.password
        session = req.session
        session.username = 

        //da kan vi senere bruke:::
        req.session.username
})