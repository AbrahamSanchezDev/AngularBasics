import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
})
export class TextFieldComponent implements OnInit {
  @Input() title: string = 'Title';
  @Input() mainClass: string = 'text-parent';
  @Input() lableClass: string = 'lable-name';
  @Input() contentClass: string = 'content-name';
  myText: string = '';
  constructor() {}

  ngOnInit(): void {}
}
