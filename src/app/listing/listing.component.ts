import { Component, OnInit } from '@angular/core';
import {BackendConnectService} from "../backend-connect.service";

import {BookConditions} from "../BookConditions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  //array which is responsible for trigger the gui update cycle
  public listingArray:any;
  public duplicateArray:any;

  //true each flag when four checkbox is checked
  public newtoggle: boolean = false;
  public almostnewtoggle: boolean = false;
  public slightlydamagetoggle: boolean = false;
  public worntoggle: boolean = false;

  //for storing the minimum and maximum price ranges
  public minprice:string;
  public maxprice:string;


//for search keyword
  public searchkeyword: string = "";


  public pricefiltertoggle:boolean=false;
  public searchtoggle:boolean=false;

 //return msg when user clicks on add to wishlist button
  public msg="";
  public flag:boolean=false;
  constructor(private service: BackendConnectService,private route:Router) {
    this.service.sendData();
  }

  ngOnInit() {

    this.service.getListings()
      .subscribe(data => {

        // console.log(typeof data);
        this.listingArray = data;
        this.duplicateArray = this.listingArray;
        // console.log(this.listingArray);
      })
  }

  //after check of every box onFilter method is run which filters the listings
  onNewFilter()
  {

    this.newtoggle=!this.newtoggle;
    this.onFilter();
  }
  onAlmostNewFilter()
  {
  this.almostnewtoggle=!this.almostnewtoggle;
  this.onFilter();
  }
  onSlightlyDamageFilter()
  {
    this.slightlydamagetoggle=!this.slightlydamagetoggle;
    this.onFilter();
  }
  onWornFilter()
  {
    this.worntoggle=!this.worntoggle;
    this.onFilter();
  }


  onRangeSelected() {
    this.pricefiltertoggle=true;
    this.onFilter();
  }

  onSearch() {
    this.searchtoggle=true;
    this.onFilter();
  }
  onKey(event) {
  //search is applied when enter key is pressed
    if(event.keyCode==13)
    {
      this.searchtoggle=true;
      this.onFilter();
    }
    if(this.searchkeyword.length==0)
    {
      this.searchtoggle=false;
      this.onFilter();
    }
  }
//this method is responsible
  onFilter() {


    let filterA: any=this.duplicateArray;

    if (this.pricefiltertoggle) {
      filterA = filterA.filter(arr => {
        if ((+arr.price) >= +this.minprice && (+arr.price) <= +this.maxprice)
          return true;
      })
    }
    if (this.newtoggle || this.almostnewtoggle || this.slightlydamagetoggle || this.worntoggle) {
      filterA = filterA.filter(arr => {
        // console.log(arr);
        if (this.newtoggle && arr.condition === BookConditions.New)
          return true;
        if (this.almostnewtoggle && arr.condition === BookConditions.AlmostNew)
          return true;
        if (this.slightlydamagetoggle && arr.condition === BookConditions.SlightlyDamage)
          return true;
        if (this.worntoggle && arr.condition === BookConditions.Worn)
          return true;
      })
    }
    if (this.searchtoggle) {
      if (this.searchkeyword.length !== 0) {
        filterA = filterA.filter(arr => {
          if (arr.bookName.toLowerCase().indexOf(this.searchkeyword.toLowerCase()) >= 0 || (arr.authorName.toLowerCase().indexOf(this.searchkeyword.toLowerCase())) >= 0) {
            // console.log("In IF");
            return true;
          }
        });
      }
    }
    this.listingArray=filterA;
  }
//after removing the price filter
  onRemoveFilter() {
    this.pricefiltertoggle=false;
    this.minprice="";
    this.maxprice="";
    this.onFilter();
  }


//on clicking on the single listing
  onSingleBook(id,e)
  {

     this.route.navigate(['listings', id]);
  }
  onAdding(id,e)
  {

    this.service.addToWishlist(id)
      .subscribe(data=>{
        if(JSON.stringify(data)==='{}')
          this.msg="Already In Wishlist"
        else
          this.msg="Successfully Added"
        this.flag=true;
        setTimeout(()=>this.flag=false,1500);
      })

  }
}
