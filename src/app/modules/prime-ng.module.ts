import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    exports: [
        TableModule,
        InputTextModule,
        TabMenuModule,
        ButtonModule,
        MessagesModule,
        ProgressSpinnerModule
    ]
})
export class PrimeNgModule { }