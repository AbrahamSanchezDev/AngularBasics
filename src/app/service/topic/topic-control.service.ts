import { Injectable } from '@angular/core';
import { TopicObjModule } from '../../model/topic-obj/topic-obj.module';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { BaseDataService } from '../base-data.service';
import { HttpClient } from '@angular/common/http';
import { HtmlTextToolService } from '../tool/html-tool/html-text-tool.service';

declare const PR: any;

@Injectable({
  providedIn: 'root',
})
export class TopicControlService extends BaseDataService<TopicObjModule> {
  jsonPath: string = 'assets/topics/';
  firstPlace: string = 'How to get started with Angular';
  fileNames: string[] = [
    'How to use variables in html',
    'How to change variable in a component via html',
    'How to keep track of a component in the html',
    'How to use if in html',
    'How to use for loop in html',
    'How to use html input fields',
    'How to pass boolean value to a component',
    'How to use switch in the html using angular',
    'How to insert content to a component',
    'How to get started with Angular',
    'How to save and load from json',
    'How to use use angular basic commands',
  ];

  constructor(
    protected http: HttpClient,
    public httpText: HtmlTextToolService
  ) {
    super(http);
  }
  //Set data to replace the tags
  initData(data: TopicObjModule): TopicObjModule {
    data.text = this.httpText.formatAllText(data.text);
    return data;
  }
  //Place it in the first place check
  firstPlaceObj(data: TopicObjModule): boolean {
    return data.title == this.firstPlace;
  }
  //Repaint the code from prettyprint
  rePaintCode() {
    PR.prettyPrint();
  }

  // //Check if the topic contains the keyword
  matchTopic(topic: TopicObjModule, keyword: string): boolean {
    return topic.title.includes(keyword);
  }
  //Get Temp Topics for testing
  getTopics(): TopicObjModule[] {
    return [
      {
        title: 'Topic Name 1',
        description: 'Description 1',
        text: 'This text should describe the how to of the current topic.',
        content: [
          {
            data: TopicDataType.SimpleText,
            text: 'Display code as needed',
          },
          {
            data: TopicDataType.Code,
            text: `    
            //Testing Code First one!
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
