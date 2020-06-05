import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputData } from 'src/app/model/inputs/input-data';

@Component({
  selector: 'app-text-confirm',
  templateUrl: './text-confirm.component.html',
  styleUrls: ['./text-confirm.component.css'],
})
export class TextConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TextConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InputData
  ) {}

  ngOnInit(): void {}
  //Close the current dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
  //Close the current dialog and pass the current value
  onEnter(): void {
    this.dialogRef.close(this.data);
  }
}
