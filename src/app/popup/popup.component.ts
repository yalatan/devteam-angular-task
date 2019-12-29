import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "./DialogData";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { PostService } from "../post.service";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"]
})
export class PopupComponent implements OnInit {
  popUpForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private postservice: PostService
  ) {}

  ngOnInit() {
    this.popUpForm = this.fb.group({
      title: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(40)]
      ],
      body: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      ],
      userId: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(1)
        ]
      ]
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }
  onSave(value) {
    this.postservice.sendPost(value);
  }
}
