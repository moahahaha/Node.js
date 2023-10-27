const express = require('express');
const path = require('path');
 
const app = express();
const PORT = 8080


var messages = ["Hei", "Hallo", "Heisan"]


app.use(express.static('public'))
app.use(express.json())

app.get('/', function (req, res) {
	console.log("/ requested")
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
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
        res.json({ success: false, message: "No task sent"})
    }
});

app.get('/load')




app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
);