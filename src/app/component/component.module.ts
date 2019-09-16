import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupLoginComponent } from './popup-login/popup-login.component';
import { BannerComponent } from './banner/banner.component';
const routes: Routes = [];

@NgModule({
    exports: [
        RouterModule,
        PopupLoginComponent,
        BannerComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
    ],
    declarations: [
        PopupLoginComponent,
        BannerComponent
    ]
})
export class ComponentModule { }
