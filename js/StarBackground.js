function StarBackground() {

    this.stars = new Array(50);

    for(var i = 0; i < this.stars.length; ++i){
        this.stars[i] = createVector(
            random(0, width),
            random(0, height),
            random(30, 300)
        );
    }

    this.update = function(delta) {

        for (var star of this.stars) {
            star.x -= delta * star.z;

            if (star.x < -5) {
                star.x = random(width, width * 2);
                star.y = random(0, height);
                star.z = random(30, 300);
            }
        }
    };

    this.draw = function() {
        fill(255, 255, 255);

        for(var star of this.stars){
            rect(star.x, star.y, 4, 4);
        }
    };
}