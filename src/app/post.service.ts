import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostService {
  post: {};
  newPost: {};
  isPost = false;
  public _newPost = new Subject<any>();
  constructor() {}

  getPosts() {
    return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json());
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
        this._newPost.next(json);
        console.log("save in server", json);
      });
  }
  setPost(item): void {
    this.post = item;
    this.isPost = true;
  }
  getPost(): {} {
    return this.post;
  }
  canRedirect(): {} {
    return this.isPost;
  }
  setNewPost(item): void {
    this.newPost = item;
  }
  getNewPost(): {} {
    return this.newPost;
  }
}
