class Servers {
  constructor() {
    this.serverelement = document.getElementById("server");
  }
  addNewPackage(newPackage)  //העברת ההודעה מהשרת ללקוח
  {
    var clienttosend = eval(`client${newPackage.addresseeOfMessage}`);
    function iflineempty() {
      if (clienttosend.cable.ifready == 1) {
        clienttosend.cable.changecable("red", 0);
        let distance = this.serverelement.offsetLeft - clienttosend.cable.lineekement.offsetLeft - 70;
        const moveAmount = 1;
        clienttosend.imgelement.style.visibility = "visible";
        clienttosend.imgelement.style.marginLeft = distance + 'px';
       //פונקצית הזזת האלמנט
        function startmoveElement() {
          distance -= moveAmount;
          clienttosend.imgelement.style.marginLeft = distance + 'px';
          if (clienttosend.imgelement.offsetLeft - clienttosend.cable.lineekement.offsetLeft <= 0) {
            clienttosend.cable.changecable("blue", 1);
            clienttosend.imgelement.style.visibility = "hidden";
            eval(`client${newPackage.addresseeOfMessage}`).saveAndShowNewMessage(newPackage);
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