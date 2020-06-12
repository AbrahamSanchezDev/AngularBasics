import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TopicTextToolComponent } from './topic-text-tool.component';
import { InputMultilineComponent } from '../../Input/input-multiline/input-multiline.component';
import { Component } from '@angular/core';
import { FormControlName } from '@angular/forms';

describe('TopicTextToolComponent', () => {
  let component: TopicTextToolComponent;
  let fixture: ComponentFixture<TopicTextToolComponent>;
  let component2: InputMultilineComponent;
  let fixture2: ComponentFixture<InputMultilineComponent>;

  //Fill the InputMultilineComponent with the given text
  const setText = (text: string) => {
    //Refer to theText nativeElement
    const data = component.mainTopic.theText.nativeElement;
    //Set the data to be the initial code
    data.textContent = text;
    //Set the content to be the same as the value of theText element since [ngModel] in not been called
    component.mainTopic.content = data.value;
  };
  //Set ranges for the selected text
  const setRange = (text: string, start: number) => {
    //Set to selected and set the range of the selected text
    const data = component.mainTopic.theText.nativeElement;
    data.select();
    data.focus();
    data.setSelectionRange(start, start + text.length);
  };
  //Make the InputMultilineComponent to be equal to the content string
  const updateText = () => {
    //set the value to the InputMultilineComponent for visual feedback in tests
    component2.theText.nativeElement.value = component.mainTopic.content;
  };
  const checkMath = (curText: string, replaceText: string) => {
    for (let i = 0; i < curText.length; i++) {
      if (i >= curText.length || i >= replaceText.length) {
        break;
      }
      console.log(curText[i] + ' : ' + replaceText[i]);
      if (curText[i] != replaceText[i]) {
        console.log(
          'No match at ' + i + ' ' + curText[i] + ' vs ' + replaceText[i]
        );
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopicTextToolComponent,
        InputMultilineComponent,
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
  //Checking function hasSomethingSelected
  it('should check if has something selected', async(() => {
    const currentText =
      'This text should be display with some other text at the end';
    const selectedText = 'text';
    fixture.whenStable().then(() => {
      //Set the text
      setText(currentText);
      //Check if ther is something selected
      let currentSelected = component.hasSomethingSelected();
      expect(currentSelected).toBe(false);
      //Set selection range
      setRange(selectedText, 5);
      //Check if ther is something selected
      currentSelected = component.hasSomethingSelected();
      expect(currentSelected).toBe(true);
      expect(component.selectedText).toBe(selectedText);
    });
  }));
  //Checking function setSelectedToCode
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
      //Set the data to be the initial code
      setText(codeText);
      //Set Ranges for the selected
      setRange(code, 27);
      //Check the turn selected to code function
      component.setSelectedToCode();
      updateText();
      //Final text
      let finalValue = component.mainTopic.content;
      expect(finalValue).toBe(finalCodeText);
    });
  }));

  //Checking function setSelectedToImage
  it('should turn selected text to an image', async(() => {
    const link =
      'https://rockcontent.com/es/wp-content/uploads/2019/02/google-trends-1280x720.png';
    const currentText = `
    this text starts
    ${link}
    this one ends
    `;
    const updatedText = `
    this text starts
    <img src="${link}" alt = "Image not found"/>
    this one ends
    `;
    const selectedText = 'text';

    fixture.whenStable().then(() => {
      //Set the text
      setText(currentText);
      let index = currentText.indexOf(link);
      //Set selection range
      setRange(link, index);
      component.setSelectedToImage();
      let newText = component.mainTopic.content;
      expect(newText).toBe(updatedText);
    });
  }));
  //Checking function setSelectedToLink
  it('should turn selected text to a link', async(() => {
    const link = 'https://www.youtube.com/';
    const currentText = `
    this text starts
    ${link}
    this one ends
    `;
    const updatedText = `
    this text starts
    <a href = "${link}" target= "_blank">Link</a>
    this one ends
    `;
    const selectedText = 'text';

    fixture.whenStable().then(() => {
      //Set the text
      setText(currentText);
      let index = currentText.indexOf(link);
      //Set selection range
      setRange(link, index);
      //Current testing main
      component.setSelectedToLink();
      let newText = component.mainTopic.content;
      expect(newText).toBe(updatedText);
    });
  }));
  //Checking function setToTag
  it('should turn selected text to a given tag', async(() => {
    const selectedText = 'This should be bold';
    const currentText = `this text starts ${selectedText} this one ends`;
    const updatedText = `this text starts <center>${selectedText}</center> this one ends`;

    fixture.whenStable().then(() => {
      //Set the text
      setText(currentText);
      let index = currentText.indexOf(selectedText);
      //Set selection range
      setRange(selectedText, index);
      //Current testing main
      component.setSelectedToTag('center');
      let newText = component.mainTopic.content;
      expect(newText).toBe(updatedText);
    });
  }));

  //Remove the InputMultilineComponent commpont
  afterAll(() => {
    fixture.debugElement.nativeElement.remove();
    fixture2.debugElement.nativeElement.remove();
  });
});
