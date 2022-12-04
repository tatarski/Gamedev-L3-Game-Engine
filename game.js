// Променливи, които пазят информация за играча
let player = {
    x: 400,
    y: 300,
    jivoti: 100,
    parichki: 0,
    ime: "Stamatcho",
    skorost: 5,
    shir: 80,
    vis: 100
};
// Добавете параметър на функцията drawItem
function drawItem() {
    let risuvan_item = this;
    context.fillText(risuvan_item.ime, risuvan_item.x - player.x, risuvan_item.y - player.y - 30);
    drawImage(risuvan_item.kartinka, risuvan_item.x - player.x, risuvan_item.y - player.y, risuvan_item.shir, risuvan_item.vis);
}
function drawItemRotate() {
    // Ще ползвам this
    // Само във функции: this пази обекта, който е извикал функцията
    context.save();
    context.translate(this.x- player.x, this.y- player.y);
    context.rotate(Math.PI/3);
    drawImage(this.kartinka, -this.shir/2, -this.vis/2, this.shir, this.vis);
    context.restore();
}

let predmeti = [];
let ranica = [];
let imena = ["ZELKA", "DIAMANT", "DIAMOND", "BUTILKA_ZA_VODA", "MONSTAR", "ZLATO", "KABEL"]
function init() {
    for (let i = 0; i < 100; i++) {
        let nov_item = {
            // Избирайте случайни картинки
            kartinka: gem[randomInteger(30)],
            ime: imena[randomInteger(imena.length)],
            opisanie: "MNOGO SKAPOCENEN KAMAK",
            // Избирайте случайни координати
            x: randomInteger(1900),
            y: randomInteger(1300),
            shir: 30,
            vis: 30,
            draw: [drawItemRotate, drawItem][randomInteger(2)]
        }
        predmeti.push(nov_item);
    }
}
function update() {
    //D -> надясно
    if(isKeyPressed[68]) {
        player.x += player.skorost;
    }  //A -> надясно
    if(isKeyPressed[65]) {
        player.x -= player.skorost;
    } //W -> надясно
    if(isKeyPressed[87]) {
        player.y -= player.skorost;
    } //S -> надясно
    if(isKeyPressed[83]) {
        player.y += player.skorost;
    }
    for(let i = 0; i < predmeti.length; i++) {
        let item = predmeti[i];
        if (areColliding(player.x, player.y, player.shir, player.vis, 
                item.x, item.y, item.shir, item.vis)) {
            // 1. Да махнем предмета от масива predmeti
            predmeti[i] = predmeti[predmeti.length - 1];
            predmeti.length--;
            // 2. Да добавим предмета в раницата на играча
            ranica.push(item);
        }
    }
}
function draw() {
    drawImage(backForest, -player.x, -player.y, 1900, 1300)
    drawImage(spy[1], 400, 300, player.shir, player.vis);
    context.font = "30px Courier New";
    context.fillText(player.ime, 400, 300-30);
    context.fillText("PARICHKI: " + player.parichki, player.x, player.y- 60);
    context.fillText("JIVOTI: " + player.jivoti, player.x, player.y- 90);
    for(let i = 0; i < predmeti.length; i++) {
        let tek_item = predmeti[i];
        tek_item.draw();
    }
    for(let i = 0; i < ranica.length; i++) {
        let item = ranica[i];
        drawImage(item.kartinka, i*50, 0, 50, 50);
        context.font = "20px Courier New";
        if(areColliding(mouseX, mouseY, 1, 1,
            i*50, 0, 50, 50)) {
                context.fillText(item.ime, mouseX, mouseY);
                context.fillText(item.opisanie, mouseX, mouseY + 20);
            }
    }
}
function mouseup() {
}
function keyup(key) {
}

