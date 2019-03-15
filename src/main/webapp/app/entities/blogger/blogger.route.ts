import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Blogger } from 'app/shared/model/blogger.model';
import { BloggerService } from './blogger.service';
import { BloggerComponent } from './blogger.component';
import { BloggerDetailComponent } from './blogger-detail.component';
import { BloggerUpdateComponent } from './blogger-update.component';
import { BloggerDeletePopupComponent } from './blogger-delete-dialog.component';
import { IBlogger } from 'app/shared/model/blogger.model';

@Injectable({ providedIn: 'root' })
export class BloggerResolve implements Resolve<IBlogger> {
    constructor(private service: BloggerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBlogger> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Blogger>) => response.ok),
                map((blogger: HttpResponse<Blogger>) => blogger.body)
            );
        }
        return of(new Blogger());
    }
}

export const bloggerRoute: Routes = [
    {
        path: '',
        component: BloggerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blogger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BloggerDetailComponent,
        resolve: {
            blogger: BloggerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blogger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BloggerUpdateComponent,
        resolve: {
            blogger: BloggerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blogger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BloggerUpdateComponent,
        resolve: {
            blogger: BloggerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blogger.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bloggerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BloggerDeletePopupComponent,
        resolve: {
            blogger: BloggerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blogger.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
