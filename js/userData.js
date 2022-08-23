window.addEventListener('load', init);




function init() {
    let token = localStorage.getItem('userToken');
    getUser(token);
}



function afterFindUser(userJson) {
    let user = JSON.parse(userJson);
    let id = user.id;
    let name = user.name;
    let surname = user.surname;
    let email = user.email;
    let profilePhoto = JSON.parse(user.profilePhoto);
    document.querySelector('#profilePic').src = "data:image/jpeg;base64," + profilePhoto;
    document.querySelector("#username").innerHTML = name;

    document.querySelector('#emailInfo').innerHTML = email;
    document.querySelector('#usernameInfo').innerHTML = name + " " + surname;
    document.querySelector('#profilePicInfo').src = "data:image/jpeg;base64," + profilePhoto;
    getData(id);

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