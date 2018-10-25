import { NgModule } from '@angular/core';
import { FilterByDatePipe } from './pipes';

@NgModule({
    declarations: [
        FilterByDatePipe
    ],
    exports: [
        FilterByDatePipe
    ]
})
export class SharedModule { }
