let signOutBtn = document.getElementById('signOut');
let chatBtn = document.getElementById('chatBtn');
let addFriendBtn = document.getElementById('addFriendBtn');
let rmvFriendRequestBtn = document.getElementById('rmvFriendRequestBtn');
let userId;
let visitedUserId;

window.addEventListener('load', init);
chatBtn.addEventListener('click', chatBtnClicked);
addFriendBtn.addEventListener('click', addFriendBtnClicked);
rmvFriendRequestBtn.addEventListener('click', rmvFriendRequestBtnClicked);


function chatBtnClicked() {}

function addFriendBtnClicked() {
    sendFriendRequest(userId, visitedUserId);
}

function rmvFriendRequestBtnClicked() {
    sendRemoveRequestSend(userId, visitedUserId);
}



function init() {
    let token = localStorage.getItem('userId');
    let userToken = localStorage.getItem('userToken');
    getUser(token);
    getUserForHeader(userToken)
}


signOutBtn.addEventListener('click', signOutBtnClicked)

function signOutBtnClicked() {
    localStorage.setItem('userToken', 0);
    location.href = 'devsbook.html';
}




function afterFriendRequestSent() {
    document.querySelector('#addFriendBtn').classList.add('d-none');
    document.querySelector('#rmvFriendRequestBtn').classList.remove('d-none');
}

function afterRemoveFriendRequest() {
    document.querySelector('#addFriendBtn').classList.remove('d-none');
    document.querySelector('#rmvFriendRequestBtn').classList.add('d-none');
}




function afterFindUser(userJson) {
    let user = JSON.parse(userJson);
    visitedUserId = user.id;
    let name = user.name;
    let surname = user.surname;
    let email = user.email;
    let profilePhoto = user.profilePhoto;

    document.querySelector('#emailInfo').innerHTML = email;
    document.querySelector('#usernameInfo').innerHTML = name + " " + surname;
    document.querySelector('#profilePicInfo').src = "data:image/png;base64," + profilePhoto;
    getData(visitedUserId);
}



function afterFindUserHeader(userJson) {
    let user = JSON.parse(userJson);
    let name = user.name;
    let profilePhoto = user.profilePhoto;
    document.querySelector('#profilePic').src = "data:image/png;base64," + profilePhoto;
    document.querySelector("#username").innerHTML = name;
    userId = user.id;
}



function afterGetDatas(userDataJson) {
    let photosCount = document.querySelector('#photosCount');
    let friendsCount = document.querySelector('#friendsCount');
    let postsCount = document.querySelector('#postsCount');

    let userData = JSON.parse(userDataJson);
    photosCount.innerHTML = userData.photosCount;
    friendsCount.innerHTML = userData.friendsCount
    postsCount.innerHTML = userData.postsCount
}



async function getData(userId) {
    const response = await fetch(
        `http://localhost:9000/countData?userId=${userId}`, {
            method: 'GET'
        }
    );
    await response.text().then(userData => {
        afterGetDatas(userData);
    });
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

function sendRemoveRequestSend(userId, visitedUserId) {
    //continue


    afterRemoveFriendRequest();
}


async function sendFriendRequest(userId, visitedUserId) {
    await fetch(
        `http://localhost:9000/sendFriendRequest?userId=${userId}&requestId=${visitedUserId}`, {
            method: 'GET'
        }
    );
    afterFriendRequestSent();

}

async function getUserForHeader(token) {
    const response = await fetch(
        `http://localhost:9000/findUser?token=${token}`, {
            method: 'GET'
        }
    );
    await response.text().then(user => {
        afterFindUserHeader(user);
    });

}