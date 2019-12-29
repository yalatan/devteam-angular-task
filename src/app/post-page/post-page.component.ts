import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import {
  trigger,
  style,
  animate,
  transition,
  state
} from "@angular/animations";

@Component({
  selector: "app-post-page",
  templateUrl: "./post-page.component.html",
  styleUrls: ["./post-page.component.scss"],
  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(600)]),
      transition(":leave", animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class PostPageComponent implements OnInit {
  post: {};
  isShowSpinner = true;
  constructor(private postservice: PostService) {}

  ngOnInit() {
    this.post = this.postservice.getPost();
    if (this.post) {
      this.isShowSpinner = false;
    }
  }
}
