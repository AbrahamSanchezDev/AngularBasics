import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TopicTextToolComponent } from './topic-text-tool.component';
import { InputMultilineComponent } from '../../Input/input-multiline/input-multiline.component';

describe('TopicTextToolComponent', () => {
  let component: TopicTextToolComponent;
  let fixture: ComponentFixture<TopicTextToolComponent>;
  let multiTextCom: InputMultilineComponent;
  let fixture2: ComponentFixture<InputMultilineComponent>;
  let testingText = `holy is sisisi
  ssssss 

  fffff  
  aaaa  holy

   holy

  eee holy

  holy`;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicTextToolComponent, InputMultilineComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTextToolComponent);
    component = fixture.componentInstance;

    fixture2 = TestBed.createComponent(InputMultilineComponent);
    multiTextCom = fixture2.componentInstance;
    fixture.detectChanges();

    component.mainTopic = multiTextCom;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(multiTextCom).toBeTruthy();
  });
  it('should create', () => {
    expect(component.mainTopic).toBeTruthy();
  });

  // it('should Replace Text to code', () => {
  //   const replacedText = `holy is sisisi
  //   ssssss

  //   fffff
  //   aaaa  holy

  //    holy

  //   eee holy

  //   holy`;
  //   fixture2.detectChanges();
  //   expect(component.mainTopic).toBeTruthy();
  //   expect(component.mainTopic.theText).toBeTruthy();

  //   component.mainTopic.theText.nativeElement.selectionStart = 1;
  //   component.mainTopic.theText.nativeElement.selectionEnd = 4;
  //   component.mainTopic.content = testingText;
  //   fixture.detectChanges();
  //   fixture2.detectChanges();

  //   expect(component.mainTopic.content).toBe(testingText);
  //   console.log('******************Nodes ----------------');

  //   // console.log('Node: ' + component.mainTopic.theText.nativeElement);

  //   // console.log(component.mainTopic.theText);
  //   console.log(component.mainTopic.theText.nativeElement.textContent);

  //   component.mainTopic.theText.nativeElement.focus();
  //   component.mainTopic.theText.nativeElement.select();
  //   component.mainTopic.theText.nativeElement.setSelectionRange(1, 4);
  //   component.mainTopic.theText.nativeElement.selectionStart = 1;
  //   fixture.detectChanges();
  //   fixture2.detectChanges();
  //   fixture.detectChanges();
  //   fixture2.detectChanges();
  //   console.log(
  //     component.mainTopic.theText.nativeElement.selectionStart +
  //       ' - ' +
  //       component.mainTopic.theText.nativeElement.selectionEnd
  //   );

  //   // expect(component.mainTopic.theText.nativeElement.childNodes).toBe(
  //   //   testingText
  //   // );

  //   var rangeObject = window.getSelection();
  //   fixture.detectChanges();
  //   fixture2.detectChanges();
  //   // var ran = new Range();
  //   const textArea = document.getElementById('textArea') as HTMLInputElement;
  //   console.log('After area');

  //   fixture.detectChanges();
  //   fixture2.detectChanges();
  //   console.log(textArea);
  //   textArea.focus();
  //   fixture.detectChanges();
  //   fixture2.detectChanges();
  //   // component.mainTopic.theText.setSelectionRange(1, 4);
  //   fixture.detectChanges();
  //   fixture2.detectChanges();

  //   console.log(textArea.selectionStart);

  //   console.log(textArea.selectionEnd);
  //   let noded = textArea.childNodes;
  //   console.log('Nodess ');
  //   console.log(noded);
  //   console.log(noded[1]);

  //   // ran.setStart(textArea, 0);
  //   // ran.setStart(textArea, 4);
  //   component.mainTopic.theText.nativeElement.selectionStart = 2;
  //   let start = component.mainTopic.theText.nativeElement.selectionStart;
  //   console.log(start);

  //   // rangeObject.addRange(ran);
  //   spyOn(window, 'getSelection').and.returnValue(rangeObject);

  //   // window.getSelection().removeAllRanges();
  //   // window.getSelection().addRange(ran);

  //   fixture.detectChanges();
  //   fixture2.detectChanges();
  //   component.setSelectedToCode();
  //   fixture.detectChanges();
  //   expect(component.mainTopic.content).toBe(testingText);

  //   expect(component.mainTopic.content).toBe(replacedText);
  // });
});
