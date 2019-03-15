import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlogger } from 'app/shared/model/blogger.model';

type EntityResponseType = HttpResponse<IBlogger>;
type EntityArrayResponseType = HttpResponse<IBlogger[]>;

@Injectable({ providedIn: 'root' })
export class BloggerService {
    public resourceUrl = SERVER_API_URL + 'api/bloggers';

    constructor(protected http: HttpClient) {}

    create(blogger: IBlogger): Observable<EntityResponseType> {
        return this.http.post<IBlogger>(this.resourceUrl, blogger, { observe: 'response' });
    }

    update(blogger: IBlogger): Observable<EntityResponseType> {
        return this.http.put<IBlogger>(this.resourceUrl, blogger, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBlogger>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBlogger[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
