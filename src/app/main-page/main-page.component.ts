import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "../post.service";
import {
  trigger,
  style,
  animate,
  transition,
  state
} from "@angular/animations";

import { MatDialog } from "@angular/material";
import { PopupComponent } from "../popup/popup.component";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(600)]),
      transition(":leave", animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class MainPageComponent implements OnInit {
  posts: any;
  isShowSpinner = true;
  newPost: any;
  title: string;
  body: string;
  userId: string;
  isNewPost = false;
  constructor(
    private router: Router,
    private postService: PostService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.postService.getPosts().then(json => {
      this.posts = json;
      this.isShowSpinner = false;
    });

    this.postService._newPost.subscribe(data => {
      this.newPost = data;
      this.isNewPost = true;
      setTimeout(
        () =>
          window.scrollTo({
            top: document.body.scrollHeight + 50,
            behavior: "smooth"
          }),
        300
      );
    });
  }
  redirectToPostPage(post): void {
    this.postService.setPost(post);
    this.router.navigate(["/post-page"]);
  }

  openDialog(): void {
    this.dialog.open(PopupComponent, {
      width: "500px",
      data: { title: this.title, body: this.body, userId: this.userId }
    });
  }
}
