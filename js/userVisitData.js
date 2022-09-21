let signOutBtn = document.getElementById('signOut');
let chatBtn = document.getElementById('chatBtn');
let addFriendBtn = document.getElementById('addFriendBtn');
let rmvFriendRequestBtn = document.getElementById('rmvFriendRequestBtn');
let rmvFriendBtn = document.getElementById('rmvFriendBtn');
let acceptFriendRequestBtn = document.getElementById('acceptFriendRequestBtn');



let userId;
let visitedUserId;
var globFriend;
var list;

window.addEventListener('load', init);
chatBtn.addEventListener('click', chatBtnClicked);
addFriendBtn.addEventListener('click', addFriendBtnClicked);
rmvFriendRequestBtn.addEventListener('click', rmvFriendRequestBtnClicked);
rmvFriendBtn.addEventListener('click', rmvFriendBtnClicked);
acceptFriendRequestBtn.addEventListener('click', acceptFriendRequestBtnClicked);


function chatBtnClicked() {
    console.log("salam");

    //continue
}

function addFriendBtnClicked() {
    let user = JSON.parse(globFriend);
    let requests = user.myRequestsId;
    if (requests == null) {
        user.myRequestsId = "" + visitedUserId;
    } else if (requests.indexOf(visitedUserId) == -1) {
        user.myRequestsId += `,${visitedUserId}`
    }
    updateFriend(user);

}

function rmvFriendRequestBtnClicked() {
    let user = JSON.parse(globFriend);
    let requests = user.myRequestsId;
    if (requests != null) {
        let index = requests.indexOf(visitedUserId);
        if (index != -1) {
            console.log(index);
        }
    }
    updateFriend(user);
}


function rmvFriendBtnClicked() {

}

function acceptFriendRequestBtnClicked() {

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
    getFriend(userId);
}


function afterFindFriend(friend) {
    globFriend = friend;
    let user = JSON.parse(friend);
    if (checkFrendship(user)) {
        drawFriendInfo(1);
    } else if (checkRequest(user)) {
        drawFriendInfo(2);
    } else if (checkRequestTo(user)) {
        drawFriendInfo(3);
    } else {
        drawFriendInfo(4);
    }


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

function checkFrendship(user) {
    return checkExist(user.friendsId);
}

function checkRequest(user) {
    return checkExist(user.myRequestsId);
}

function checkRequestTo(user) {
    return checkExist(user.friendRequestsId);
}

function drawFriendInfo(value) {
    switch (value) {
        case 1:
            rmvFriendBtn.classList.remove('d-none');
            rmvFriendRequestBtn.classList.contains('d-none') ? "" : rmvFriendRequestBtn.classList.add('d-none')
            addFriendBtn.classList.contains('d-none') ? "" : addFriendBtn.classList.add('d-none')
            acceptFriendRequestBtn.classList.contains('d-none') ? "" : acceptFriendRequestBtn.classList.add('d-none')
            break;
        case 2:
            rmvFriendRequestBtn.classList.remove('d-none');
            rmvFriendBtn.classList.contains('d-none') ? "" : rmvFriendBtn.classList.add('d-none')
            addFriendBtn.classList.contains('d-none') ? "" : addFriendBtn.classList.add('d-none')
            acceptFriendRequestBtn.classList.contains('d-none') ? "" : acceptFriendRequestBtn.classList.add('d-none')
            break;
        case 3:
            acceptFriendRequestBtn.classList.remove('d-none');
            rmvFriendRequestBtn.classList.contains('d-none') ? "" : rmvFriendRequestBtn.classList.add('d-none')
            addFriendBtn.classList.contains('d-none') ? "" : addFriendBtn.classList.add('d-none')
            rmvFriendBtn.classList.contains('d-none') ? "" : rmvFriendBtn.classList.add('d-none')
            break;
        case 4:
            addFriendBtn.classList.remove('d-none');
            rmvFriendRequestBtn.classList.contains('d-none') ? "" : rmvFriendRequestBtn.classList.add('d-none')
            rmvFriendBtn.classList.contains('d-none') ? "" : rmvFriendBtn.classList.add('d-none')
            acceptFriendRequestBtn.classList.contains('d-none') ? "" : acceptFriendRequestBtn.classList.add('d-none')
            break;
    }
}


function checkExist(idList) {
    list = idList;
    if (idList != null) {
        let check = idList.indexOf(visitedUserId);
        if (check == -1) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
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


async function updateFriend(friend) {
    const response = await fetch(
        `http://localhost:9000/updateFriend`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friend)
        }
    );

    await response.text().then(user => {
        afterFindFriend(user);
    });


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

async function getFriend(userId) {
    const response = await fetch(
        `http://localhost:9000/getFriend?userId=${userId}`, {
            method: 'GET'
        }
    );
    await response.text().then(friend => {
        afterFindFriend(friend);
    });
}