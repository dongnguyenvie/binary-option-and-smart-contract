export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  platforms: any = null;
  player: any = null;
  score = 0;
  scoreText: any = null;
  stars: any = null;

  create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.player.body.setGravityY(300);
    this.physics.add.collider(this.player, this.platforms);

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate(function (child: any) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this,
    );
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    } as any);
  }
  preload() {
    this.load.image('sky', 'assets/images/game/sky.png');
    this.load.image('ground', 'assets/images/game/platform.png');
    this.load.image('star', 'assets/images/game/star.png');
    this.load.image('bomb', 'assets/images/game/bomb.png');
    this.load.spritesheet('dude', 'assets/images/game/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  update() {
    console.log('update method');
  }

  startJump() {}

  collectStar(player: any, star: any) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
}
