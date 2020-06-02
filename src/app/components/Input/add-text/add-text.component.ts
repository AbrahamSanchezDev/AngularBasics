import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css'],
})
export class AddTextComponent implements OnInit {
  @Output() addTextData: EventEmitter<any> = new EventEmitter();
  @Input('tempText') tempPlaceHolder: string = 'Add...';
  @Input('addText') addText: string = 'Submit';
  @Input() clearIt: boolean = true;
  @Input() reportEmpty: boolean = false;
  myText: string;

  constructor() {}

  ngOnInit() {}
  onSubmit(): void {
    //this would send the content of the input field only if there is a text
    if (this.myText) {
      this.addTextData.emit(this.myText);
      if (this.clearIt) {
        this.myText = null;
      }
      return;
    }
    if (this.reportEmpty) {
      this.addTextData.emit(this.myText);
    }
  }
}
