import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MessageSubcribeService } from '../../services/message-subcribe-service';
import { MessageSubcribeData } from '../../models/message-subcribe-data';
import { CommonService } from '../../services/common-service';


@Component({
    selector: 'app-getting',
    templateUrl: './getting.component.html'
})

export class GettingComponent implements OnInit {


    constructor(private elementRef: ElementRef, private messageSubService: MessageSubcribeService) {
        this.messageSubService.sendMessage(new MessageSubcribeData(CommonService.ShowGettingAroundMenuKey, ''));
    }

    ngOnInit() {

    }

}
