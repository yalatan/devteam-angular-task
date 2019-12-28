import { Component, OnInit, Inject} from '@angular/core';
import { Router } from "@angular/router";
import {PostService} from "../post.service";
import {
  trigger,
  style,
  animate,
  transition,
  state
} from "@angular/animations";


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../popap/DialogData';
import { PopapComponent } from '../popap/popap.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(600)]),
      transition(":leave", animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class MainPageComponent implements OnInit {
listPosts: any;
isshowSpinner: boolean = true;
newpost: any;
title: string;
body: string;
userId: string;
dataPopap: any;
isshowNewPost = false;
  constructor(
    private router: Router,
    private postservice: PostService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.postservice.getListPosts().then(response => response.json())
    .then(json => {
       this.listPosts = json; this.isshowSpinner=false;});

     if(this.listPosts){this.isshowSpinner=false;}
this.postservice._newpost.subscribe(mes => {
  this.newpost  = mes;
 this.isshowNewPost = true;
 });
  }
  redirectToPostPage(post){
this.postservice.setPost(post);
this.router.navigate(["/post-page"]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopapComponent, {
      width: '500px',
      data: {title: this.title, body: this.body, userId: this.userId}
    });

  }
}


