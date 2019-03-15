import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBlogger } from 'app/shared/model/blogger.model';
import { BloggerService } from './blogger.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-blogger-update',
    templateUrl: './blogger-update.component.html'
})
export class BloggerUpdateComponent implements OnInit {
    blogger: IBlogger;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected bloggerService: BloggerService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blogger }) => {
            this.blogger = blogger;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.blogger.id !== undefined) {
            this.subscribeToSaveResponse(this.bloggerService.update(this.blogger));
        } else {
            this.subscribeToSaveResponse(this.bloggerService.create(this.blogger));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlogger>>) {
        result.subscribe((res: HttpResponse<IBlogger>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
