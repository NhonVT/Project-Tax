import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { LazyService } from 'src/app/services/lazy-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {



    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            LazyService.ImgLazyLoad(this.elementRef);
        }, 500);
    }



}
