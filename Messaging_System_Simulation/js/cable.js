class Cableline {
    constructor(phone) {
        this.ifready = 1; //פנוי-1 תפוס-0
        this.lineekement = document.getElementById('line' + phone);
    }
    changecable(changecolor, ifenablechange)  //משנה את זמינות הכבל
    {
        this.ifready = ifenablechange;
        this.lineekement.style.borderBottomColor = changecolor;
    }
}