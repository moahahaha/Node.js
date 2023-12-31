document.addEventListener('DOMContentLoaded', load_message())

var loadInterval,

loadInterval = setInterval(load_message, 1000)

document.addEventListener('DOMContentLoaded', () => {
    load_message();
    getUsername();
    update_button();
    
});


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

    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            console.log("text added")
        } else {
            console.log(data)
            alert(data.message) 
        }
       
        load_message() 
        getUsername();
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

function getUsername() {
    fetch('/getUsername')
        .then((res) => res.json())
        .then((data) => {
            const usernameP = document.getElementById('brukernavn_p');
            if (data.username) {
                usernameP.textContent = `Logged in as: ${data.username}`;
            } else {
                usernameP.textContent = 'Not logged in';
            }
        });
}


function update_button() {
    fetch('/getUsername')
    .then((res) => res.json())
        .then((data) => {
            const loginButton = document.getElementById('login_button');

            if (data.username) {
                
                loginButton.textContent = 'Log out';
            } else {
                loginButton.textContent = 'Login'
            }
        })
}

function logOut() {
    fetch('/logout')
        .then(() => {
            update_button()
        })
}
