import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Books} from "../Books";
import {BackendConnectService} from "../backend-connect.service";
import {User} from "../User";

@Component({
  selector: 'app-singlebook',
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {
  public singlebook:any={};
  public msg:string='';
  public id:number;
  public name:string;
  public address:string;
  public college:string;
  public date;
  public sellerEmail:string;
  public returnmsg="";
  public flag:boolean=false;
  constructor(private router: ActivatedRoute,private service: BackendConnectService,private route:Router) {
    this.service.sendData();
  }

  ngOnInit() {
   //get id from the router
    this.router.paramMap.subscribe((params: ParamMap) => {
      let id = +(params.get('id'));

      //console.log(this.id);
      this.service.getSingleListing(id)
        .subscribe(res => {
          this.singlebook = res
          let temp=new Date(Date.parse(this.singlebook.createdAt));
          this.date="Ad Posted on "+temp.toLocaleDateString('en-IN',{year: 'numeric', month: 'long', day: 'numeric'})

          //console.log(temp);

          this.sellerEmail = this.singlebook.userEmail;
          this.service.getInfo(this.sellerEmail)
            .subscribe((sellerdata) => {
              this.name = sellerdata['firstName'] + " " + sellerdata['lastName'];
              this.address=sellerdata['city']+", "+ sellerdata['state'];
              this.college=sellerdata['college'];
            })

        })
    })

  }
  onAdding(id)
  {
    this.service.addToWishlist(id)
      .subscribe(data=>{
        if(JSON.stringify(data)==='{}')
          this.returnmsg="Already In Wishlist"
        else
          this.returnmsg="Successfully Added"
        this.flag=true;
        setTimeout(()=>this.flag=false,1500);

      })
  }
  onSendMessage(id,sellerEmail)
  {
    this.service.sendMessage(id,sellerEmail,this.msg,this.name)
      .subscribe(response=>{
         this.route.navigate(['messages'])
      })

  }

}
