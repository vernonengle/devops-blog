/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { BloggerUpdateComponent } from 'app/entities/blogger/blogger-update.component';
import { BloggerService } from 'app/entities/blogger/blogger.service';
import { Blogger } from 'app/shared/model/blogger.model';

describe('Component Tests', () => {
    describe('Blogger Management Update Component', () => {
        let comp: BloggerUpdateComponent;
        let fixture: ComponentFixture<BloggerUpdateComponent>;
        let service: BloggerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [BloggerUpdateComponent]
            })
                .overrideTemplate(BloggerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BloggerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloggerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Blogger(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.blogger = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Blogger();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.blogger = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
