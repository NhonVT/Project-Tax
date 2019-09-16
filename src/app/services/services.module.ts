import { NgModule } from '@angular/core';
import { LocalStorage } from './local-storage';
import {CommonService } from './common-service';
@NgModule({
    imports: [
    ],
    declarations: [],
    providers: [
        LocalStorage,
        CommonService,
    ],
})
export class ServicesModule { }
