import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
})
export class TextFieldComponent implements OnInit {
  @Input() title: string = 'Title';

  myText: string = '';
  constructor() {}

  ngOnInit(): void {}
}
