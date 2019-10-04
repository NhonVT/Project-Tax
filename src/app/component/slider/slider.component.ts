import { Component, OnInit, Inject } from '@angular/core';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
})

export class SliderComponent implements OnInit {

  config: SwiperOptions = {
    effect: 'slide',
    loop: true,
    speed: 800,
    preventClicksPropagation: false,
    slidesPerView: 3,
    breakpoints: {
      520: {
        slidesPerView: 1
      },
      840: {
        slidesPerView: 2
      },
      1100: {
        slidesPerView: 3,
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y: {
      enabled: false
    }
  };

  constructor() {
  }

  ngOnInit() {
  }


}
