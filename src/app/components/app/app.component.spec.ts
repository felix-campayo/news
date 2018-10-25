import { AngularFirestore } from 'angularfire2/firestore';
import { ArchivesModule } from './../../modules/archives/archives.module';
import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from '..';
import { PrimeNgModule } from 'src/app/modules/prime-ng.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ROUTES } from 'src/app/modules/app-routing.module';
import { NewsModule } from 'src/app/modules/news/news.module';
import { NgModuleFactoryLoader, NgZone } from '@angular/core';
import { NewsService } from 'src/app/modules/news/services';
import { News } from 'src/app/models';
import { from, of } from 'rxjs';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let loader: SpyNgModuleFactoryLoader;

  const news: News[] = [
    new News('1', 'News 1', 'Body News 1', new Date('October 10, 2018 10:00:00'), false),
    new News('2', 'News 2', 'Body News 2', new Date('October 10, 2018 11:00:00'), false),
    new News('3', 'News 3', 'Body News 3', new Date('October 11, 2018 15:00:00'), false)
  ];

  const data = from(news);

  const collectionStub = {
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  const newsServiceStub = {
    getNews: jasmine.createSpy('getNews').and.returnValue(of(news))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PrimeNgModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(ROUTES),
        NewsModule,
        ArchivesModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: NewsService, useValue: newsServiceStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
    fixture.detectChanges();
    loader = TestBed.get(NgModuleFactoryLoader);
  });

  it('navigate to "news" redirects you to /news', fakeAsync(() => {
    loader.stubbedModules = { lazyModule: NewsModule };
    router.resetConfig([
      { path: 'news', loadChildren: 'lazyModule' },
    ]);

    router.navigate(['/news']);
    tick();
    expect(location.path()).toBe('/news');
  }));

  it('navigate to "archives" takes you to /archives', fakeAsync(() => {
    loader.stubbedModules = { lazyModule: ArchivesModule };
    router.resetConfig([
      { path: 'archives', loadChildren: 'lazyModule' },
    ]);

    router.navigateByUrl('/archives');
    tick();
    expect(location.path()).toBe('/archives');
  }));
});
