import { NgModule } from '@angular/core';
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesListComponent } from './components';
import { ArchivesService } from './services';

@NgModule({
  declarations: [
    ArchivesListComponent
  ],
  imports: [
    ArchivesRoutingModule,
  ],
  providers: [
    ArchivesService
  ]
})
export class ArchivesModule { }
