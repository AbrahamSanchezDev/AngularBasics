import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TopicTextToolComponent } from './topic-text-tool.component';
import { InputMultilineComponent } from '../../Input/input-multiline/input-multiline.component';
import { Component, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControlName } from '@angular/forms';

@Component({
  template: `<app-input-multiline></app-input-multiline>`,
})
class WrapperComponent {}

describe('TopicTextToolComponent', () => {
  let component: TopicTextToolComponent;
  let fixture: ComponentFixture<TopicTextToolComponent>;
  let component2: InputMultilineComponent;
  let fixture2: ComponentFixture<InputMultilineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopicTextToolComponent,
        InputMultilineComponent,
        WrapperComponent,
        FormControlName,
      ],
      imports: [MatDialogModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TopicTextToolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTextToolComponent);
    component = fixture.componentInstance;
    fixture2 = TestBed.createComponent(InputMultilineComponent);
    component2 = fixture2.componentInstance;
    component.mainTopic = component2;
    fixture2.detectChanges();
    fixture.detectChanges();
  });

  // it('should have the both `ViewChild`s defined', () => {
  //   expect(component.mainTopic.theText).toBeDefined();
  // });

  it('should replace selected text to code', async(() => {
    const code = 'Jojojo';
    const codeText = `Holy Killer
Legions
Legion
${code}
other Code`;
    const finalCodeText = `Holy Killer
Legions
Legion

[code]

${code}

[/code]

other Code`;
    expect(component.mainTopic.theText).toBeTruthy;
    fixture.whenStable().then(() => {
      // let el = fixture2.debugElement.query(
      //   By.css('.expInputArea')
      // ) as ElementRef<HTMLTextAreaElement>;
      // let data = el.nativeElement;
      let data = component.mainTopic.theText.nativeElement;
      //Asign element to the compontent
      // component.mainTopic.theText = el;
      data.textContent = codeText;
      component.mainTopic.content =
        component.mainTopic.theText.nativeElement.value;
      //Set to selected and set the range of the selected text
      data.select();
      data.focus();
      var start = 27;
      data.setSelectionRange(start, start + code.length);
      //Check the turn selected to code function
      component.setSelectedToCode();
      //set the value to the InputMultilineComponent for visual feedback in tests
      component2.theText.nativeElement.value = component.mainTopic.content;
      //Final text
      let finalValue = component.mainTopic.content;
      expect(finalValue).toBe('finalCodeText');
    });
  }));

  // //Remove the InputMultilineComponent commpont
  // afterAll(() => {
  //   fixture.debugElement.nativeElement.remove();
  //   fixture2.debugElement.nativeElement.remove();
  // });
});
