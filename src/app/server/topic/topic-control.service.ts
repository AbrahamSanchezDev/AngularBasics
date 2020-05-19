import { Injectable, EventEmitter } from '@angular/core';
import { TopicObjModule } from '../../model/topic-obj/topic-obj.module';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { HttpClient } from '@angular/common/http';

declare const PR: any;

@Injectable({
  providedIn: 'root',
})
export class TopicControlService {
  public onSelected: EventEmitter<TopicObjModule> = new EventEmitter<
    TopicObjModule
  >();
  private jsonsPath = 'assets/topics/';

  fileNames: string[] = ['MisakaTopic.json'];
  allData: TopicObjModule[] = [];

  constructor(private http: HttpClient) {}
  //Repaint the code from prettyprint
  rePaintCode() {
    PR.prettyPrint();
  }
  //Get the Topics using Json
  getJsonTopics(): TopicObjModule[] {
    //Check it the files were already loaded if so return them
    if (this.allData != null && this.allData.length > 0) {
      return this.allData;
    }
    // Get all the files that are in the file names
    for (let i = 0; i < this.fileNames.length; i++) {
      this.http
        .get<TopicObjModule>(this.jsonsPath + this.fileNames[i])
        .subscribe((data) => {
          this.allData.push(data);
        });
    }
    return this.allData;
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
