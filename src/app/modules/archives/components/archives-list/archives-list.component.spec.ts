
import { News } from 'src/app/models';
import { ArchivesService } from '../../services';
import { TestBed, async } from '@angular/core/testing';
import { ArchivesListComponent } from '..';
import { of, throwError } from 'rxjs';
import { PrimeNgModule } from 'src/app/modules/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules';
import { MessageUtil } from 'src/app/modules/shared/utils';

describe('ArchivesListComponent', () => {
    const archives: News[] = [
        new News('1', 'News 1', 'Body News 1', new Date('October 10, 2018 10:00:00'), true),
        new News('2', 'News 2', 'Body News 2', new Date('October 10, 2018 11:00:00'), true),
        new News('3', 'News 3', 'Body News 3', new Date('October 11, 2018 15:00:00'), true)
    ];

    let archivesServiceStub: jasmine.SpyObj<ArchivesService>;
    let messageUtilStub: jasmine.SpyObj<MessageUtil>;
    let component: ArchivesListComponent;

    beforeEach(async(() => {
        const archivesServiceSpy = jasmine.createSpyObj('ArchivesService', ['getArchives', 'deleteArchives']);
        const messageUtilSpy = jasmine.createSpyObj('MessageUtil', ['addSuccessMessage', 'addErrorMessage']);

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
                { provide: ArchivesService, useValue: archivesServiceSpy },
                { provide: MessageUtil, useValue: messageUtilSpy }
            ]
        }).compileComponents();

        archivesServiceStub = TestBed.get(ArchivesService);
        messageUtilStub = TestBed.get(MessageUtil);
    }));

    it('should successfully delete one archives', () => {
        archivesServiceStub.deleteArchives.and.returnValue(of({}));
        const fixture = TestBed.createComponent(ArchivesListComponent);
        component = fixture.componentInstance;
        component.delete(archives[0]);
        expect(messageUtilStub.addSuccessMessage).toHaveBeenCalled();
    });

    it('should show error message when deleting', () => {
        archivesServiceStub.deleteArchives.and.returnValue(throwError({}));
        const fixture = TestBed.createComponent(ArchivesListComponent);
        component = fixture.componentInstance;
        component.delete(archives[0]);
        expect(messageUtilStub.addErrorMessage).toHaveBeenCalled();
    });

    it('should load all archives on start', () => {
        archivesServiceStub.getArchives.and.returnValue(of(archives));
        const fixture = TestBed.createComponent(ArchivesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.archives).toEqual(archives);
        });
    });
});
