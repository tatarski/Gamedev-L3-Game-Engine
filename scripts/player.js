function movePlayerASDW() {
    //D -> надясно
    if(isKeyPressed[68]) {
        this.x += this.skorost;
    }  //A -> надясно
    if(isKeyPressed[65]) {
        this.x -= this.skorost;
    } //W -> надясно
    if(isKeyPressed[87]) {
        this.y -= this.skorost;
    } //S -> надясно
    if(isKeyPressed[83]) {
        this.y += this.skorost;
    }
}
function drawPlayer() {
    drawImage(backForest, -player.x, -player.y, 1900, 1300)
    drawImage(spy[1], 400, 300, player.shir, player.vis);
    context.font = "30px Courier New";
    context.fillText(player.ime, 400, 300-30);
    context.fillText("PARICHKI: " + player.parichki, player.x, player.y- 60);
    context.fillText("JIVOTI: " + player.jivoti, player.x, player.y- 90);
}
// Променливи, които пазят информация за играча
let player = {
    x: 400,
    y: 300,
    jivoti: 100,
    parichki: 0,
    ime: "Stamatcho",
    skorost: 5,
    shir: 80,
    vis: 100,
    control: movePlayerASDW,
    draw: drawPlayer
};