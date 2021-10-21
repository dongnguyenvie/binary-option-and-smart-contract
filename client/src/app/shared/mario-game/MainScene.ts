import { NFT } from 'src/app/@core/interfaces/common';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  platforms: Phaser.Physics.Arcade.StaticGroup;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  score = 0;
  scoreText: any = null;
  stars: any = null;

  nft: NFT;
  name: Phaser.GameObjects.Text;

  init(data: { nft: NFT }) {
    console.info('data', data.nft);
    this.nft = data.nft;
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');

    this.platforms = this.physics.add.staticGroup();

    //
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
    //

    this.name = this.add.text(0, 0, this.nft.name);

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);
    this.player.anims.create({
      key: 'left',
      frames: [{ key: 'dude', frame: 1 }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: [{ key: 'dude', frame: 8 }],
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
    this.load.spritesheet('dude', this.nft.image, {
      frameWidth: 25,
      frameHeight: 38,
    });
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      console.log('this.nft.attrs?.pump', this.nft.attrs);
      this.player.setVelocityY(-(this.nft.attrs?.pump || 1) * 1.5);
    }

    this.name.setPosition(this.player.x - 25, this.player.y - 40);
  }

  startJump() {}

  collectStar(player: any, star: any) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
}
