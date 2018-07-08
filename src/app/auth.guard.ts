import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {BackendConnectService} from "./backend-connect.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private service:BackendConnectService,private route:Router) {

   }
   //guard which intercepts the routing
   canActivate():boolean{
     if(this.service.getLoggedInEmail()!==null)
      return true;
     else
     {
       this.route.navigate(['login']);
       return false;
     }
   }

}
