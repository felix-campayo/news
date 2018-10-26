
import { News } from 'src/app/models';
import { NewsService } from '../../services';
import { TestBed, async } from '@angular/core/testing';
import { NewsListComponent } from '..';
import { of, throwError } from 'rxjs';
import { PrimeNgModule } from 'src/app/modules/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules';
import { MessageUtil } from 'src/app/modules/shared/utils';

describe('NewsListComponent', () => {
    const news: News[] = [
        new News('1', 'News 1', 'Body News 1', new Date('October 10, 2018 10:00:00'), false),
        new News('2', 'News 2', 'Body News 2', new Date('October 10, 2018 11:00:00'), false),
        new News('3', 'News 3', 'Body News 3', new Date('October 11, 2018 15:00:00'), false)
    ];

    let newsServiceStub: jasmine.SpyObj<NewsService>;
    let messageUtilStub: jasmine.SpyObj<MessageUtil>;
    let component: NewsListComponent;

    beforeEach(async(() => {
        const newsServiceSpy = jasmine.createSpyObj('NewsService', ['getNews', 'archiveNews']);
        const messageUtilSpy = jasmine.createSpyObj('MessageUtil', ['addSuccessMessage', 'addErrorMessage']);

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
                { provide: NewsService, useValue: newsServiceSpy },
                { provide: MessageUtil, useValue: messageUtilSpy }
            ]
        }).compileComponents();

        newsServiceStub = TestBed.get(NewsService);
        messageUtilStub = TestBed.get(MessageUtil);
    }));

    it('should successfully archive one news', () => {
        newsServiceStub.archiveNews.and.returnValue(of({}));
        const fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        component.archive(news[0]);
        expect(messageUtilStub.addSuccessMessage).toHaveBeenCalled();
    });

    it('should show error message when archiving', () => {
        newsServiceStub.archiveNews.and.returnValue(throwError({}));
        const fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        component.archive(news[0]);
        expect(messageUtilStub.addErrorMessage).toHaveBeenCalled();
    });

    it('should load all news on start', () => {
        newsServiceStub.getNews.and.returnValue(of(news));
        const fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.news).toEqual(news);
        });
    });
});
