import { Component, OnInit, ElementRef, Inject, HostListener } from '@angular/core';
import { LazyService } from '../services/lazy-service';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html'
})


export class MainLayoutComponent implements OnInit {

    isMenu = false;
    isSubmenu = 0;
    close = false;
    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {
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
            } else {
                this.isSubmenu = index;
            }
        }

    }

    ngOnInit() {

    }

}
