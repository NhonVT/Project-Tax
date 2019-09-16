import { ComponentModule } from './../../component/component.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ComponentModule,
        FormsModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class  DashboardModule { }
