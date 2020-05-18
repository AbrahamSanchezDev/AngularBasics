import { Component, OnInit, ViewChild } from '@angular/core';
import { TextFieldComponent } from '../Input/text-field/text-field.component';

@Component({
  selector: 'app-how-to-creator',
  templateUrl: './how-to-creator.component.html',
  styleUrls: ['./how-to-creator.component.css'],
})
export class HowToCreatorComponent implements OnInit {
  myText: string = 'Test';
  @ViewChild('titleField') title: TextFieldComponent;
  @ViewChild('descriptionField') descriptionField: TextFieldComponent;

  topicName: string = 'Title of the topic';
  topicDescription: string = 'Description';
  introText: string = 'Intro / Main topic Text';

  constructor() {}
  ngOnInit(): void {}

  checkText() {
    if (this.title.myText) this.myText = this.title.myText;
  }
}
