import { Component, OnInit } from '@angular/core';
import {BackendConnectService} from "../backend-connect.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-displaywishlist',
  templateUrl: './displaywishlist.component.html',
  styleUrls: ['./displaywishlist.component.css']
})
export class DisplaywishlistComponent implements OnInit {

  //array for storing info of wishlist
  public wishListArray:any;
  public flag:boolean=false;
  //calculating the total price of wishlist
  public price:number=0;

  constructor(private service:BackendConnectService) {
    this.service.sendData();
  }

  ngOnInit() {
    this.service.getWishlist()
      .subscribe(data=>{
         this.wishListArray=data;
         if(this.wishListArray.length===0)
           this.flag=false;
         else
         {
           //formatting the date and time after receiving the data
           for(let i of this.wishListArray)
           {
             let temp=new Date(Date.parse(i.createdAt));

             i.createdAt=temp.toLocaleDateString('en-IN',{year: 'numeric', month: 'long', day: 'numeric'})
             this.price=this.price+(+i.listing.price);
           }
           this.flag=true;
         }
      });


  }
  //remove from wishlist
  onRemove(id)
  {
    this.service.removeWishlist(id)
      .subscribe(data=>{
        //also remove from array for trigger the refresh cycle
        for(let i in this.wishListArray)
        {
          if(this.wishListArray[i].id===id)
          {
            this.price=this.price-(+this.wishListArray[i].listing.price);
            this.wishListArray.splice(i,1);
          }
        }
        if(this.wishListArray.length===0)
          this.flag=false;

      })
  }
}
