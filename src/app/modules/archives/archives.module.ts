import { NgModule } from '@angular/core';
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesListComponent } from './components';
import { ArchivesService } from './services';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ArchivesListComponent
  ],
  imports: [
    ArchivesRoutingModule,
    SharedModule
  ],
  providers: [
    ArchivesService
  ]
})
export class ArchivesModule { }
