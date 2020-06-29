import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { BaseDataService } from '../base-data.service';
let TopicControlService = class TopicControlService extends BaseDataService {
    constructor() {
        super(...arguments);
        this.jsonPath = 'assets/topics/';
        this.firstPlace = 'How to get started with Angular';
        this.fileNames = [
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
    }
    //Set data to replace the tags
    initData(data) {
        data.text = this.replaceTags(data.text);
        return data;
    }
    //Place it in the first place check
    firstPlaceObj(data) {
        return data.title == this.firstPlace;
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