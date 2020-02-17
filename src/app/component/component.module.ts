import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupLoginComponent } from './popup-login/popup-login.component';
import { BannerComponent } from './banner/banner.component';
import { SwiperFullComponent } from './swiper-full/swiper-full.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SliderComponent } from './slider/slider.component';
import { FormComponent } from './form/form.component';
const routes: Routes = [];

@NgModule({
    exports: [
        RouterModule,
        PopupLoginComponent,
        BannerComponent,
        SwiperFullComponent,
        SliderComponent,
        FormComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgxUsefulSwiperModule
    ],
    declarations: [
        PopupLoginComponent,
        BannerComponent,
        SwiperFullComponent,
        SliderComponent,
        FormComponent,
    ]
})
export class ComponentModule { }
