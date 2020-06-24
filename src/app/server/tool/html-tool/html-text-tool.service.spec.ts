import { TestBed, async } from '@angular/core/testing';

import { HtmlTextToolService } from './html-text-tool.service';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../text-tool/text-tool.service.spec';

describe('HtmlToolService', () => {
  let service: HtmlTextToolService;
  let input: ElementRef<HTMLInputElement>;
  const firstText = 'This is some previews text';
  const link = 'www.google.com';
  const endText = 'Other Text';

  const setTextInInput = (fullText, lookingForText) => {
    input.nativeElement.innerText = fullText;
    let textPos = fullText.indexOf(lookingForText);
    input.nativeElement.selectionStart = textPos;
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        //more providers
        { provide: ElementRef, useClass: MockElementRef },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlTextToolService);
    input = new MockElementRef(HTMLInputElement);
  });
  afterAll(() => {
    input = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //Testing setToCode function
  it('should replace Code Text', () => {
    //this would be the code text
    const codeText = `@Component({
      //Some Comment
  })`;
    //This would be the original text
    const testingText = `
This is some component,
${codeText}
end of the description`;
    //This should be the result
    const replacedText = `
This is some component,

[code]

${codeText}

[/code]

end of the description`;

    setTextInInput(testingText, codeText);
    let theText = service.setToCode(testingText, codeText, input);
    expect(theText.toString()).toBe(replacedText.toString());
  });
  //testing getTextAsCode function
  it('should return text as code', () => {
    let original = 'This text should be inside of the code';
    let changedText = service.getTextAsCode(original);
    expect(changedText).toContain('[code]');
    expect(changedText).toContain('[/code]');
    expect(changedText).toContain(original);
  });
  //Testing replaceSelectedToImg function
  it('should return text as image', () => {
    let originalText = `
    ${firstText}
    ${link}
    ${endText}
    `;
    setTextInInput(originalText, link);
    let theNewText = service.replaceSelectedToImg(originalText, link, input);
    expect(theNewText).toContain(firstText);
    expect(theNewText).toContain(link);
    expect(theNewText).toContain(endText);
    expect(theNewText).toContain('<img src=');
  });
  //Testing replaceSelectedToLink function
  it('should return text as link', () => {
    let originalText = `
    ${firstText}
    ${link}
    ${endText}
    `;
    setTextInInput(originalText, link);
    let theNewText = service.replaceSelectedToLink(originalText, link, input);
    expect(theNewText).toContain(firstText);
    expect(theNewText).toContain(link);
    expect(theNewText).toContain(endText);
    expect(theNewText).toContain('<a href');
  });

  //Testing insertLink function
  it('should insert a link to the text', () => {
    let originalText = `
      ${firstText}
      ${link}
      ${endText}
      `;
    let otherLink = 'www.youtube.com';
    let linkDisplay = 'Some Link Is Here!';
    setTextInInput(originalText, link);
    let theNewText = service.insertLink(
      originalText,
      otherLink,
      linkDisplay,
      input
    );
    expect(theNewText).toContain(firstText);
    expect(theNewText).toContain(link);
    expect(theNewText).toContain(endText);
    expect(theNewText).toContain('<a href');
    expect(theNewText).toContain(otherLink);
  });

  //Testing InsertImg function
  it('should insert an img to the text', () => {
    let originalText = `
      ${firstText}
      ${link}
      ${endText}
      `;
    let otherLink = 'www.youtube.com';
    let linkDisplay = 'Some Link Is Here!';
    setTextInInput(originalText, link);
    let theNewText = service.InsertImg(
      originalText,
      otherLink,
      linkDisplay,
      input
    );
    expect(theNewText).toContain(firstText);
    expect(theNewText).toContain(link);
    expect(theNewText).toContain(endText);
    expect(theNewText).toContain('<img src=');
    expect(theNewText).toContain(otherLink);
  });
  //Testing setToTag function
  it('should put the text in between two tags', () => {
    let originalText = `
      ${firstText}
      ${link}
      ${endText}
      `;
    //This can be any tag
    let tag = 'p';
    setTextInInput(originalText, link);
    let theNewText = service.setToTag(originalText, tag, link, input);
    expect(theNewText).toContain(firstText);
    expect(theNewText).toContain(link);
    expect(theNewText).toContain(endText);
    expect(theNewText).toContain(`<${tag}>${link}</${tag}>`);
  });
});
