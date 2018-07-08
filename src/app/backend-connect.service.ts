import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs/index";
import {User} from "./User";

import {Books} from "./Books";


@Injectable({
  providedIn: 'root'
})
export class BackendConnectService {

  private baseurl='';


  //for receiving data intp header component from router outlet
  private subject = new Subject<any>();

  constructor(private http:HttpClient) {

  }
  //data is send to the header component
  sendData() {
      this.subject.next(this.getLoggedInEmail());
  }
  //data is get by header component
  getData(): Observable<any> {
    return this.subject.asObservable();
  }
 //after login
  setLoggedInEmail(email)
  {
    sessionStorage.setItem('email',email);
  }
  //retrieve eamil
  getLoggedInEmail():string
  {
    return sessionStorage.getItem('email');
  }
  //at log out delete the session storage
  removeEmail()
  {
    sessionStorage.removeItem('email');
  }
//get request at login
  isAuthenticated(email:string,password:string)
   {
    return this.http.get(this.baseurl+'/users',{
       params: {
         email: email,
         password: password
       },
     });
   }
   //for sign up
   createUser(newuser:User)
   {
     return this.http.post(this.baseurl+'/users',{
       params:newuser
     });
   }
//for add new listing
   addNewBook(newBook:Books)
   {
      return this.http.post(this.baseurl+'/listings',{
       'params':newBook
     });
   }
   //for fetching all the listings except the logged in user
   getListings()
   {
     return this.http.get(this.baseurl+'/listings',{
       params:{'email':this.getLoggedInEmail()}
     });

   }
   //fetch info of single listing
   getSingleListing(id)
   {
     return this.http.get(this.baseurl+'/listings/singlelisting',{
       'params':{
         'id':id
       }
     });
   }
   //fetch info about some other user
   getInfo(email)
   {
     console.log("In seller info"+email)
     return this.http.get(this.baseurl+'/users/info',{
       'params':{
         'email':email
       }
     });
   }
   //request for adding the book into wishlist
   addToWishlist(id)
   {
     console.log(this.getLoggedInEmail());
     console.log(id);
     return this.http.post(this.baseurl+'/wishlist',{
       'params':{
         'email':this.getLoggedInEmail(),
         'bookid':id
       }
     })
   }
   //fetching the books in wishlist
   getWishlist()
   {
     return this.http.get(this.baseurl+'/wishlist',{
       'params':{
         'email':this.getLoggedInEmail()
       }
     })
   }
   //remove the book from wishlist
  removeWishlist(id)
  {
    return this.http.get(this.baseurl+'/wishlist/delete',{
      'params':{
        'id':id
      }
    })
  }
  //fetch the listings added by logged in user itself
  getPostedByMe()
  {
    return this.http.get(this.baseurl+'/listings/booksbyme',{
      'params':{
        'email':this.getLoggedInEmail()
      }
    })
  }
  //remove the listing added by himself
  removeAdd(id)
  {
    return this.http.get(this.baseurl+'/listings/removebookadd',{
      'params':{
        'id':id
      }
    })
  }
  //message send to seller form singlebook component
  sendMessage(id,sellerEmail,msg,name)
  {
    return this.http.post(this.baseurl+'/messages',{
      'params':{
        'to':sellerEmail,
        'from':this.getLoggedInEmail(),
        'bookId':id,
        'message':msg,
        'sellername':name

      }
    })
  }
  //fetch the chats into messages component
  getChats()
  {
    return this.http.get(this.baseurl+'/messages',{
      'params':{
        'email':this.getLoggedInEmail()
      }
    })
  }
  //fetch the single conversation
  getMessages(chatId)
  {
    return this.http.get(this.baseurl+'/messages/retrieve',{
      'params':{
        'email':this.getLoggedInEmail(),
        'id':chatId
      }
    })
  }
//send message from single chat component
  sendMessageFromChat(cid,msg)
  {
    return this.http.post(this.baseurl+'/messages/chatmsg',{
      'params':{
        'id':cid,
        'msg':msg,
        'from':this.getLoggedInEmail()
      }
    })
  }
}
