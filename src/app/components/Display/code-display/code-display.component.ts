import { Component, OnInit, Input } from '@angular/core';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { element } from 'protractor';

@Component({
  selector: 'app-code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.css'],
})
export class CodeDisplayComponent implements OnInit {
  constructor(private topicControl: TopicControlService) {}

  @Input() codeText: string;

  ngOnInit(): void {}
  //Repaint the code
  onCodeChanged() {
    console.log(this.codeText);

    this.topicControl.rePaintCode();
    console.log('Changed Something');
  }
}
