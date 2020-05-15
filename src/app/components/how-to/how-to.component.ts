import { Component, OnInit, Input } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css'],
})
export class HowToComponent implements OnInit {
  @Input() topic: TopicObjModule;
  constructor() {}

  ngOnInit(): void {}
}
