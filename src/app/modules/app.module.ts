import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { PrimeNgModule } from './prime-ng.module';
import { CONFIG } from '../config';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    AngularFireModule.initializeApp(CONFIG.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
