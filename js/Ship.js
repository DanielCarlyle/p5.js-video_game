function Ship() {

    this.position = createVector(0, height / 2);
    var img = Data.get('user_ship');

    var lastTimeFired = 0;
    var timeReset = 0;

    this.draw = function() {
        push();
        translate(this.position.x, this.position.y);

        if (timeReset > 0) {
            // tint(255 * sin(frameCount));
            rotate(timeReset / 10);

            //translate(32, 32);
        } else {
            rotate(0);
            // tint(255);
        }

        image(img, 0, 0);
        pop();

    };

    this.hit = function() {
        // this.position.x = 0;
        // this.position.y = height / 2;
        timeReset = 100;
        score = 0;
    }

    this.fire = function() {
        var now = millis();
        if (now - lastTimeFired > 500) {

            var pos = this.position.copy();
            pos.y += 28;
            pos.x += 50;

            createSprite({
                type: 'user_bullet',
                position: pos,
                speed: 600
            });
            lastTimeFired = millis();
        }
    };

    this.update = function(delta) {

        if (keyIsDown(UP_ARROW)) { this.position.y -= 400 * delta; }
        if (keyIsDown(DOWN_ARROW)) { this.position.y += 400 * delta; }
        if (keyIsDown(LEFT_ARROW)) { this.position.x -= 400 * delta; }
        if (keyIsDown(RIGHT_ARROW)) { this.position.x += 400 * delta; }

        if (keyIsDown(32)) {
            this.fire();
        }
        this.position.x = constrain(this.position.x, 0, width - img.width);
        this.position.y = constrain(this.position.y, 0, height - img.height);

        timeReset -= 100 * delta;
    };
}