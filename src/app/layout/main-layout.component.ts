import { Component, OnInit, ElementRef, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MessageSubcribeService } from '../services/message-subcribe-service';
import { CommonService } from '../services/common-service';


@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html'
})


export class MainLayoutComponent implements OnInit {
    scrollTop: any;
    isOverlay = false;
    isShow = false;
    isChangeClose = false;
    isClock = false;
    activeMenuId = 0;
    subscription: Subscription;

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: Document,
        private messageSubService: MessageSubcribeService) {
        this.subscription = this.messageSubService.getMessage().subscribe(dataMessage => {
            if (dataMessage !== null) {
                if (dataMessage.Key === CommonService.ShowDashboardMenuKey) {
                    this.activeMenuId = 1;
                } else if (dataMessage.Key === CommonService.ShowBrowseMenuKey) {
                    this.activeMenuId = 2;
                }
            }
        });
    }

    ngOnInit() {

    }

    showMenu() {
        if (this.isShow === false) {
            this.isShow = !this.isShow;
            this.isChangeClose = !this.isChangeClose;
            this.document.body.classList.add('fs-no-scroll');
        } else {
            this.isShow = false;
            this.isChangeClose = false;
            this.document.body.classList.remove('fs-no-scroll');
        }
    }
}
