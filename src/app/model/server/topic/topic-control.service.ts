import { Injectable } from '@angular/core';
import { TopicObjModule } from '../../model/topic-obj/topic-obj.module';
import { TopicDataType } from './node_modules/src/app/model/enum/topic-data-type.enum';
import { BaseDataService } from '../base-data.service';

declare const PR: any;

@Injectable({
  providedIn: 'root',
})
export class TopicControlService extends BaseDataService<TopicObjModule> {
  jsonPath: string = 'assets/topics/';
  fileNames: string[] = ['MisakaTopic.json'];

  //Repaint the code from prettyprint
  rePaintCode() {
    PR.prettyPrint();
  }
  //Check if the topic contains the keyword
  protected matchTopic(topic: TopicObjModule, keyword: string): boolean {
    return topic.title.includes(keyword);
  }
  //Get Temp Topics for testing
  getTopics(): TopicObjModule[] {
    const url = `${'dir'}/${'path'}`;

    return [
      {
        title: 'Topic Name 1',
        description: 'Description 1',
        text: 'This text should describe the how to of the current topic.',
        content: [
          {
            data: TopicDataType.SimpleText,
            text: 'Display code as neeeded',
          },
          {
            data: TopicDataType.Code,
            text: `    
            //Testing Code Firts one!
            public static void main(String[] args)
            {
              System.out.println("Hello World I Say!");        
            }
            `,
          },
          {
            data: TopicDataType.SimpleText,
            text: 'Then More Code!',
          },
          {
            data: TopicDataType.Code,
            text: `    
            //Testing Code
            public static void main(String[] args)
            {
              System.out.println("Hello World I Say!");        
            }
            `,
          },
          {
            data: TopicDataType.SimpleText,
            text: 'Or Display Imgs too!',
          },
          {
            data: TopicDataType.Img,
            text:
              'https://pbs.twimg.com/profile_images/1190591694049366018/Orh4nwbQ_400x400.jpg',
          },
        ],
      },
    ];
  }
}
