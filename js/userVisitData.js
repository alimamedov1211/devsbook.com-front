let signOutBtn = document.getElementById('signOut');
window.addEventListener('load', init);





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
    let id = user.id;
    let name = user.name;
    let surname = user.surname;
    let email = user.email;
    let profilePhoto = user.profilePhoto;
    document.querySelector('#profilePic').src = "data:image/png;base64," + profilePhoto;
    document.querySelector("#username").innerHTML = name;

    document.querySelector('#emailInfo').innerHTML = email;
    document.querySelector('#usernameInfo').innerHTML = name + " " + surname;
    document.querySelector('#profilePicInfo').src = "data:image/png;base64," + profilePhoto;
    getData(id);

}



function afterFindUserHeader(userJson) {
    let user = JSON.parse(userJson);
    let name = user.name;
    let profilePhoto = user.profilePhoto;
    document.querySelector('#profilePic').src = "data:image/png;base64," + profilePhoto;
    document.querySelector("#username").innerHTML = name;
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