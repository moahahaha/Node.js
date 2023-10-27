const express = require('express');
const path = require('path');
 
const app = express();
const PORT = 80
 
var tasks = ["ta oppvasken", "gå med søppla", "abfadfbdfb "]


 
app.use(express.static('public')) // tilordner public mappe til vår app
app.use(express.json()) // tar i bruk json funksjon for app
 
app.get('/', function (req, res) {
	console.log("/ requested")
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
 
app.get('/hei', function (req, res) {
    res.send("Hei på deg!");
});


 
app.post('/ask', (req, res) => {
    var task = req.body.task;
    console.log(task);
    // her må vi sørge for at det klient sender, blir lagt til i task listen
    // tasks.push("vask bilen")
    if (task){
		tasks.push(task)
		res.json({ success: true})
		console.log("task added")
		console.log(tasks)
	} else {
		res.json({ success: false, message: "No task sent"})
	}
});

app.get('/load_tasks', (req, res) => {
    console.log('sendt tasks')
	res.json({liste: tasks}) // send alle tasks, altså listen tasks
})

app.delete('/delete/:index', (req, res) => {
    var index = (req.params.index) // henter param kalt index fra linken
    if (index >= 0 && index < tasks.length){
        tasks.splice(index, 1) // sletter en task fra listen
        res.json({success: true})
    } else {
        res.json({ success: false})
    }
})

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 