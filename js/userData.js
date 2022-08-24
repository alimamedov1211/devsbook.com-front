window.addEventListener('load', init);
let changeProfilePicSaveBtn = document.querySelector('#changeProfilePicSaveBtn')

changeProfilePicSaveBtn.addEventListener('click', clicked => {
    location.reload();
})


function init() {
    let token = localStorage.getItem('userToken');
    getUser(token);
}


function afterConvertedBase64(base64) {
    let token = localStorage.getItem('userToken');
    let changeProfilePicSpan = document.querySelector('#changeProfilePicSpan')
    document.querySelector('#profilePicInfo').src = base64;
    changeProfilePicSpan.innerHTML = 'Save Changes';
    changeProfilePicSaveBtn.classList.remove('d-none');
    changeProfilePicSaveBtn.classList.add('d-block');
    document.querySelector('#imageUpload').remove();
    changeProfilePicSpan.addEventListener('click', clicked => {
        changeProfilePic(base64.split(',')[1], token);
    })
}

imageUpload.addEventListener('change', fileUploaded => {
    let file = imageUpload.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        afterConvertedBase64(reader.result);
    }
    reader.readAsDataURL(file);

})


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


async function changeProfilePic(img, token) {
    await fetch(
        `http://localhost:9000/changeProfilePic`, {
            method: 'POST',
            headers: {
                'token': token
            },
            body: img
        }
    );
    location.reload();

}