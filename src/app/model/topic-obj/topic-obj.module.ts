import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class TopicObjModule {
  title: string;
  description: string;
  text: string;
  local: boolean;
  code: string[];
  imgs: string[];
}
