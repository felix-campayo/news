import { NgModule } from '@angular/core';
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesListComponent } from './components';
import { ArchivesService } from './services';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ArchivesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    ArchivesRoutingModule,
    SharedModule
  ],
  providers: [
    ArchivesService
  ]
})
export class ArchivesModule { }
