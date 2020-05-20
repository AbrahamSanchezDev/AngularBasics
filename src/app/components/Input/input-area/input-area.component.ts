import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.css'],
})
export class InputAreaComponent implements OnInit {
  @Output() onDeleteText: EventEmitter<any> = new EventEmitter();
  @Input() text: string = 'add text...';

  constructor() {}

  ngOnInit() {}

  onDelete(): void {
    //this would send the content of the input field only if there is a text
    if (this.text) {
      this.onDeleteText.emit(this.text);
    }
  }
}
