/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { BloggerComponent } from 'app/entities/blogger/blogger.component';
import { BloggerService } from 'app/entities/blogger/blogger.service';
import { Blogger } from 'app/shared/model/blogger.model';

describe('Component Tests', () => {
    describe('Blogger Management Component', () => {
        let comp: BloggerComponent;
        let fixture: ComponentFixture<BloggerComponent>;
        let service: BloggerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [BloggerComponent],
                providers: []
            })
                .overrideTemplate(BloggerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BloggerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloggerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Blogger(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bloggers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
