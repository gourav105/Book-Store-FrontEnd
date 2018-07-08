import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendConnectService} from "../backend-connect.service";
import {User} from "../User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public email:string;
  public firstname:string;
  public lastname:string;
  public college:string;
  public address:string;
  public city:string;
  public state:string;
  public phno:string;
  public password:string;

  public flag1 =false;
  //flag variable for showing the message when email is not valid
  public flag2=false;
  //for mobile no
  public flag3=false;
  //for password
  public flag4=false;
  constructor(private service:BackendConnectService,private route:Router) {

  }

  ngOnInit() {
  }
  onSubmit()
  {
    //console.log("In Onsubmit of signup")
    let newuser:User=new User(this.email,this.firstname,this.lastname,this.college,this.address,this.city,this.state,this.phno,this.password);
    this.service.createUser(newuser)
      .subscribe(data=>
      {
        //console.log(data);
        if(JSON.stringify(data)=='{}')
          this.flag1=true;
        else {
          this.service.setLoggedInEmail(newuser.email);
          this.service.sendData();
          this.route.navigate(['listings']);
        }
      })
  }
  //email regular expression
  onEmailBlur()
  {
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(pattern.test(this.email))
      this.flag2=false;
    else
      this.flag2=true;
  }
  //mobile no. regular expression
  onMobileBlur()
  {
   let pattern="[1-9]{1}[0-9]{9}";
   if(this.phno.match(pattern))
     this.flag3=false;
   else
     this.flag3=true;
  }
  //password
  onPasswordBlur()
  {
   let pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if(this.password.match(pattern))
      this.flag4=false;
   else
     this.flag4=true;
  }
}
