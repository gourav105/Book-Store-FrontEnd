import {Component, OnInit} from '@angular/core';
import {BackendConnectService} from "../backend-connect.service";
import {Router} from "@angular/router";
import {NgProgress} from "@ngx-progressbar/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string;
  public password:string;
  public flag=false;

    constructor(private service:BackendConnectService,private route:Router) {

  }

  ngOnInit() {

  }
  onSubmit() {

    console.log("In On Submitt");
    this.service.isAuthenticated(this.email, this.password)
      .subscribe(data => {
        console.log(data);
        if (data == null)
          this.flag=true;
        else {
          this.service.setLoggedInEmail(this.email);
          this.route.navigate(['listings']);
          this.service.sendData();
        }
      });
  }


}
