let signOutBtn = document.getElementById('signOut');


window.addEventListener('load', init);

signOutBtn.addEventListener('click', signOutBtnClicked)

function signOutBtnClicked() {
    localStorage.setItem('userToken', 0);
    location.href = 'devsbook.html';
}


function init() {
    let token = localStorage.getItem('userToken');
    getUser(token);
}


function afterFindUser(userJson) {
    let user = JSON.parse(userJson);
    let name = user.name;
    let profilePhoto = user.profilePhoto;
    document.querySelector('#profilePic').src = "data:image/jpeg;base64," + profilePhoto;
    document.querySelector("#username").innerHTML = name;

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