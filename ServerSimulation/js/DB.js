//Retrieving the data from the database
var users = JSON.parse(localStorage.getItem('Users')) || [];
var allEvents = JSON.parse(localStorage.getItem('events')) || [];
//The database class that runs on them
class DB {
    constructor() { }
    //Brings current producer record
    get_events() {
        allEvents = JSON.parse(localStorage.getItem('events')) || [];
        var eventsByManeger = [];//אירוועים של מפיק ספציפי
        for (var index = 0; index < allEvents.length; index++) {
            if (allEvents[index][0].codeManeger == JSON.parse(localStorage.getItem("corrent_maneger"))) {
                eventsByManeger.push(allEvents[index]);
            }
        }
        return eventsByManeger;
    }
    //Returns a single record of a specific event
    get_event(dateS) {
        allEvents = JSON.parse(localStorage.getItem('events')) || [];
        var eventByDate;
        for (var index = 0; index < allEvents.length; index++) {
            if (allEvents[index][0].codeManeger == JSON.parse(localStorage.getItem("corrent_maneger")) && allEvents[index][3].date == dateS) {
                eventByDate = allEvents[index];
            }
        }
        return eventByDate;
    }
    //Adding an event to the event array
    add_event(eventa) {
        var allEvents = JSON.parse(localStorage.getItem('events')) || [];
        var eventData = [{ codeManeger: JSON.parse(localStorage.getItem("corrent_maneger")) }, { nameOfClient: eventa[0].nameOfClient }, { tel: eventa[1].tel },
        { date: eventa[2].date }, { kindOfEvent: eventa[3].kindOfEvent }, { location: eventa[4].location }, { numOfPeople: eventa[5].numOfPeople }
            , { photographer: eventa[6].photographer }, { Ballons: eventa[7].Ballons }, { flowers: eventa[8].flowers }, { Singer: eventa[9].Singer }];
        allEvents.push(eventData);
        localStorage.setItem('events', JSON.stringify(allEvents));
        return eventa[0].nameOfClient;
    }
    //Deleting a specific event
    remove_event(dateE) {
        allEvents = JSON.parse(localStorage.getItem('events')) || [];
        for (var i = 0; i < allEvents.length; i++) {
            if (allEvents[i][0].codeManeger == JSON.parse(localStorage.getItem("corrent_maneger")) && allEvents[i][3].date == JSON.parse(dateE).date) {
                allEvents.splice(i, 1);
            }
        }
        localStorage.setItem('events', JSON.stringify(allEvents));
        return dateE;
    }
    //Search for an event to update by the date and return it
    update_event(dateU) {
        allEvents = JSON.parse(localStorage.getItem('events')) || [];
        for (var i = 0; i < allEvents.length; i++) {
            if (allEvents[i][0].codeManeger == JSON.parse(localStorage.getItem("corrent_maneger")) && allEvents[i][3].date == dateU) {
                return allEvents[i];
            }
        }
    }
    //Specific event update
    update_form(eventData) {
        allEvents = JSON.parse(localStorage.getItem('events')) || [];
        for (var i = 0; i < allEvents.length; i++) {
            if (allEvents[i][0].codeManeger == JSON.parse(localStorage.getItem("corrent_maneger")) && allEvents[i][3].date == eventData[10].datebefore) {
                allEvents[i][1].nameOfClient = eventData[0].nameOfClient;
                allEvents[i][2].tel = eventData[1].tel;
                allEvents[i][3].date = eventData[2].date;
                allEvents[i][4].kindOfEvent = eventData[3].kindOfEvent;
                allEvents[i][5].location = eventData[4].location;
                allEvents[i][6].numOfPeople = eventData[5].numOfPeople;
                allEvents[i][7].photographer = eventData[6].photographer;
                allEvents[i][8].Ballons = eventData[7].Ballons;
                allEvents[i][9].flowers = eventData[8].flowers;
                allEvents[i][10].Singer = eventData[9].Singer;
            }
        }
        localStorage.setItem('events', JSON.stringify(allEvents));
        return eventData[0].nameOfClient;
    }
    //function to add a new user 
    maneger(name, tel, mail, pas) {
        var userData = [{ name: name }, { tel: tel }, { mail: mail }, { password: pas }];
        users.unshift(userData);
        localStorage.setItem('Users', JSON.stringify(users));
        localStorage.setItem('corrent_maneger', JSON.stringify(mail));
        return name;
    }
}

