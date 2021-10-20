import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { MainScene } from './MainScene';
import { NFT } from '../../@core/interfaces/common';
@Component({
  selector: 'app-mario-game',
  templateUrl: './mario-game.component.html',
  styleUrls: ['./mario-game.component.scss'],
})
export class MarioGameComponent implements OnInit, OnDestroy {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  @Input() nft: NFT;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [MainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 },
          // debug: true,
        },
      },
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
    this.phaserGame.scene.start('main', {
      nft: this.nft,
    });
  }

  ngOnDestroy() {
    this.phaserGame.destroy(true);
  }
}
