import { TestBed, async } from '@angular/core/testing';
import { BaseDataService } from './base-data.service';
import { TopicObjModule } from '../model/topic-obj/topic-obj.module';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

export class BaseMuckClass extends BaseDataService<TopicObjModule> {
  mainObjectsFile = 'assets/topics/topics';
  firstPlaceObj(data: TopicObjModule): boolean {
    return data.title.includes('html input fields');
  }
  initData(data: TopicObjModule): TopicObjModule {
    return data;
  }
  matchTopic(topic: TopicObjModule, keyword: string): boolean {
    return topic.title.includes(keyword);
  }
}

describe('BaseDataService', () => {
  let service: BaseMuckClass;
  const topic = new TopicObjModule();
  let httpMuck: HttpTestingController;

  const dummyData: TopicObjModule[] = [
    {
      title: 'How to use for loop in html',
      description:
        'This will show you how to use a for loop in html using angular *ngFor',
      text:
        'There are times when you want to display and array of variables been single data of stings or an array of objects and to do this the for loop is a good idea.\nIn this example there is an array of objects that have "someText" and "someId" with different values.\n<div class="code-obj"><pre class="prettyprint linenums codeContainer"> \n//Ts file\nimport { Component, OnInit } from \'@angular/core\';\n\n@Component({\n  selector: \'app-howto-for\',\n  templateUrl: \'./howto-for.component.html\',\n  styleUrls: [\'./howto-for.component.css\'],\n})\nexport class HowtoForComponent implements OnInit {\n  allTheObjs: any[] = [\n    {\n      someText: \'This is an obj text\',\n      someId: 1,\n    },\n    {\n      someText: \'Hello world!\',\n      someId: 5,\n    },\n    {\n      someText: \'Angular how to!\',\n      someId: 10,\n    },\n    {\n      someText: \'And this would be the last text\',\n      someId: 15,\n    },\n  ];\n  constructor() {}\n  ngOnInit(): void {}\n}\n</pre></div>\nThis is how you would use the for loop in the html.\n<div class="code-obj"><pre class="prettyprint linenums codeContainer">\n //Html\n &ltdiv *ngFor="let obj of allTheObjs"&gt\n   &lth1&gt{{ obj.someText }}&lt/h1&gt\n   &ltp&gtThis is the value : {{ obj.someId }}&lt/p&gt\n &lt/div&gt\n</pre></div>\nWhen it get displayed it would look like this\n<img class="imgObj" src="https://i.imgur.com/ITaJWbJ.png"/>\n    ',
      content: [],
    },
    {
      title: 'How to use html input fields',
      description:
        'This will show you 2 ways on how to use the input fields while using angular',
      text:
        'There are time when you need not just to display but also take inputs and what good are they good for if you cant use them in the code.\nAnd for the here are 2 ways on how to do it one is by using the "ViewChild" in the Ts script and the other would be the " [(ngModel)]" in the html file.\n\nThe ngModel is not part of your starting project by default so you have to import it in the app.module.ts file first together with the FormsModule in order for you can use it.\n\n<div class="code-obj"><pre class="prettyprint linenums codeContainer"> \n//app.module.ts\nimport { BrowserModule } from \'@angular/platform-browser\';\nimport { NgModule } from \'@angular/core\';\nimport { FormsModule } from \'@angular/forms\';\n\nimport { AppRoutingModule } from \'./app-routing.module\';\nimport { AppComponent } from \'./app.component\';\nimport { HowToInputFieldComponent } from \'./com/how-to-input-field/how-to-input-field.component\';\n\n@NgModule({\n  declarations: [\n    AppComponent,\n    HowToInputFieldComponent,\n  ],\n  imports: [BrowserModule, AppRoutingModule, FormsModule],\n  providers: [],\n  bootstrap: [AppComponent],\n})\nexport class AppModule {}\n\n</pre></div>\n<div class="code-obj"><pre class="prettyprint linenums codeContainer"> \n//Ts File\nimport { Component, OnInit, ViewChild, ElementRef } from \'@angular/core\';\n\n@Component({\n  selector: \'app-how-to-input-field\',\n  templateUrl: \'./how-to-input-field.component.html\',\n  styleUrls: [\'./how-to-input-field.component.css\'],\n})\nexport class HowToInputFieldComponent implements OnInit {\n  @ViewChild(\'secondInput\') secondInput: ElementRef;\n\n  theFirst: string = \'\';\n  theSecond: string = \'\';\n\n  constructor() {}\n\n  ngOnInit(): void {}\n  //Get the value from the viewchild and asignt it to theSecond\n  updateSecond(): void {\n    this.theSecond = this.secondInput.nativeElement.value;\n  }\n}\n</pre></div>\n<div class="code-obj"><pre class="prettyprint linenums codeContainer"> \n//HTML File\n&ltdiv&gt\n  &lt!-- First method using ngModel --&gt\n  &ltlabel for="first"&gtThis would be the ngModel&lt/label&gt\n  &ltbr /&gt\n  &ltinput\n    type="text"\n    name="first"\n    [(ngModel)]="theFirst"\n    placeholder="First..."\n  /&gt\n  &ltp&gtvalue 1: {{ theFirst }}&lt/p&gt\n  &ltp [innerText]="theFirst"&gt&lt/p&gt\n  &lt!-- Second method using ViewChild --&gt\n  &ltlabel for="second"&gt This would be the ViewChild&lt/label&gt\n  &ltbr /&gt\n  &ltinput type="text" \n  #secondInput \n  name="second" \n  placeholder="Second..." \n  /&gt\n  &ltbr /&gt\n  &ltbutton (click)="updateSecond()"&gtCheck Input Value&lt/button&gt\n  &ltp&gtvalue 2: {{ theSecond }}&lt/p&gt\n  &ltp [innerText]="theSecond"&gt&lt/p&gt\n&lt/div&gt\n\n</pre></div>\nThis is how this code would look like:\n<img class="imgObj" src="https://i.imgur.com/SBx0gvS.png"/>\nWith the ngModule the variable is updated every time the input value is changed.\n<img class="imgObj" src="https://i.imgur.com/mF4Tt9r.png"/>\nBut with the ViewChild it\'s just keeping track to the input reference and thus the variable is not updated.\n<img class="imgObj" src="https://i.imgur.com/9DvgZjj.png"/>\nYou could add (onChange) in the html input field but for this example i just added a button for that.\n(after pressiong the button the variable is updated)\n<img class="imgObj" src="https://i.imgur.com/OJg3DnT.png"/>\n\n\n',
      content: [],
    },
  ];
  const titles: string[] = [
    'How to use for loop in html',
    'How to use html input fields',
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [BaseMuckClass],
    }).compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(BaseMuckClass);
    httpMuck = TestBed.get(HttpTestingController);
    // spyOn(console, 'log');
    topic.title = 'Title use angular';
    topic.description = 'Description';
    topic.text = 'Text';
  });
  //Any time that we get the data it make sure that there is no other request atm
  afterEach(() => {
    httpMuck.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the data array object from http get request', () => {
    const filePath = 'assets/topics/topics';
    service.mainObjectsFile = filePath;
    service.loadTopicsFromFile();
    const request = httpMuck.expectOne(filePath);
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
  it('should get the data array object from http get request', () => {
    const filePath = 'assets/topics/topics';
    service.getObjectsFile(filePath).subscribe((datas) => {
      expect(datas.length).toBeGreaterThan(0);
      expect(datas).toEqual(dummyData);
    });
    const request = httpMuck.expectOne(filePath);
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
  it('should get the data from http get request', () => {
    const dummyDataObj: TopicObjModule = {
      title: 'How to use for loop in html',
      description:
        'This will show you how to use a for loop in html using angular *ngFor',
      text:
        'There are times when you want to display and array of variables been single data of stings or an array of objects and to do this the for loop is a good idea.\nIn this example there is an array of objects that have "someText" and "someId" with different values.\n<div class="code-obj"><pre class="prettyprint linenums codeContainer"> \n//Ts file\nimport { Component, OnInit } from \'@angular/core\';\n\n@Component({\n  selector: \'app-howto-for\',\n  templateUrl: \'./howto-for.component.html\',\n  styleUrls: [\'./howto-for.component.css\'],\n})\nexport class HowtoForComponent implements OnInit {\n  allTheObjs: any[] = [\n    {\n      someText: \'This is an obj text\',\n      someId: 1,\n    },\n    {\n      someText: \'Hello world!\',\n      someId: 5,\n    },\n    {\n      someText: \'Angular how to!\',\n      someId: 10,\n    },\n    {\n      someText: \'And this would be the last text\',\n      someId: 15,\n    },\n  ];\n  constructor() {}\n  ngOnInit(): void {}\n}\n</pre></div>\nThis is how you would use the for loop in the html.\n<div class="code-obj"><pre class="prettyprint linenums codeContainer">\n //Html\n &ltdiv *ngFor="let obj of allTheObjs"&gt\n   &lth1&gt{{ obj.someText }}&lt/h1&gt\n   &ltp&gtThis is the value : {{ obj.someId }}&lt/p&gt\n &lt/div&gt\n</pre></div>\nWhen it get displayed it would look like this\n<img class="imgObj" src="https://i.imgur.com/ITaJWbJ.png"/>\n    ',
      content: [],
    };
    const filePath = 'assets/topics/How to use for loop in html';
    service.getFile(filePath).subscribe((data) => {
      expect(data).toEqual(dummyDataObj);
    });
    const request = httpMuck.expectOne(filePath);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDataObj);
  });

  it('should get getJsonData the data', () => {
    service.onLoadData(dummyData[0]);
    let currentData = service.getAllData();
    expect(currentData.length).toEqual(1);

    service.onLoadData(dummyData[1]);
    currentData = service.getAllData();
    expect(currentData.length).toEqual(2);
    currentData = service.getAllData();
    expect(currentData[0]).toBe(dummyData[1]);
  });

  it('should get getData the data', () => {
    service.addData(topic);
    service.addData(topic);
    let data = service.getData('use');
    expect(service.customData.length).toBeGreaterThan(0);
    expect(data.length).toBe(2);
    data = service.getData('google');
    expect(data.length).toBe(0);
  });
  it('should Call on the search event ', () => {
    spyOn(service.onSearch, 'emit');
    service.search('use');
    expect(service.onSearch.emit).toHaveBeenCalled();
  });
  it('should Add and return the datas ', () => {
    service.addData(topic);
    service.addData(topic);
    let curData = service.getAllData();
    expect(curData.length).toEqual(2);
  });
});
