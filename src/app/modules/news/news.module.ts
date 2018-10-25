import { NgModule } from '@angular/core';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './components';

@NgModule({
  declarations: [
    NewsListComponent
  ],
  imports: [
    NewsRoutingModule,
  ]
})
export class NewsModule { }
