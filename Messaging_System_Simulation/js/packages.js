class Packagebox {
    constructor(addresseeOfMessage, contentOfMessage, addressedOfMessage) {
        this.contentOfMessage = contentOfMessage;
        this.addresseeOfMessage = addresseeOfMessage || []; //נמען
        this.addressedOfMessage = addressedOfMessage;//מוען
    }
    removeDetailFromHtml(fromwho) //מחיקת פרטי ההודעה מהמסך
    {
        document.getElementById('phone' + fromwho).value = '';
        document.getElementById('content' + fromwho).value = '';
    }
    addNewPackage() //העברת ההודעה מהלקוח לשרת
    {
        var clienttosend = eval(`client${this.addressedOfMessage}`);
        function iflineempty() {
            if (clienttosend.cable.ifready == 1) //אם הכבל זמין
            {
                clienttosend.imgelement.style.visibility = "visible";
                clienttosend.cable.changecable("red", 0);
                const targetElement = document.getElementById('server');
                let distance = 0;
                const moveAmount = 1;
                function startmoveElement() //פונקציה המזיזה את האלמנט
                {
                    distance += moveAmount;
                    clienttosend.imgelement.style.marginLeft = distance + 'px';
                    if (clienttosend.imgelement.offsetLeft + 70 >= targetElement.offsetLeft) {
                        clienttosend.imgelement.style.marginLeft = 0 + 'px';
                        clienttosend.imgelement.style.visibility = "hidden";
                        clienttosend.cable.changecable("blue", 1);
                        for (var x in this.addresseeOfMessage) {
                            let packacordphone = new Packagebox(this.addresseeOfMessage[x], this.contentOfMessage, this.addressedOfMessage);
                            mainserver.addNewPackage(packacordphone);
                        }
                        clearInterval(tomoveelement);
                    }
                }
                const tomoveelement = setInterval(startmoveElement.bind(this), 10);
                clearInterval(checkiflineempty);
            }
        }
        const checkiflineempty = setInterval(iflineempty.bind(this), 20);
    }
} 