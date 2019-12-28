import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
post: any;
newpost: any;
isPost: Boolean = false;
public _newpost = new Subject<any>();
  constructor(
    
  ) { 
    
  }
  setPost(item){
this.post = item;
this.isPost = true;
  };
  getPost(){
    return this.post 
      }
canRedirect(){
  return this.isPost
}
setNewPost(item){
  this.newpost = item;
    };
    getNewPost(){
      return this.newpost 
        }
}
