var mainState = {
    
    // preload all of the graphics and sounds
    preload: function() {
        game.load.image('background', './cinnamons.jpg');
        game.load.image('ground', './cm_ground.png');
        game.load.image('obstacle', './washpile.png');
        game.load.spritesheet('character', './ruth.png', 160, 160, 4);
    },
    
    // create and initialise the game objects and settings
    create: function() {
        background = game.add.sprite(0, 0, 'background');

        ground = game.add.sprite(0, 372, 'ground');
        game.physics.arcade.enable(ground);
        ground.body.immovable = true;

        ground2 = game.add.sprite(1000, 372, 'ground');
        game.physics.arcade.enable(ground2);
        ground2.body.immovable = true;

        barrier = game.add.sprite(900, 330, 'obstacle');
        game.physics.arcade.enable(barrier);

        player = game.add.sprite(150, 150, 'character');
        walk = player.animations.add('walk');
        player.animations.play('walk', 8, true);

        game.physics.arcade.enable(player);
        player.body.gravity.y = 500;

        speed = 5;

        game.input.onTap.add(function() {
            if (player.body.touching.down) {
                player.body.velocity.y = -500;
            }
        }, this);
    },
    
    // runs continuously at 60 frames per second
    update: function() {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        //collisions section
        game.physics.arcade.collide(player, ground);
        game.physics.arcade.collide(player, ground2);

        game.physics.arcade.overlap(player, barrier, this.gameOver, null, this);

        //move the obstacle
        barrier.x -= speed;
        if (barrier.x <= -128) {
            barrierPosition = game.rnd.integerInRange(1000, 3000);
            barrier.x = barrierPosition;
            speed++;
            console.log({speed}, {barrierPosition});
        }

        // move the ground
        ground.x -= speed;
        ground2.x -= speed;
        if (ground.x < -1000){
            ground.x = 0;
            ground2.x = 1000;
        }

        //player jump
        if (this.input.keyboard.isDown(Phaser.Keyboard.J) && player.body.touching.down) {
            player.body.velocity.y = -500;
        }
    },

    gameOver: function(){
        game.paused = true;   
    },
     
};

var game = new Phaser.Game(1000,500);

game.state.add('main', mainState,Phaser.AUTO,'gameDIV');
game.state.start('main');