import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicData } from '../topic/topic-data';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class TopicObjModule {
  title: string;
  description: string;
  text: string;
  content?: TopicData[];
}
