import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  title: string;
  content?: InputContent[];
}
export interface InputContent {
  text: string;
  value?: string;
  type: string;
}
@Component({
  selector: 'app-text-confirm',
  templateUrl: './text-confirm.component.html',
  styleUrls: ['./text-confirm.component.css'],
})
export class TextConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TextConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
