import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { News } from 'src/app/models';
import { NewsService } from '../../services/news.service';
import { Subscription } from 'rxjs';
import { MessageUtil } from 'src/app/modules/shared/utils';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {

    public news: News[];
    public readonly ROWS: number[] = [5, 10, 20];
    public filterByDateFormControl: FormControl;
    public isLoading: boolean;
    public readonly TOAST_KEY = 'toast';
    public readonly EMPTY_MESSAGE = 'No records found';
    private readonly SUCCESS_MESSAGE = 'News archived';
    private readonly ERROR_MESSAGE = 'News was not archived';
    private subscriptions: Subscription[];

    constructor(private msgUtil: MessageUtil, private newsService: NewsService) {
        this.isLoading = true;
        this.subscriptions = [];
        this.filterByDateFormControl = new FormControl('');
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.newsService.getNews().
            subscribe((data: News[]) => {
                this.isLoading = false;
                this.news = data;
            }));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((el: Subscription) => el.unsubscribe());
    }

    public archive(item: News): void {
        this.isLoading = true;
        this.subscriptions.push(
            this.newsService.archiveNews(item)
                .subscribe(() => this.msgUtil.addSuccessMessage(this.TOAST_KEY, this.SUCCESS_MESSAGE)
                    , () => this.msgUtil.addErrorMessage(this.TOAST_KEY, this.ERROR_MESSAGE)
                    , () => this.isLoading = false)
        );
    }
}
