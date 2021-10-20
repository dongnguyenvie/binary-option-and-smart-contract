import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft-gallery-page',
  templateUrl: './nft-gallery-page.component.html',
  styleUrls: ['./nft-gallery-page.component.scss'],
})
export class NftGalleryPageComponent implements OnInit {
  sprite = {
    attributes: [
      { trait_type: 'Shape', value: 'Circle' },
      { trait_type: 'Mood', value: 'Sad' },
    ],
    description: 'A sad circle.',
    image: 'http://localhost:5000/public/images/x1.png',
    name: 'Sad Circle',
    id: '1',
  };

  constructor() {}

  ngOnInit() {}
}
