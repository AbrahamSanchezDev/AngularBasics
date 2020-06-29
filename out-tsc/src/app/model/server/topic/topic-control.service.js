import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data.service';
import { TopicDataType } from '../../enum/topic-data-type.enum';
let TopicControlService = class TopicControlService extends BaseDataService {
    constructor() {
        super(...arguments);
        this.jsonPath = 'assets/topics/';
        this.fileNames = ['MisakaTopic.json'];
    }
    //Repaint the code from prettyprint
    rePaintCode() {
        PR.prettyPrint();
    }
    //Check if the topic contains the keyword
    matchTopic(topic, keyword) {
        return topic.title.includes(keyword);
    }
    //Get Temp Topics for testing
    getTopics() {
        const url = `${'dir'}/${'path'}`;
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
                        text: 'https://pbs.twimg.com/profile_images/1190591694049366018/Orh4nwbQ_400x400.jpg',
                    },
                ],
            },
        ];
    }
};
TopicControlService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], TopicControlService);
export { TopicControlService };
//# sourceMappingURL=topic-control.service.js.map