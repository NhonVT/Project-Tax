import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MessageSubcribeService } from '../../services/message-subcribe-service';
import { MessageSubcribeData } from '../../models/message-subcribe-data';
import { CommonService } from '../../services/common-service';
import { LazyService } from '../../services/lazy-service';


@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html'
})

export class BrowseComponent implements OnInit {


    constructor(private elementRef: ElementRef, private messageSubService: MessageSubcribeService) {
        this.messageSubService.sendMessage(new MessageSubcribeData(CommonService.ShowBrowseMenuKey, ''));
    }

    ngOnInit() {
        setTimeout(() => {
            LazyService.ImgLazyLoad(this.elementRef);
        }, 500);
    }

}
