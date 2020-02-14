import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupLoginComponent } from './popup-login/popup-login.component';
import { BannerComponent } from './banner/banner.component';
import { SwiperFullComponent } from './swiper-full/swiper-full.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SliderComponent } from './slider/slider.component';
import { FormComponent } from './form/form.component';
import { ImagezommComponent } from './image-zoom/imagezoom.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
const routes: Routes = [];

@NgModule({
    exports: [
        RouterModule,
        PopupLoginComponent,
        BannerComponent,
        SwiperFullComponent,
        SliderComponent,
        FormComponent,
        ImagezommComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgxUsefulSwiperModule,
        NgxImageZoomModule
    ],
    declarations: [
        PopupLoginComponent,
        BannerComponent,
        SwiperFullComponent,
        SliderComponent,
        FormComponent,
        ImagezommComponent,
    ]
})
export class ComponentModule { }
