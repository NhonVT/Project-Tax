import { Component, OnInit, ElementRef } from '@angular/core';
import { LazyService } from '../services/lazy-service';


@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html'
})


export class MainLayoutComponent implements OnInit {


    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            LazyService.ImgLazyLoad(this.elementRef);
        }, 500);
    }

}
