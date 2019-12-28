import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostService {
  post: any;
  newpost: any;
  listPosts: any;
  isPost: Boolean = false;
  public _newpost = new Subject<any>();
  constructor() {}

  getListPosts() {
    return fetch("https://jsonplaceholder.typicode.com/posts");
  }

  sendPost(value) {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: value.title,
        body: value.body,
        userId: value.userId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        this._newpost.next(json);
        console.log("save in server", json);
      });
  }
  setPost(item) {
    this.post = item;
    this.isPost = true;
  }
  getPost() {
    return this.post;
  }
  canRedirect() {
    return this.isPost;
  }
  setNewPost(item) {
    this.newpost = item;
  }
  getNewPost() {
    return this.newpost;
  }
}
