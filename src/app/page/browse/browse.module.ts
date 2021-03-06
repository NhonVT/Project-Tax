import { ComponentModule } from './../../component/component.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';

@NgModule({
    imports: [
        CommonModule,
        BrowseRoutingModule,
        ComponentModule,
        FormsModule
    ],
    declarations: [
        BrowseComponent
    ]
})
export class  BrowseModule { }
