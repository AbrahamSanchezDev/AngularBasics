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

  it('should replace selected text to code', async(() => {
    const code = 'HolyLegioner';
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

    fixture.whenStable().then(() => {
      //Refer to theText nativeElement
      const data = component.mainTopic.theText.nativeElement;
      //Set the data to be the initial code
      data.textContent = codeText;
      //Set the content to be the same as the value of theText element since [ngModel] in not been called
      component.mainTopic.content = data.value;
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
      expect(finalValue).toBe(finalCodeText);
    });
  }));

  //Remove the InputMultilineComponent commpont
  afterAll(() => {
    fixture.debugElement.nativeElement.remove();
    fixture2.debugElement.nativeElement.remove();
  });
});
