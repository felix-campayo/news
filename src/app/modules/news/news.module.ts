import { NgModule } from '@angular/core';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './components';
import { NewsService } from './services';

@NgModule({
  declarations: [
    NewsListComponent
  ],
  imports: [
    NewsRoutingModule,
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }
