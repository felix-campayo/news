import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
    exports: [
        TableModule,
        InputTextModule,
        TabMenuModule,
        ButtonModule,
        ProgressSpinnerModule,
        ToastModule
    ]
})
export class PrimeNgModule { }
