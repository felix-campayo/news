import { ArchivesModule } from './../../modules/archives/archives.module';
import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from '..';
import { ROUTES } from 'src/app/modules/app-routing.module';
import { NewsModule } from 'src/app/modules/news/news.module';
import { NgModuleFactoryLoader, NgZone } from '@angular/core';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let loader: SpyNgModuleFactoryLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(ROUTES),
        NewsModule,
        ArchivesModule
      ],
      declarations: [
        AppComponent
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

    router.navigate(['/archives']);
    tick();
    expect(location.path()).toBe('/archives');
  }));
});
