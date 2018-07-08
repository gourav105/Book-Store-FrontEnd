import { Component, OnInit } from '@angular/core';
import {BackendConnectService} from "../backend-connect.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-myadvertisements',
  templateUrl: './myadvertisements.component.html',
  styleUrls: ['./myadvertisements.component.css']
})
export class MyadvertisementsComponent implements OnInit {

  public addsArray:any;
  public flag:boolean=true;

  constructor(private service:BackendConnectService,private route:Router) {
    this.service.sendData();
  }

  ngOnInit() {
    this.service.getPostedByMe()
      .subscribe(data=>{
        this.addsArray=data;
        for(let i of this.addsArray)
        {   let temp=new Date(Date.parse(i.createdAt));
          i.createdAt=temp.toLocaleDateString('en-IN',{year: 'numeric', month: 'long', day: 'numeric'})
        }
        if(this.addsArray.length===0)
          this.flag=false;
        else
          this.flag = true;

      })
  }
  onRemoveAdd(id)
  {
    this.service.removeAdd(id)
      .subscribe(data=>{
        for(let ind in this.addsArray)
        {
          if(this.addsArray[ind].bookid===id)
            this.addsArray.splice(ind,1);
        }
        if(this.addsArray.length===0)
          this.flag=false;
      })
  }
}
