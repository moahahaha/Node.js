

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
       
        load_messange()
    });
}

