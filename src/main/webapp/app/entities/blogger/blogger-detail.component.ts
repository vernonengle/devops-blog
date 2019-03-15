import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBlogger } from 'app/shared/model/blogger.model';

@Component({
    selector: 'jhi-blogger-detail',
    templateUrl: './blogger-detail.component.html'
})
export class BloggerDetailComponent implements OnInit {
    blogger: IBlogger;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blogger }) => {
            this.blogger = blogger;
        });
    }

    previousState() {
        window.history.back();
    }
}
