var allphonenumber;
var mainserver = new Servers();
var client0583235695 = new Clients("0583235695");
var client0548444164 = new Clients("0548444164");
var client0548590344 = new Clients("0548590344");

function sendMessage(phonefriend, contentOfMessage, fromwho) //פעולה של קבלת הודעה חדשה 
{
    allphonenumber = phonefriend.split(","); //המרת המספרי טלפון למערך המספרים
    for (var x in allphonenumber) {
        if (allphonenumber[x] != "0583235695" && allphonenumber[x] != "0548444164" && allphonenumber[x] != "0548590344") {
            alert("your phone number is anvalid, please try again");
            return; //  אם המספר שהוקש אינו קים תהיה הודעת שגיאה והפעולה תופסק
        }
    }
    var pack = new Packagebox(allphonenumber, contentOfMessage, fromwho); //יצירת אוביקט הודעה
    pack.removeDetailFromHtml(fromwho); //מחיקת האינפוטים של פרטי ההודעה
    pack.addNewPackage();   // שליחת הודעה להמשך תהליך
}
//הודעות יזומות כל חצי דקה
function SendingProactiveMessage() {
    alert("Sending a proactive message");
    var pack1 = new Packagebox(["0548444164", "0583235695"], "Sending a proactive message", "0548444164"); //יצירת אוביקט הודעה
    pack1.addNewPackage();
}
const checkifemptyline = setInterval(SendingProactiveMessage.bind(this), 30000);
