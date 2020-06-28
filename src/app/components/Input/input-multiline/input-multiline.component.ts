import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input-multiline',
  templateUrl: './input-multiline.component.html',
  styleUrls: ['./input-multiline.component.css'],
})
export class InputMultilineComponent implements OnInit {
  @Input() title: string = '';
  @Input() cssClass: string = 'expInputArea';
  @Input() content: string;
  @Input() height: string = '150px';

  @ViewChild('theText') theText: ElementRef<HTMLTextAreaElement>;
  constructor() {}

  ngOnInit(): void {}
}
