
import { News } from 'src/app/models';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { NewsService } from '.';

describe('NewsService', () => {
    const news = [
        {
            payload: {
                doc: {
                    data: () => {
                        return {
                            title: 'News 1',
                            body: 'Body News 1',
                            date: 1541203200,
                            archived: false
                        };
                    },
                    id: '1'
                }
            }
        },
        {
            payload: {
                doc: {
                    data: () => {
                        return {
                            title: 'News 2',
                            body: 'Body News 2',
                            date: 1541808000,
                            archived: false
                        };
                    },
                    id: '2'
                }
            }
        },
        {
            payload: {
                doc: {
                    data: () => {
                        return {
                            title: 'News 3',
                            body: 'Body News 3',
                            date: 1542672000,
                            archived: false
                        };
                    },
                    id: '3'
                }
            }
        }
    ];

    const collectionStub = {
        snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of(news))
    };

    const angularFiresotreStub = {
        collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };

    let newsService: NewsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NewsService,
                { provide: AngularFirestore, useValue: angularFiresotreStub }
            ]
        });
        newsService = TestBed.get(NewsService);
    });

    it('should successfully get News', () => {
        newsService.getNews().subscribe((data: News[]) => {
            expect(data[0].date instanceof Date).toEqual(true);
            expect(data.length).toEqual(3);
        });
    });
});
