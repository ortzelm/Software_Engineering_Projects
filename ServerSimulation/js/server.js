//Creating objects of the database and fajax so that we can run the operations on them from the server
var db = new DB;
var f = new fajax;
//server class - to connect with the data base
class Server {
    //empty constructor
    constructor() { }
    //Identifies which function the customer/line requested from the database
    whichFunc(fajax_current) {
        var method = fajax_current.method;
        var url = fajax_current.url;
        var link = url.split("/");
        switch (method) {
            case "GET":
                if (link[1] == "get_events") {
                    var returnedEvent = db.get_events();
                    fajax_current.onload(200);
                    return returnedEvent;
                }
                if(link[1] == "get_event"){
                    var returnedEvent = db.get_event(link[2]);
                    if(!returnedEvent){
                        fajax_current.onload(404);
                    }
                    else{
                       fajax_current.onload(200);
                    }
                    return returnedEvent;
                }
                break;
            //remove function
            case "DELETE":
                if (link[1] == "remove_event") {
                    var returnedEvent = db.remove_event(link[2]);
                    fajax_current.onload(200);
                    return returnedEvent;
                }
                break;
            case "POST":
                if (link[1] == "maneger") {
                    var returnedEvent = db.maneger(link[2], link[3], link[4], link[5]);
                    fajax_current.onload(200);
                    return returnedEvent;
                }
                if (link[1] == "add_event") {
                    var eventData = [
                        { nameOfClient: link[2] },
                        { tel: link[3] },
                        { date: link[4] },
                        { kindOfEvent: link[5] },
                        { location: link[6] },
                        { numOfPeople: link[7] },
                        { photographer: link[8] },
                        { Ballons: link[9] },
                        { flowers: link[10] },
                        { Singer: link[11] }];
                    var returnedEvent = db.add_event(eventData);
                    fajax_current.onload(200);
                    return returnedEvent;
                }
                break;
            //update function
            case "PUT":
                if ( link[1]== "update_event") {
                    var returnedEvent =db.update_event(link[2]);
                    fajax_current.onload(200);
                   return returnedEvent;
                }
                if( link[1]== "update_form"){
                     var eventData = [
                        { nameOfClient: link[3] },
                        { tel: link[4] },
                        { date: link[5] },
                        { kindOfEvent: link[6] },
                        { location: link[7] },
                        { numOfPeople: link[8] },
                        { photographer: link[9] },
                        { Ballons: link[10] },
                        { flowers: link[11] },
                        { Singer: link[12] },
                        {datebefore: link[2]}];
                    var returnedEvent =db.update_form(eventData);
                    fajax_current.onload(200);
                    return returnedEvent;
                }
            default:
                break;
        }
    }
}