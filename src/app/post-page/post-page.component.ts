import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import {
  trigger,
  style,
  animate,
  transition,
  state
} from "@angular/animations";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

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
  post: any;
  isShowSpinner = true;
  urlPosts = "https://jsonplaceholder.typicode.com/posts";
  private id: number;
  constructor(
    private postservice: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap(params => params.get("id")))
      .subscribe(data => (this.id = +data));

    this.post = this.postservice.getPost();
    if (this.post) {
      this.isShowSpinner = false;
    } else {
      fetch(this.urlPosts + "/" + this.id)
        .then(response => response.json())
        .then(json => {
          this.post = json;
          if (this.post) {
            this.isShowSpinner = false;
          }
        });
    }
  }
}
