

function init() {
    inventory_manager.generate_objects();
}
function check_for_player_item_collisions() {
        for(let i = 0; i < inventory_manager.predmeti.length; i++) {
        let item = inventory_manager.predmeti[i];
        if (areColliding(player.x, player.y, player.shir, player.vis, 
                item.x, item.y, item.shir, item.vis)) {
            // 1. Да махнем предмета от масива predmeti
            inventory_manager.predmeti[i] = inventory_manager.predmeti[inventory_manager.predmeti.length - 1];
            inventory_manager.predmeti.length--;
            // 2. Да добавим предмета в раницата на играча
            inventory_manager.ranica.push(item);
        }
    }
}
function update() {
    check_for_player_item_collisions();
    player.control();
}
function draw() {
    player.draw();
    inventory_manager.draw_inventory();
    inventory_manager.draw_items();
}
function mouseup() {
}
function keyup(key) {
}

