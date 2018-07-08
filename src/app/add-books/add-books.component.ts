import { Component, OnInit } from '@angular/core';
import {BackendConnectService} from "../backend-connect.service";
import {Books} from "../Books";
import {BookConditions} from "../BookConditions"
import {Observable} from "rxjs/index";
import {AngularFireStorage} from "angularfire2/storage";
import {finalize} from "rxjs/internal/operators";
import {NgProgress} from "@ngx-progressbar/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  downloadUrl:Observable<string>;
  public bookname:string="";
  public authorname:string="";
  public price:string="";
  public imageLink:string="";
  public condition:string="Choose";
  public photoLocalpath:string="Select Photo";
  selectedFiles: FileList;
  public file;

  public conditions:string[]=[BookConditions.New,BookConditions.AlmostNew,BookConditions.SlightlyDamage,BookConditions.Worn];
  constructor(private route:Router,private service:BackendConnectService,private afStorage: AngularFireStorage,public progress: NgProgress) {
    this.service.sendData();
  }

  ngOnInit() {
  }
  //photo upload button click
  upload() {
    this.file = this.selectedFiles.item(0);
    this.progress.start();
    this.uploadPhoto(this.file)
  }
  //actually uploads the photo into firebase project which is connected to website
  uploadPhoto(file)
  {
    //unique id of photo
    const id = Math.random().toString(36).substring(2);
    const task = this.afStorage.upload(id, file);
    const ref = this.afStorage.ref(id);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = ref.getDownloadURL()
        this.downloadUrl.subscribe(url=>{
          //get the url of uplaoded image from firebase
          this.imageLink=url;
          this.progress.complete();
        })
      })
    )
      .subscribe()
  }
 selectFile(event)
 {
   this.selectedFiles = event.target.files;
   if(this.selectedFiles.item(0)===null)
     this.photoLocalpath="Select Photo"
   else
      this.photoLocalpath=this.selectedFiles[0].name;
 }
 //on submit the form
 onSubmit()
 {
   let newbook:Books=new Books(-1,this.bookname,this.authorname,this.imageLink,this.price,this.condition,this.service.getLoggedInEmail());
   // console.log(newbook);
   this.service.addNewBook(newbook)
     .subscribe(data=>
     {
      this.route.navigate(['myadds']);
     })
 }
}
