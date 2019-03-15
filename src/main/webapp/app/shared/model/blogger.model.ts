import { IUser } from 'app/core/user/user.model';
import { IBlog } from 'app/shared/model/blog.model';
import { IComment } from 'app/shared/model/comment.model';

export interface IBlogger {
    id?: number;
    username?: string;
    email?: string;
    user?: IUser;
    blogs?: IBlog[];
    comments?: IComment[];
}

export class Blogger implements IBlogger {
    constructor(
        public id?: number,
        public username?: string,
        public email?: string,
        public user?: IUser,
        public blogs?: IBlog[],
        public comments?: IComment[]
    ) {}
}
