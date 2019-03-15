import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBlogger } from 'app/shared/model/blogger.model';
import { AccountService } from 'app/core';
import { BloggerService } from './blogger.service';

@Component({
    selector: 'jhi-blogger',
    templateUrl: './blogger.component.html'
})
export class BloggerComponent implements OnInit, OnDestroy {
    bloggers: IBlogger[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected bloggerService: BloggerService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.bloggerService
            .query()
            .pipe(
                filter((res: HttpResponse<IBlogger[]>) => res.ok),
                map((res: HttpResponse<IBlogger[]>) => res.body)
            )
            .subscribe(
                (res: IBlogger[]) => {
                    this.bloggers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBloggers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBlogger) {
        return item.id;
    }

    registerChangeInBloggers() {
        this.eventSubscriber = this.eventManager.subscribe('bloggerListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
