import { NgModule } from '@angular/core';
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesListComponent } from './components';

@NgModule({
  declarations: [
    ArchivesListComponent
  ],
  imports: [
    ArchivesRoutingModule,
  ]
})
export class ArchivesModule { }
