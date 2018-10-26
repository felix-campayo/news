import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { News } from 'src/app/models';
import { Subscription } from 'rxjs';
import { Message } from 'primeng/components/common/api';
import { ArchivesService } from '../../services';
import { MessageUtil } from 'src/app/modules/shared/utils';

@Component({
    selector: 'app-archives-list',
    templateUrl: './archives-list.component.html',
    styleUrls: ['./archives-list.component.scss']
})
export class ArchivesListComponent implements OnInit, OnDestroy {

    public msgs: Message[];
    public archives: News[];
    public readonly ROWS: number[] = [5, 10, 20];
    public filterByDateFormControl: FormControl;
    public isLoading: boolean;
    public readonly TOAST_KEY = 'toast';
    public readonly EMPTY_MESSAGE = 'No records found';
    private readonly SUCCESS_MESSAGE = 'News deleted';
    private readonly ERROR_MESSAGE = 'News was not deleted';
    private subscriptions: Subscription[];

    constructor(private archivesService: ArchivesService, private msgUtil: MessageUtil) {
        this.isLoading = true;
        this.subscriptions = [];
        this.msgs = [];
        this.filterByDateFormControl = new FormControl('');
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.archivesService.getArchives().
            subscribe((data: News[]) => {
                this.isLoading = false;
                this.archives = data;
            }));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((el: Subscription) => el.unsubscribe());
    }

    public delete(item: News): void {
        this.isLoading = true;
        this.subscriptions.push(
            this.archivesService.deleteArchives(item)
                .subscribe(() => this.msgUtil.addSuccessMessage(this.TOAST_KEY, this.SUCCESS_MESSAGE)
                    , () => this.msgUtil.addErrorMessage(this.TOAST_KEY, this.ERROR_MESSAGE)
                    , () => this.isLoading = false)
        );
    }
}
