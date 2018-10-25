import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { News } from 'src/app/models';
import { CONFIG } from 'src/app/config';
import { INews } from 'src/app/interfaces';

@Injectable()
export class NewsService {

    private newsCollectionRef: AngularFirestoreCollection<any>;
    private news$: Observable<INews[]>;
    private readonly TIMESTAMP_FORMAT = 'X';

    constructor(private afs: AngularFirestore) {
        this.newsCollectionRef = this.afs.collection(CONFIG.firebaseConfig.collection, ref => ref.where('archived', '==', false));
        this.news$ = this.newsCollectionRef.snapshotChanges().pipe(map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as INews;
                const id = action.payload.doc.id;
                return { id, ...data };
            });
        }));
    }

    public getNews(): Observable<News[]> {
        return this.news$.pipe(map((data: INews[]) =>
            data.map(((el: INews) => new News(el.id, el.title, el.body, moment(el.date, this.TIMESTAMP_FORMAT).toDate(), el.archived)))));
    }

    public archiveNews(item: News): Observable<any> {
        return from((this.newsCollectionRef.doc(item.id).update({ archived: true })));
    }
}
