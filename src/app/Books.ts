export class Books
{
bookid:number;
bookName:string;
authorName:string;
imageLink:string;
price:string;
condition:string;
userEmail:string
constructor(bookd,bookName,authorName,imageLink,price,condition,userEmail)
{
  this.bookid=bookd;
  this.bookName=bookName;
  this.authorName=authorName;
  this.imageLink=imageLink;
  this.price=price;
  this.condition=condition;
  this.userEmail=userEmail;

}
}
