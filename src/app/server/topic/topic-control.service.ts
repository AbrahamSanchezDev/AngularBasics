import { Injectable, EventEmitter } from '@angular/core';
import { TopicObjModule } from '../../model/topic-obj/topic-obj.module';

@Injectable({
  providedIn: 'root',
})
export class TopicControlService {
  public onSelected: EventEmitter<TopicObjModule> = new EventEmitter<
    TopicObjModule
  >();
  constructor() {}

  getTopics(): TopicObjModule[] {
    const url = `${'dir'}/${'path'}`;

    return [
      {
        title: 'Topic Name 1',
        description: 'Description 1',
        text: 'This text should describe the how to of the current topic.',
        local: false,
        code: [
          `    
          //Testing Code
          public static void main(String[] args)
          {
            System.out.println("Hello World");        
          }
          `,
        ],
        imgs: [
          'https://depor.com/resizer/O5BEliv00NW_zEPL4nS0lfz0OuY=/980x/smart/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/GVAN5QCY2VC6BIZB3E4ZYQ4LSM.jpg',
          'https://pbs.twimg.com/profile_images/1190591694049366018/Orh4nwbQ_400x400.jpg',
        ],
      },
      {
        title: 'Topic 2',
        description: 'Description 2',
        text: 'Topic 2 text',
        local: false,
        code: [],
        imgs: [],
      },
    ];
  }
}
