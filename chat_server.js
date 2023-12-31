const express = require('express');
const sessions = require('express-session')
const path = require('path');
const app = express();
const PORT = 8080
const oneHour = 1000 * 60 * 60


var session;
var users = [
    {username: "ida", password: "Passord1"},
    {username: "bob", password: "Passord2"},
    {username: "test", password: "test"}
]

var messages = ["kurt: Hallo", "bob: Hei", "kurt: Hahaha"]

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

app.get('/', (req, res) => {
	console.log("/ requested")
    //res.sendFile(path.join(__dirname, 'public', 'chat.html'))  

    session = req.session
    if (session.username ) {
        res.sendFile(path.join(__dirname, 'public', 'chat.html'))
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'))
    }
   // res.end()
});

app.post('/add', (req, res) => {
    var text = req.body.text;
    console.log(text);

    if (text) {
        var username = req.session.username;

        if (username){
            messages.push(username + ": " + text);
            res.json({ success: true})
            console.log("message added")
            console.log(messages)
        } else {
            res.json({ success: false, message: "Not logged in"})
        }
    } else {
        res.json({ success: false, message: "No message sendt"})
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

app.get('/getUsername', (req, res) => {
    res.json({ username: req.session.username });
});


app.post('/login', (req,res) =>  {
    console.log(req.body.username)
    console.log(req.body.password)
   
        //Find user, velg bruker som har det brukernavnet som ble sendt fra client.
        var user = users.find(u => u.username === req.body.username)

        // (if) Sammenlign passord som er submittet fra client med passord i user. user.password
        if(user && req.body.password == user.password) {
            
            console.log("riktig passord")      
        
            req.session.username= user.username
            //send til chat.html
            res.redirect('/');

    } else {
        // Respons, feil brukernavn eller passord
        
        res.json({message: "Invalid username or password" });
    }

})

app.get('/logout', (req, res) => {
    req.session.destroy((err) =>{
        if (err) {
            console.error('Error when logging out:', err);
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})