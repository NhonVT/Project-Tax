import { ComponentModule } from './../../component/component.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingRoutingModule } from './getting-routing.module';
import { GettingComponent } from './getting.component';

@NgModule({
    imports: [
        CommonModule,
        GettingRoutingModule,
        ComponentModule,
        FormsModule
    ],
    declarations: [
        GettingComponent
    ]
})
export class  GettingModule { }
