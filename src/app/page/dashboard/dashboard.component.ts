import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { LazyService } from '../../services/lazy-service';
import { MessageSubcribeService } from '../../services/message-subcribe-service';
import { Subscription } from 'rxjs';
import { MessageSubcribeData } from 'src/app/models/message-subcribe-data';
import { CommonService } from 'src/app/services/common-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    subscription: Subscription;

    constructor(private elementRef: ElementRef, private messageSubService: MessageSubcribeService) {
        this.messageSubService.sendMessage(new MessageSubcribeData(CommonService.ShowDashboardMenuKey, ''));
    }

    ngOnInit() {
        setTimeout(() => {
            LazyService.ImgLazyLoad(this.elementRef);
        }, 500);
    }



}
