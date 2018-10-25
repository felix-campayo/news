
import { News } from 'src/app/models';
import { ArchivesService } from '../../services';
import { TestBed, async } from '@angular/core/testing';
import { ArchivesListComponent } from '..';
import { of, throwError } from 'rxjs';
import { PrimeNgModule } from 'src/app/modules/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules';

describe('ArchivesListComponent', () => {
    const archives: News[] = [
        new News('1', 'News 1', 'Body News 1', new Date('October 10, 2018 10:00:00'), true),
        new News('2', 'News 2', 'Body News 2', new Date('October 10, 2018 11:00:00'), true),
        new News('3', 'News 3', 'Body News 3', new Date('October 11, 2018 15:00:00'), true)
    ];

    let archivesServiceSpy: jasmine.SpyObj<ArchivesService>;
    let component: ArchivesListComponent;

    beforeEach(async(() => {
        const spy = jasmine.createSpyObj('ArchivesService', ['getArchives', 'deleteArchives']);

        TestBed.configureTestingModule({
            imports: [
                PrimeNgModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule
            ],
            declarations: [
                ArchivesListComponent
            ],
            providers: [
                { provide: ArchivesService, useValue: spy }
            ]
        }).compileComponents();

        archivesServiceSpy = TestBed.get(ArchivesService);
    }));

    it('should successfully delete one archives', () => {
        archivesServiceSpy.deleteArchives.and.returnValue(of({}));
        const fixture = TestBed.createComponent(ArchivesListComponent);
        component = fixture.componentInstance;
        component.delete(archives[0]);
        const auxMsgs = [{
            severity: component.msgs[0].severity,
            summary: component.msgs[0].summary
        }];
        expect(auxMsgs).toEqual([{ severity: 'success', summary: 'Success Message' }]);
    });

    it('should show error message when deleting', () => {
        archivesServiceSpy.deleteArchives.and.returnValue(throwError({}));
        const fixture = TestBed.createComponent(ArchivesListComponent);
        component = fixture.componentInstance;
        component.delete(archives[0]);
        const auxMsgs = [{
            severity: component.msgs[0].severity,
            summary: component.msgs[0].summary
        }];
        expect(auxMsgs).toEqual([{ severity: 'error', summary: 'Error Message' }]);
    });

    it('should load all archives on start', () => {
        archivesServiceSpy.getArchives.and.returnValue(of(archives));
        const fixture = TestBed.createComponent(ArchivesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.archives).toEqual(archives);
        });
    });
});
