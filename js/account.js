let createNewAccount = document.querySelector('#newAccount') ? document.querySelector('#newAccount') : null;
let backToLoginPage = document.querySelector('#backToLoginPage') ? document.querySelector('#backToLoginPage') : null;

if (createNewAccount != null) {
    createNewAccount.addEventListener('click', () => {
        location.href = "createAccount.html";
    })
}

if (backToLoginPage != null) {
    backToLoginPage.addEventListener('click', () => {
        location.href = "devsbook.html";
    })
}


function loginSubmitted() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    getResponse(email, password);
}


function afterCheckUser(token) {
    if (token == 0) {
        document.getElementsByClassName('my-alert')[0].style.display = 'block';
    } else {
        localStorage.setItem('userToken', token);
        location.href = 'mainPage.html'
    }

}

function afterCreateUser(createdUser) {
    console.log(createdUser);
    if (createdUser != 0) {
        location.href = 'devsbook.html'
    } else {
        document.getElementsByClassName('my-alert')[0].style.display = 'block';
    }
}



function createAccountSubmitted() {
    let firstName = document.querySelector('#firstName').value;
    let secondName = document.querySelector('#secondName').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let rePassword = document.querySelector('#rePassword').value;

    if (password != rePassword) {
        document.getElementsByClassName('password-mismatching-feedback')[0].classList.add('d-block')
    } else {
        let user = {
            name: firstName,
            surname: secondName,
            email: email,
            password: password
        }
        console.log(user);
        postResponse(user);

    }

}


async function postResponse(user) {
    const response = fetch(
        'http://localhost:9000/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    );
    await (await response).text().then(
        createdUser => {
            afterCreateUser(createdUser)
        }
    )
}




async function getResponse(email, password) {
    const response = await fetch(
        `http://localhost:9000/checkUser?mail=${email}&password=${password}`, {
            method: 'GET'
        }
    );
    await response.text().then(token => {
        afterCheckUser(token);
    });

}



(function() {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function(form) {


            form.addEventListener('submit', function(event) {
                event.preventDefault()
                event.stopPropagation()
                if (form.checkValidity()) {
                    if (form.id == "createAccount") {
                        createAccountSubmitted();
                    } else {
                        loginSubmitted();
                    }
                }
                form.classList.add('was-validated')
            }, false)
        })
})()