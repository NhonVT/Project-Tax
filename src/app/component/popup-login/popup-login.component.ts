import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-popup-login',
  templateUrl: './popup-login.component.html',
})

export class PopupLoginComponent implements OnInit {
  isSignIn = true;
  isTaxCode = false;
  isShowPopUp = true;

  constructor() {
  }

  ngOnInit() {
  }

  showTaxCode() {
    this.isShowPopUp = true;
    this.isSignIn = false;
    this.isTaxCode = true;
  }


}
