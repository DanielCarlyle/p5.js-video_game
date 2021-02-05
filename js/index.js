var ship;
var now, lastTime = 0;
var starBackground;
var score = 0;
var font;

var enemies = new Set();
var bullets = new Set();

function preload(){
	console.log('preload');
	// image = loadImage('asset/what.jpg', function(){

	// });
}

function setup() {
	console.log('setup');
	// image.width;
	// image.height;
	imageMode(CENTER);

    createCanvas(640, 480);
    ship = new Ship();
    enemy = new Enemy();
    starBackground = new StarBackground();

    font = loadBitmapFont(Data.get('font'), {
        glyphBorder: 0,
        glyphWidth: 8,
        glyphHeight: 8,
        cols: 8,
        rows: 12
    });
    bitmapTextFont(font);
}

function draw() {
    background(0, 0, 0);

    now = millis();
    var delta = (now - lastTime) / 1000;

    starBackground.update(delta);
    starBackground.draw();

    for (var b of bullets) {
        b.update(delta);
        b.draw();
    }

    ship.update(delta);
    ship.draw();

    if (frameCount % 150 == 0) {
        createSprite({ type: 'enemy_ship' });
    }

    for (var e of enemies) {
        e.update(delta);
        e.draw();
    }

    push();
    scale(2, 2);
    bitmapText("score: " + score, 20, 20);
    pop();

    collisionChecks();
    lastTime = now;
}

function collisionChecks() {
    // user <-> enemy bullets
    for (var b of bullets) {
        if (b.type == 'enemy_bullet') {
            var hasCollided = collidePointRect(

                b.position.x, b.position.y,
                ship.position.x, ship.position.y,
                64, 64);

            if (hasCollided) {
                ship.hit();
            }
        }
    }

    // user bullets <-> enemies
    for (var b of bullets) {
        if (b.type == 'user_bullet') {

            for (var e of enemies) {

                var hasCollided = collidePointRect(
                    b.position.x, b.position.y,
                    e.position.x, e.position.y,
                    64, 64);

                if (hasCollided) {
                    e.hit();
                    bullets.delete(b);
                }
            }
        }
    }
}

function removeShip(obj) {
    enemies.delete(obj);
}

function createSprite(config) {
    if (config.type == 'enemy_ship') {
        enemies.add(new Enemy());
    }
    if (config.type == 'user_bullet') {
        bullets.add(new Bullet(config));
    }
    if (config.type == 'enemy_bullet') {
        bullets.add(new Bullet(config));
    }
}