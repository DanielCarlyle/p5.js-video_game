function Enemy() {

    this.img = Data.get('enemy_ship');
    this.position = createVector(width, random(0, height - 64));
    this.health = 100;

    var lastTimeFired = 0;

    this.draw = function() {
        image(this.img, this.position.x, this.position.y);
    };

    this.update = function(delta) {
        this.position.x -= delta * 80;
        this.fire();
    };

    this.hit = function() {
        this.health -= 50;
        if (this.health <= 0) {
            removeShip(this);
            score += 100;
        }
    };

    this.fire = function() {
        var now = millis();
        if (now - lastTimeFired > 1500) {
            var pos = this.position.copy();
            pos.y += 28;

            createSprite({
                type: 'enemy_bullet',
                speed: -300,
                position: pos
            });
            lastTimeFired = now;
        }
    };
}