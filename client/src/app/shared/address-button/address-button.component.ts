import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-button',
  templateUrl: './address-button.component.html',
  styleUrls: ['./address-button.component.scss'],
})
export class AddressButtonComponent implements OnInit {
  @Input() accounts: any = [];
  @Input() changeAccount: () => void;
  @Input() requestConnect: () => void;

  constructor() {}

  ngOnInit() {}
}
