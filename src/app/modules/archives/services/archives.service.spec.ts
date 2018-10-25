
import { News } from 'src/app/models';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { ArchivesService } from '.';

describe('ArchivesService', () => {
    const archives = [
        {
            payload: {
                doc: {
                    data: () => {
                        return {
                            title: 'News 1',
                            body: 'Body News 1',
                            date: 1541203200,
                            archived: true
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
                            archived: true
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
                            archived: true
                        };
                    },
                    id: '3'
                }
            }
        }
    ];

    const collectionStub = {
        snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of(archives))
    };

    const angularFiresotreStub = {
        collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };

    let archivesService: ArchivesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ArchivesService,
                { provide: AngularFirestore, useValue: angularFiresotreStub }
            ]
        });
        archivesService = TestBed.get(ArchivesService);
    });

    it('should successfully get Archives', () => {
        archivesService.getArchives().subscribe((data: News[]) => {
            expect(data[0].date instanceof Date).toEqual(true);
            expect(data.length).toEqual(3);
        });
    });
});
