
import { News } from 'src/app/models';
import { NewsService } from '../../services';
import { TestBed, async } from '@angular/core/testing';
import { NewsListComponent } from '..';
import { of, throwError } from 'rxjs';
import { PrimeNgModule } from 'src/app/modules/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules';

describe('NewsListComponent', () => {
    const news: News[] = [
        new News('1', 'News 1', 'Body News 1', new Date('October 10, 2018 10:00:00'), false),
        new News('2', 'News 2', 'Body News 2', new Date('October 10, 2018 11:00:00'), false),
        new News('3', 'News 3', 'Body News 3', new Date('October 11, 2018 15:00:00'), false)
    ];

    let newsServiceSpy: jasmine.SpyObj<NewsService>;
    let component: NewsListComponent;

    beforeEach(async(() => {
        const spy = jasmine.createSpyObj('NewsService', ['getNews', 'archiveNews']);

        TestBed.configureTestingModule({
            imports: [
                PrimeNgModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule
            ],
            declarations: [
                NewsListComponent
            ],
            providers: [
                { provide: NewsService, useValue: spy }
            ]
        }).compileComponents();

        newsServiceSpy = TestBed.get(NewsService);
    }));

    it('should successfully archive one news', () => {
        newsServiceSpy.archiveNews.and.returnValue(of({}));
        const fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        component.archive(news[0]);
        const auxMsgs = [{
            severity: component.msgs[0].severity,
            summary: component.msgs[0].summary
        }];
        expect(auxMsgs).toEqual([{ severity: 'success', summary: 'Success Message' }]);
    });

    it('should show error message when archiving', () => {
        newsServiceSpy.archiveNews.and.returnValue(throwError({}));
        const fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        component.archive(news[0]);
        const auxMsgs = [{
            severity: component.msgs[0].severity,
            summary: component.msgs[0].summary
        }];
        expect(auxMsgs).toEqual([{ severity: 'error', summary: 'Error Message' }]);
    });

    it('should load all news on start', () => {
        newsServiceSpy.getNews.and.returnValue(of(news));
        const fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.news).toEqual(news);
        });
    });
});
