import { NgModule } from '@angular/core';
import { FilterByDatePipe } from './pipes';
import { MessageUtil } from './utils';
import { MessageService } from 'primeng/components/common/api';

@NgModule({
    declarations: [
        FilterByDatePipe
    ],
    providers: [
        MessageUtil,
        MessageService
    ],
    exports: [
        FilterByDatePipe
    ]
})
export class SharedModule { }
