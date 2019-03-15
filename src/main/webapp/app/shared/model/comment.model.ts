import { IBlog } from 'app/shared/model/blog.model';
import { IBlogger } from 'app/shared/model/blogger.model';

export interface IComment {
    id?: number;
    content?: any;
    blog?: IBlog;
    blogger?: IBlogger;
}

export class Comment implements IComment {
    constructor(public id?: number, public content?: any, public blog?: IBlog, public blogger?: IBlogger) {}
}
