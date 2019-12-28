import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from './DialogData';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidatorFn
} from "@angular/forms";
import { PostService } from '../post.service';


@Component({
  selector: 'app-popap',
  templateUrl: './popap.component.html',
  styleUrls: ['./popap.component.scss']
})
export class PopapComponent implements OnInit {
 popapForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<PopapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private postservice: PostService,
    ) { }

  ngOnInit() {
    this.popapForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      body: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      userId: ["", [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.minLength(1)]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  save(value){
    this.postservice.sendPost(value);
  }
}
