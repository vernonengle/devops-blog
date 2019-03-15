/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { BloggerDetailComponent } from 'app/entities/blogger/blogger-detail.component';
import { Blogger } from 'app/shared/model/blogger.model';

describe('Component Tests', () => {
    describe('Blogger Management Detail Component', () => {
        let comp: BloggerDetailComponent;
        let fixture: ComponentFixture<BloggerDetailComponent>;
        const route = ({ data: of({ blogger: new Blogger(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [BloggerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BloggerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BloggerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.blogger).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
