import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'blogger',
                loadChildren: './blogger/blogger.module#BlogBloggerModule'
            },
            {
                path: 'blog',
                loadChildren: './blog/blog.module#BlogBlogModule'
            },
            {
                path: 'comment',
                loadChildren: './comment/comment.module#BlogCommentModule'
            },
            {
                path: 'blogger',
                loadChildren: './blogger/blogger.module#BlogBloggerModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}
