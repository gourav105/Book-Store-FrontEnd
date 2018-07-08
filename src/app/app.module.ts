import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {BackendConnectService} from "./backend-connect.service";



import { SignupComponent } from './signup/signup.component';
import { ListingComponent } from './listing/listing.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { DisplaywishlistComponent } from './displaywishlist/displaywishlist.component';
import { MyadvertisementsComponent } from './myadvertisements/myadvertisements.component';
import { MessagesComponent } from './messages/messages.component';
import { SinglechatComponent } from './singlechat/singlechat.component';
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'listings',
    component: ListingComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'listings/:id',
    component:SinglebookComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'addbook',
    component:AddBooksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'wishlist',
    component:DisplaywishlistComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'myadds',
    component:MyadvertisementsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'messages',
    component:MessagesComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'messages/:id',
    component:SinglechatComponent,
    canActivate:[AuthGuard]
  }




];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ListingComponent,
    AddBooksComponent,
    SinglebookComponent,
    DisplaywishlistComponent,
    MyadvertisementsComponent,
    MessagesComponent,
    SinglechatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{ useHash: true }), //useHash set to true because app crashes when reload the browser
    FormsModule,
    HttpClientModule,
    NgProgressModule.forRoot(),     //Module for progress bar
    NgProgressHttpModule,
    AngularFireModule.initializeApp({      //firebase module for uploading photos
      apiKey: "AIzaSyB5X_9CNrVeYNFQcXyyToHP274hEMrjwLQ",
  authDomain: "book-store-photos.firebaseapp.com",
  databaseURL: "https://book-store-photos.firebaseio.com",
  projectId: "book-store-photos",
  storageBucket: "book-store-photos.appspot.com",
  messagingSenderId: "313120473248"}),
 AngularFireStorageModule
  ],
  providers: [BackendConnectService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
