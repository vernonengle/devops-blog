import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlogger } from 'app/shared/model/blogger.model';
import { BloggerService } from './blogger.service';

@Component({
    selector: 'jhi-blogger-delete-dialog',
    templateUrl: './blogger-delete-dialog.component.html'
})
export class BloggerDeleteDialogComponent {
    blogger: IBlogger;

    constructor(protected bloggerService: BloggerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bloggerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bloggerListModification',
                content: 'Deleted an blogger'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-blogger-delete-popup',
    template: ''
})
export class BloggerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blogger }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BloggerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.blogger = blogger;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/blogger', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/blogger', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
