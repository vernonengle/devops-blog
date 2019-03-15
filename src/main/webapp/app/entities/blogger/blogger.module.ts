import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BlogSharedModule } from 'app/shared';
import {
    BloggerComponent,
    BloggerDetailComponent,
    BloggerUpdateComponent,
    BloggerDeletePopupComponent,
    BloggerDeleteDialogComponent,
    bloggerRoute,
    bloggerPopupRoute
} from './';

const ENTITY_STATES = [...bloggerRoute, ...bloggerPopupRoute];

@NgModule({
    imports: [BlogSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BloggerComponent,
        BloggerDetailComponent,
        BloggerUpdateComponent,
        BloggerDeleteDialogComponent,
        BloggerDeletePopupComponent
    ],
    entryComponents: [BloggerComponent, BloggerUpdateComponent, BloggerDeleteDialogComponent, BloggerDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogBloggerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
