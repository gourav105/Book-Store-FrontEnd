import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {BackendConnectService} from "../backend-connect.service";

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.component.html',
  styleUrls: ['./singlechat.component.css']
})
export class SinglechatComponent implements OnInit {


  public messagesArray;
  public chatId:number;
  public msg:string="";
  public flag:boolean=false;
  public otherPersonName:string;
  constructor(private router: ActivatedRoute,private service: BackendConnectService) {
    this.service.sendData();
  }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.chatId = +(params.get('id'));
      //console.log(this.id);
      this.service.getMessages(this.chatId)
        .subscribe((response) => {
        this.otherPersonName=response['otherPerson'];
        this.messagesArray = response['msgdata'];
        //for formatting date and time
        for(let i of this.messagesArray)
          {
            let temp=i.createdAt;
            let d =new Date(Date.parse(temp));
            i.createdAt=d.toLocaleTimeString('en-IN',{hour: '2-digit', minute:'2-digit'})
              +" At "+d.toLocaleDateString('en-IN',{year: 'numeric', month: 'long', day: 'numeric'});
          }
          this.flag=true;
      })

    })
  }
    onSend()
    {

      this.service.sendMessageFromChat(this.chatId,this.msg)
        .subscribe(data=>{
          let temp=data['createdAt'];
          let d =new Date(Date.parse(temp));
          data['createdAt']=d.toLocaleTimeString('en-IN',{hour: '2-digit', minute:'2-digit'})
            +" At "+d.toLocaleDateString('en-IN',{year: 'numeric', month: 'long', day: 'numeric'});
          //new send message is also pushed to array
          this.messagesArray.push(data);
          this.msg="";

        })
    }
    onNewMessage()
    {

      this.service.getMessages(this.chatId)
        .subscribe((response) => {
          this.otherPersonName=response['otherPerson'];
          this.messagesArray=[];
          this.messagesArray = response['msgdata'];
          for(let i of this.messagesArray)
          {
            let temp=i.createdAt;
            let d =new Date(Date.parse(temp));
            i.createdAt=d.toLocaleTimeString('en-IN',{hour: '2-digit', minute:'2-digit'})
              +" At "+d.toLocaleDateString('en-IN',{year: 'numeric', month: 'long', day: 'numeric'});
          }
          this.flag=true;
        })
    }

}
