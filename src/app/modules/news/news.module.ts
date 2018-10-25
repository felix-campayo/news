import { NgModule } from '@angular/core';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './components';
import { NewsService } from './services';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NewsListComponent
  ],
  imports: [
    NewsRoutingModule,
    SharedModule
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }
