document.addEventListener('DOMContentLoaded', load_message())

var loadInterval,

loadInterval = setInterval(load_message, 1000)

function add_message(){
    console.log("clicked send button")
    const text_field = document.getElementById('text_field')
    const text = document.getElementById('text_input').value;
    console.log(text)
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })

    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log("text added")
        } else {
            console.log(data)
            alert(data.message) 
        }
       
        load_message() 
        
    });
}
                        
function load_message() {
    fetch('/load')
        .then(res => res.json())
        .then(data => {
            var EL_p = document.getElementById('text_p')
            console.log(data.liste)
            EL_p.innerHTML = ''
            data.liste.forEach((message) => {
                var p = document.createElement('p')
                p.textContent = message
                console.log(message)

                EL_p.appendChild(p)
            });

        })
}