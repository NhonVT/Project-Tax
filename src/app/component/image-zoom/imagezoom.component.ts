import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './imagezoom.component.html',
})

export class ImagezommComponent implements OnInit {

  title = 'Image Zoom';
  myThumbnai = '../../../assets/images/banner1.jpg';
  myFullresImage = '../../../assets/images/banner1.jpg';
  mode = 'hover';
  scrollAbale = true;
  zoomRatio = 4;
  magnification = 1;
  enableLens = false;
  constructor() {
  }

  ngOnInit() {
  }


}
