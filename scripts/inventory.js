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
function generate_objects() {
    for (let i = 0; i < 100; i++) {
        let nov_item = {
            // Избирайте случайни картинки
            kartinka: gem[randomInteger(30)],
            ime: this.imena[randomInteger(inventory_manager.imena.length)],
            opisanie: "MNOGO SKAPOCENEN KAMAK",
            // Избирайте случайни координати
            x: randomInteger(1900),
            y: randomInteger(1300),
            shir: 30,
            vis: 30,
            draw: [drawItemRotate, drawItem][randomInteger(2)]
        }
        this.predmeti.push(nov_item);
    }
}
function draw_items() {
    for(let i = 0; i < this.predmeti.length; i++) {
        let tek_item = this.predmeti[i];
        tek_item.draw();
    }
}
function draw_inventory() {
    for(let i = 0; i < this.ranica.length; i++) {
        let item = this.ranica[i];
        drawImage(item.kartinka, i*50, 0, 50, 50);
        context.font = "20px Courier New";
        if(areColliding(mouseX, mouseY, 1, 1,
            i*50, 0, 50, 50)) {
                context.fillText(item.ime, mouseX, mouseY);
                context.fillText(item.opisanie, mouseX, mouseY + 20);
            }
    }

}
let inventory_manager = {
    predmeti: [],
    ranica: [],
    imena: ["ZELKA", "DIAMANT", "DIAMOND", "BUTILKA_ZA_VODA", "MONSTAR", "ZLATO", "KABEL"],
    draw_items: draw_items,
    draw_inventory: draw_inventory,
    generate_objects: generate_objects
}