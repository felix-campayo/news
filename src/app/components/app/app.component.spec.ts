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
import { of } from 'rxjs';
import { ArchivesService } from 'src/app/modules/archives/services';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let loader: SpyNgModuleFactoryLoader;

  const news = [
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

  const data = of(news);

  const collectionStub = {
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  const newsServiceStub = {
    getNews: jasmine.createSpy('getNews').and.returnValue(of(news))
  };

  const archivesServiceStub = {
    getArchives: jasmine.createSpy('getArchives').and.returnValue(of(news))
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
        { provide: ArchivesService, useValue: archivesServiceStub },
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
