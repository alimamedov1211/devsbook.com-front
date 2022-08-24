let signOutBtn = document.getElementById('signOut');

let state = {};
window.addEventListener('load', init);

signOutBtn.addEventListener('click', signOutBtnClicked)

function signOutBtnClicked() {
    localStorage.setItem('userToken', 0);
    location.href = 'devsbook.html';
}


async function init() {
    let token = localStorage.getItem('userToken');
    getUser(token);
    await getAllUsers();
    let searchUsers = document.querySelector('#searchUsers')
    searchUsers.addEventListener('keyup', searching => {
        searchingUser(searchUsers.value)
    })
    searchUsers.addEventListener('blur', blurred => {
        document.querySelector('#searchUsers').value = "";

        setTimeout(function() {
            document.querySelector('#userResults').innerHTML = "";
        }, 100);
    })
}


function afterFindUser(userJson) {
    let user = JSON.parse(userJson);
    let name = user.name;
    let profilePhoto = user.profilePhoto;
    document.querySelector('#profilePic').src = "data:image/jpeg;base64," + profilePhoto;
    document.querySelector("#username").innerHTML = name;

}


function searchingUser(value) {
    let token = localStorage.getItem('userToken');
    let users = [];
    if (value.trim() != '') {
        for (user of state) {
            value = value.trim().toLowerCase();
            if ((user.name.toLowerCase().search(value) != -1 || user.name.toLowerCase().search(value) != -1) && user.token != token) {
                users.push(user);
            }
        }
        drawFoundUsers(users);
    }
}


function clickUser(token) {
    localStorage.setItem('userId', token);
    location.href = 'user.html';
}


function drawFoundUsers(users) {
    let resultsDiv = document.querySelector('#userResults');
    resultsDiv.innerHTML = "";
    if (users.length == 0) {

    } else {
        for (let i = 0; i < users.length; i++) {
            let pp = "data:image/jpeg;base64," + users[i].profilePhoto;
            let uname = users[i].name + " " + users[i].surname;
            resultsDiv.innerHTML +=
                `<div class="result-user-inline" id='${users[i].token}' onclick="clickUser(id)">
            <img id="resultUserProfilePic" class="result-user-profile-picture" alt="Profile Picture" src="${pp}">
            <span id="resultUserName" class="result-username">${uname}</span>
        </div>`
        }


    }
}












async function getUser(token) {
    const response = await fetch(
        `http://localhost:9000/findUser?token=${token}`, {
            method: 'GET'
        }
    );
    await response.text().then(user => {
        afterFindUser(user);
    });

}

async function getAllUsers() {
    const response = await fetch(
        `http://localhost:9000/findAll`, {
            method: 'GET'
        }
    );
    await response.json().then(user => {
        state = user;
    });
}