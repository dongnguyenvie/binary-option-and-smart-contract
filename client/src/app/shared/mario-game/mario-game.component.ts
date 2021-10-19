import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { MainScene } from './MainScene';

@Component({
  selector: 'app-mario-game',
  templateUrl: './mario-game.component.html',
  styleUrls: ['./mario-game.component.scss'],
})
export class MarioGameComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

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
        },
      },
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
