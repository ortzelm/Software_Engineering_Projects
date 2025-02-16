//A class for creating an event object
class eventM {
    constructor(nameOfClient, tel, date, kindOfEvent, location, numOfPeople, photographer, Ballons, flowers, Singer) {
        this.nameOfClient = nameOfClient;
        this.tel = tel;
        this.date = date;
        this.kindOfEvent = kindOfEvent;
        this.location = location;
        this.numOfPeople = numOfPeople;
        this.photographer = photographer;
        this.Ballons = Ballons;
        this.flowers = flowers;
        this.Singer = Singer;
    }
    //A function to add an event
    add() {
        var eventLink = "https/add_event/" + this.nameOfClient + "/" + this.tel + "/" + this.date + "/" +
            this.kindOfEvent + "/" + this.location + "/" + this.numOfPeople + "/" + this.photographer + "/"
            + this.Ballons + "/" + this.flowers + "/" + this.Singer;
        var fajaxAdd = new fajax;
        fajaxAdd.open(eventLink, 'POST');
        try {
            var correctFunction = fajaxAdd.send();
        }
        catch (errormessage) {
            alert("there is a problem in a server");
        }
        if (correctFunction) {
            alert("The addition was made successfully");
        }
        showSchedule();
    }
}
//producer login
function login() {
    var exist = false;
    var userName = document.getElementById('userName');
    var userEmail = document.getElementById('userEmail');
    var codeManger = document.getElementById('codeManger');
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    for (var i = 0; i < users.length; i++) {
        if (users[i][0].name == userName.value && users[i][2].mail == userEmail.value && users[i][3].password == codeManger.value) {
            exist = true;
            alert("login is correct");
            localStorage.setItem("corrent_maneger", JSON.stringify(userEmail.value));
            showSchedule();
            break;
        }
    }
    if (exist == false) {
        alert("login not correct");
    }
}
//producer signin
//Receiving the data from the user, checking for integrity and sending to the database
function signin() {
    var fajaxSignin;
    var linkSignin;
    var name = document.getElementById("userName").value;
    var tel = document.getElementById("tel").value;
    var mail = document.getElementById("mail").value;
    var pas = document.getElementById("codeManger").value;
    var isExist;
    var isCorrect = true;
    var gmailFlag = false;
    var phoneFlag = false;
    var passFlag = false;
    gmailFlag = isValidMail(mail);
    phoneFlag = isValidfone(tel);
    passFlag = isValidPassword(pas);
    function isValidMail(mail) {
        const validmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validmail.test(mail);
    }
    function isValidPassword(pas) {
        const validpassword = /^\w[0-9]{5}/;
        return validpassword.test(pas);
    }
    //checking if phone contains 10 numbers and there is in letters
    function isValidfone(tel) {
        const validfone = /^[0-9]{10}$/;
        return validfone.test(tel);
    }
    //call validation functions
    if (!gmailFlag) {
        alert("Your email is not correct");
        isCorrect = false;
    }
    if (!passFlag) {
        alert("your password is not correct");
        isCorrect = false;
    }
    if (!phoneFlag) {
        alert("your telephone is not correct");
        isCorrect = false;
    }
    if (isCorrect) {
        isExist = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i][2].mail == mail.value && isExist == true) {
                alert('This name already exists, enter another address or go to the login page.')
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            linkSignin = "https/maneger/" + name + "/" + tel + "/" + mail + "/" + pas;
            fajaxSignin = new fajax;
            fajaxSignin.open(linkSignin, 'POST');
            try {
                correctFunction = fajaxSignin.send();
            }
            catch(errormessage) {
                alert("there is a problem in a server");
            }
            if (correctFunction) {
                alert('wonderful! now you have an acoount');
                showSchedule();
            }
        }
    }
}
//Displaying system information from the manufacturer's database on the screen
function showInformation() {
    delayedAlert();
    function delayedAlert() {
        setTimeout(function () {
            var fajaxShow = new fajax;
            var ShowLink = "https/get_events";
            fajaxShow.open(ShowLink, 'GET');
            var eventsByManeger;
            try {
                eventsByManeger = fajaxShow.send();
            }
            catch (errormessage) {
                alert("there is a problem in a server");
            }
            var eventsTable = document.getElementById("iformationinTable");
            for (var i = 0; i < eventsByManeger.length; i++) {
                var row = eventsTable.insertRow(1);
                var nameOfClient = row.insertCell(0);
                var phoneOfClient = row.insertCell(1);
                var dateOfEvent = row.insertCell(2);
                var kindOfEvent = row.insertCell(3);
                var location = row.insertCell(4);
                var numOfPeople = row.insertCell(5);
                var photographer = row.insertCell(6);
                var Ballons = row.insertCell(7);
                var flowers = row.insertCell(8);
                var Singer = row.insertCell(9);
                var deleteBtn = row.insertCell(10);
                //A button to delete the event that the producer chooses to delete,deletion from the database
                var delBtn = document.createElement("button");
                delBtn.innerHTML = "Remove";
                delBtn.onclick = (function (row) {
                    return function () {
                        var linkForDelete = "http/remove_event/" + JSON.stringify(eventsByManeger[eventsByManeger.length - row.rowIndex][3]);
                        var fajaxDelete = new fajax;
                        fajaxDelete.open(linkForDelete, 'DELETE');
                        eventsTable.deleteRow(row.rowIndex);
                    };
                })(row, eventsByManeger[i].date);
                deleteBtn.appendChild(delBtn);
                //A button to update a specific event by accessing the database
                var editBtn = row.insertCell(11);
                editBtn.innerHTML = '<button>edit</button>';
                editBtn.onclick = (function (index) {
                    return function () {
                        var linkSearchForUpdate = "https/update_event/" + eventsByManeger[eventsByManeger.length - row.rowIndex][3].date;
                        var fajaxSearchForUpdate = new fajax;
                        fajaxSearchForUpdate.open(linkSearchForUpdate, 'PUT');
                        try {
                            var eventU = fajaxSearchForUpdate.send();
                        }
                        catch (errormessage) {
                            alert("there is a problem in a server");
                        }
                        updateEvent(eventU);
                    };
                })(i);
                nameOfClient.innerHTML = eventsByManeger[i][1].nameOfClient;
                phoneOfClient.innerHTML = eventsByManeger[i][2].tel;
                dateOfEvent.innerHTML = eventsByManeger[i][3].date;
                kindOfEvent.innerHTML = eventsByManeger[i][4].kindOfEvent;
                location.innerHTML = eventsByManeger[i][5].location;
                numOfPeople.innerHTML = eventsByManeger[i][6].numOfPeople;
                photographer.innerHTML = eventsByManeger[i][7].photographer;
                Ballons.innerHTML = eventsByManeger[i][8].Ballons;
                flowers.innerHTML = eventsByManeger[i][9].flowers;
                Singer.innerHTML = eventsByManeger[i][10].Singer;
            }
        }, 1000);
    }
}
//A page for updating an event, fetching the old data and sending the new data in the link to the database
function updateEvent(eventU) {
    showAdd();
    var dateBefore = eventU[3].date;
    document.getElementById('addEvent').style.display = "none";
    document.getElementById('addP').style.display = "none";
    document.getElementById('nameOfClient').value = eventU[1].nameOfClient;
    document.getElementById('tel').value = eventU[2].tel;
    document.getElementById('datetime').value = eventU[3].date;
    document.getElementById('kindOfEvent').value = eventU[4].kindOfEvent;
    document.getElementById('location').value = eventU[5].location;
    document.getElementById('numOfPeople').value = eventU[6].numOfPeople;
    document.getElementById('photographer').value = eventU[7].photographer;
    document.getElementById('Ballons').value = eventU[8].Ballons;
    document.getElementById('flowers').value = eventU[9].flowers;
    document.getElementById('Singer').value = eventU[10].Singer;
    var updateBtn = document.getElementById('updateBtn');
    updateBtn.onclick = function () {
        function delayedUpdate() {
            var linkUpdate = "https/update_form/" + dateBefore + "/" +
                document.getElementById('nameOfClient').value + "/" +
                document.getElementById('tel').value + "/" +
                document.getElementById('datetime').value + "/" +
                document.getElementById('kindOfEvent').value + "/" +
                document.getElementById('location').value + "/" +
                document.getElementById('numOfPeople').value + "/" +
                document.getElementById('photographer').value + "/" +
                document.getElementById('Ballons').value + "/" +
                document.getElementById('flowers').value + "/" +
                document.getElementById('Singer').value;
            var fajaxUpdate = new fajax;
            fajaxUpdate.open(linkUpdate, 'PUT');
            try {
                fajaxUpdate.send();
            }
            catch (errormessage) {
                alert("there is a problem in a server");
            }
            showSchedule();
        }
        setTimeout(delayedUpdate, 1000);
    };
}
//Add customer function - receiving the data from the producer, checking for correctness and sending it to the database. and refreshing the system.
function addEvent() {
    document.getElementById('updateBtn').style.display = "none";
    document.getElementById('editP').style.display = "none";
    var nameOfClient = document.getElementById("nameOfClient").value;
    var tel = document.getElementById("tel").value;
    var date = document.getElementById("datetime").value;
    var kindOfEvent = document.getElementById("kindOfEvent").value;
    var location = document.getElementById("location").value;
    var numOfPeople = document.getElementById("numOfPeople").value;
    var photographer = document.getElementById("photographer").value;
    var Ballons = document.getElementById("Ballons").value;
    var flowers = document.getElementById("flowers").value;
    var Singer = document.getElementById("Singer").value;
    // Check if any field is empty
    if (nameOfClient === "" || tel === "" || date === "" || kindOfEvent === "" || location === "" ||
        numOfPeople === "" || photographer === "" || Ballons === "" || flowers === "" || Singer === "") {
        alert("Please fill in all fields");
        return;
    }
    var fajaxSearch = new fajax;
    var linkSearch = "https/get_event/" + date;
    fajaxSearch.open(linkSearch, 'GET');
    try {
        var eventByDate = fajaxSearch.send();
    }
    catch (errormessage) {
        alert("there is a problem in a server");
    }
    if (eventByDate) {
        alert("Date taken");
        showAdd();
        return;
    }
    var eventa = new eventM(nameOfClient, tel, date, kindOfEvent, location, numOfPeople, photographer, Ballons, flowers, Singer);
    eventa.add();
}
//Searches for a specific event by an ID code that is sent to a database where it finds the object and returns it to the producer on the screen
function search() {
    var dateS = document.getElementById("datetime").value;
    var fajaxSearch = new fajax;
    var linkSearch = "https/get_event/" + dateS;
    fajaxSearch.open(linkSearch, 'GET');
    try {
        var eventByDate = fajaxSearch.send();
    }
    catch (errormessage) {
        alert("there is a problem in a server");
    }
    var table = document.getElementById('iformationinTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    if (!eventByDate) {
        alert("sory,the event not found");
        showSchedule();
        return;
    }
    var row = document.getElementById('iformationinTable').insertRow(1);
    var nameOfClient = row.insertCell(0);
    var phoneOfClient = row.insertCell(1);
    var dateOfEvent = row.insertCell(2);
    var kindOfEvent = row.insertCell(3);
    var location = row.insertCell(4);
    var numOfPeople = row.insertCell(5);
    var photographer = row.insertCell(6);
    var Ballons = row.insertCell(7);
    var flowers = row.insertCell(8);
    var Singer = row.insertCell(9);
    //A delete button for the event that is shown to him after the search
    var deleteBtn = row.insertCell(10);
    deleteBtn.innerHTML = '<button>delete</button>';
    deleteBtn.onclick = (function (index) {
        return function () {
            var linkDelete = "https/remove_event/" + dateOfEvent.innerText;
            var fajaxDelete = new fajax;
            fajaxDelete.open(linkDelete, 'DELETE');
            try {
                correctFunction = fajaxDelete.send();
            }
            catch (errormessage) {
                alert("there is a problem in a server");
            }
            if (correctFunction) {
                alert("The deletion was performed successfully");
            }
            showSchedule();
        };
    })(1);
    //An update button for the event that is shown to him after the search
    var editBtn = row.insertCell(11);
    editBtn.innerHTML = '<button>edit</button>';
    editBtn.onclick = (function (index) {
        return function () {
            var linkSearchForUpdate = "https/update_event/" + eventsByManeger[eventsByManeger.length - row.rowIndex][3].date;
            var fajaxSearchForUpdate = new fajax;
            fajaxSearchForUpdate.open(linkSearchForUpdate, 'PUT');
            try {
                var eventU = fajaxSearchForUpdate.send();

            }
            catch (errormessage) {
                alert("there is a problem in a server");
            }
            updateEvent(eventU);
        };
    })(1);
    nameOfClient.innerHTML = eventByDate[1].nameOfClient;
    phoneOfClient.innerHTML = eventByDate[2].tel;
    dateOfEvent.innerHTML = eventByDate[3].date;
    kindOfEvent.innerHTML = eventByDate[4].kindOfEvent;
    location.innerHTML = eventByDate[5].location;
    numOfPeople.innerHTML = eventByDate[6].numOfPeople;
    photographer.innerHTML = eventByDate[7].photographer;
    Ballons.innerHTML = eventByDate[8].Ballons;
    flowers.innerHTML = eventByDate[9].flowers;
    Singer.innerHTML = eventByDate[10].Singer;
}
//A button to reload the table and display the producer's events
function refresh() {
    var table = document.getElementById('iformationinTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    showSchedule();
}
//Disconnect function and switch to reconnect
function logout() {
    localStorage.setItem("corrent_maneger", "mail");
    showLogin();
}