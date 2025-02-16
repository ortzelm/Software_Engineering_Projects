//Functions for moving the templates when the buttons and arrows are pressed
var replaceState1 = '#login';
function showLogin() {
    changeTempletes(0, replaceState1, '#login', 'login');
    replaceState1 = '#login';
}
function showSignin() {
    changeTempletes(1, replaceState1, "#signin", "signin");
    replaceState1 = "#signin";
}
function showSchedule() {
    if (localStorage.getItem("corrent_maneger") == "mail") {
        alert("please log in");
        return;
    }
    changeTempletes(2, replaceState1, '#schedule', 'schedule');
    showInformation();
    replaceState1 = '#schedule';
}
function showAdd() {
    if (localStorage.getItem("corrent_maneger") == "mail") {
        alert("please log in");
        return;
    }
    changeTempletes(3, replaceState1, '#add', 'add');
    replaceState1 = '#add';

}
function changeTempletes(index, replaceState1, currentTempleteHash, currentTemplete) {
    var temp = document.getElementsByTagName("template")[index];
    var clon = temp.content.cloneNode(true);
    document.body.innerHTML = " ";
    document.body.appendChild(clon);
    history.replaceState({}, replaceState1, currentTempleteHash);
    history.pushState({}, currentTemplete, currentTempleteHash);
}
window.onhashchange = function () {
    var hashh = window.location.hash;
    if (hashh == "#login") {
        showLogin();
    } else if (hashh == "#signIn") {
        showSignin();
    } else if (hashh == "#schedule") {
        showSchedule();
    }
    else if (hashh == "#add") {
        showAdd();
    }
    else if (hashh == "#search") {
        search();
    }
    else {
        update();
    }
}