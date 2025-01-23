class Clients {
    constructor(phoneofclient) {
        this.imgelement = document.getElementById('img' + phoneofclient);
        this.alllastmessage = document.getElementById('lastmessage' + phoneofclient);
        this.cable = new Cableline(phoneofclient);
        this.packages = [];    //כל ההודעות שהתקבלו
    }
    saveAndShowNewMessage(messagetosave)  //שמירת הודעה והצגה ההודעה 
    {
        this.packages.push(messagetosave);
        let newmessage = document.createElement('p');
        newmessage.id = "message" + this.packages.length;
        newmessage.className = "messageapart";
        newmessage.textContent = messagetosave.contentOfMessage;
        this.alllastmessage.appendChild(newmessage);
    }
}