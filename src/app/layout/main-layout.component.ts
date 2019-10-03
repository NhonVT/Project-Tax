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

    isMenu = false;
    isSubmenu = 0;
    isIconRotate = 0;
    closeNav = false;
    activeMenuId = 0;
    subscription: Subscription;
    // tslint:disable-next-line: deprecation
    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: Document,
        private messageSubService: MessageSubcribeService) {
        this.subscription = this.messageSubService.getMessage().subscribe(dataMessage => {
            if (dataMessage !== null) {
                if (dataMessage.Key === CommonService.ShowDashboardMenuKey) {
                    this.activeMenuId = 1;
                } else if (dataMessage.Key === CommonService.ShowGettingAroundMenuKey) {
                    this.activeMenuId = 3;
                }
            }
        });
    }

    OpenMemu() {
        if (window.innerWidth < 1100) {
            this.isMenu = !this.isMenu;
            if (this.isMenu) {
                this.document.body.classList.add('no-scroll');
            } else {
                this.document.body.classList.remove('no-scroll');
            }
        }
    }

    ShowSubMenu(index: number) {
        if (window.innerWidth < 1100) {
            if (this.isSubmenu === index) {
                this.isSubmenu = 0;
                this.isIconRotate = 0;
            } else {
                this.isSubmenu = index;
                this.isIconRotate = index;
            }
        }

    }

    ngOnInit() {

    }

}
