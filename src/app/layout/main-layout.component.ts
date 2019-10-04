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
    docEl: any;
    pageWrap: any;
    scrollTop: any;
    isOverlay = false;
    isShow = false;
    isChangeClose = false;
    isClock = false;
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
                } else if (dataMessage.Key === CommonService.ShowBrowseMenuKey) {
                    this.activeMenuId = 2;
                }
            }
        });
    }

    showMenu() {
        if (this.isShow === false) {
            this.isShow = !this.isShow;
            this.isChangeClose = !this.isChangeClose;
            this.document.body.classList.add('fs-no-scroll');
            // this.lockBody();
        } else {
            // this.unlockBody();
            this.isShow = false;
            this.isChangeClose = false;
            this.document.body.classList.remove('fs-no-scroll');
        }
    }

    //  setStyle() {
    //      const styles = {
    //          top: -(this.scrollTop),
    //      };
    //      return styles;
    //  }
    //  setStyle2() {
    //      const styles = {
    //          top: 'auto',
    //      };
    //      return styles;
    //  }
 
    //  // Lock touch body
    //  lockBody() {
    //      if (window.pageYOffset) {
    //          this.scrollTop = window.pageYOffset;
    //          this.setStyle();
    //      }
    //      this.document.body.classList.add('fs-no-scroll');
    //  }
 
    //  // Unlock touch body
    //  unlockBody() {
    //      window.scrollTo(0, this.scrollTop);
    //      this.setStyle2();
    //      window.setTimeout(function() {
    //          this.scrollTop = null;
    //      }, 0);
    //      this.document.body.classList.remove('fs-no-scroll');
    //  }

    ngOnInit() {

    }

}
