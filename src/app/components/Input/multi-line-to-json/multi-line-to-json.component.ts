import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-line-to-json',
  templateUrl: './multi-line-to-json.component.html',
  styleUrls: ['./multi-line-to-json.component.css']
})
export class MultiLineToJsonComponent implements OnInit {
  @Output() createText: EventEmitter<any> = new EventEmitter();

  @Input() title: string = "";
  @Input() cssClass: string = "";
  @Input() content: string;
  constructor() { }

  ngOnInit() {
  }

  generateText() {
    if (this.content == null || this.content.length == 0) {
      return;
    }
    let textInArray = this.content.split("\n");
    console.log(textInArray);
    return textInArray;
  }
}
