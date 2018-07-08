import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendConnectService} from "../backend-connect.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
   public chatsArray:any;
   public userEmail;
   public flag:boolean=true;
   constructor(private service: BackendConnectService,private route:Router) {
    this.userEmail=this.service.getLoggedInEmail();
     this.service.sendData();
   }

   ngOnInit() {
    this.service.getChats()
      .subscribe((chats)=>{
        this.chatsArray=chats;
      //for formatting the timestamp
        for(let i of this.chatsArray)
        {
           let temp=i.updatedAt;
           let d =new Date(Date.parse(temp));

          i.updatedAt=d.toLocaleTimeString('en-IN',{hour: '2-digit', minute:'2-digit'})
          +" At "+d.toLocaleDateString('en-IN',{year: 'numeric', month: 'long', day: 'numeric'});

          //console.log(i.updatedAt);
        }
        if(this.chatsArray.length===0)
          this.flag=false;
        else
          this.flag=true;
        // console.log(this.chatsArray)

      })
   }
   //on selecting the particular conversation
   onConversation(selectedChat) {
     this.route.navigate(['messages', selectedChat.id]);
   }


}
