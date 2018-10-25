import { NgModule } from '@angular/core';
import { FilterByDatePipe } from './pipes';
import { MessageUtil } from './utils';

@NgModule({
    declarations: [
        FilterByDatePipe
    ],
    providers: [
        MessageUtil
    ],
    exports: [
        FilterByDatePipe
    ]
})
export class SharedModule { }
