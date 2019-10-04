import { Component, OnInit, Inject } from '@angular/core';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';

@Component({
  selector: 'app-swiper-full',
  templateUrl: './swiper-full.component.html',
})

export class SwiperFullComponent implements OnInit {

  config: SwiperOptions = {
    effect: 'fade',
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    a11y: {
      enabled: true
    },
  };

  constructor() {
  }

  ngOnInit() {
  }


}
