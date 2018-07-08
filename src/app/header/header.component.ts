import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendConnectService} from "../backend-connect.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public selectedTab=0;
  public username:string=null;
  subscription: Subscription;
  constructor(private route:Router,private service:BackendConnectService) {
    this.subscription = this.service.getData().subscribe(x => {
      this.username = x;
    });

  }

  ngOnInit() {

  }
 selectListings()
 {
   this.selectedTab=0;
   this.route.navigate(['listings']);
 }
 selectAddBooks()
 {
   this.selectedTab=1;
   this.route.navigate(['addbook']);
 }
 selectWishlist()
 {
   this.selectedTab=2;
   this.route.navigate(['wishlist']);
 }
 selectMessages()
 {
   this.selectedTab=3;
   this.route.navigate(['messages']);
 }
 selectMyAdds()
 {
   this.selectedTab=4;
   this.route.navigate(['myadds'])
 }
 logout()
 {
   this.service.removeEmail();
   this.service.sendData();
   this.route.navigate(['login']);
 }

}
