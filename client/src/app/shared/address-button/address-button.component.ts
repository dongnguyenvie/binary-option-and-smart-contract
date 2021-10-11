import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-button',
  templateUrl: './address-button.component.html',
  styleUrls: ['./address-button.component.scss'],
})
export class AddressButtonComponent implements OnInit {
  @Input() account: any = [];
  @Output() changeAccount = new EventEmitter();
  @Output() requestConnect = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  handleChangeAccount() {
    this.changeAccount.emit();
  }

  handleRequestConnect() {
    this.requestConnect.emit();
  }
}
