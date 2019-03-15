import { Moment } from 'moment';
import { IComment } from 'app/shared/model/comment.model';
import { IBlogger } from 'app/shared/model/blogger.model';

export interface IBlog {
    id?: number;
    content?: any;
    datePosted?: Moment;
    comments?: IComment[];
    blogger?: IBlogger;
}

export class Blog implements IBlog {
    constructor(
        public id?: number,
        public content?: any,
        public datePosted?: Moment,
        public comments?: IComment[],
        public blogger?: IBlogger
    ) {}
}
