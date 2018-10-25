import { NgModule } from '@angular/core';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './components';
import { NewsService } from './services';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng.module';

@NgModule({
  declarations: [
    NewsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    NewsRoutingModule,
    SharedModule
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }
