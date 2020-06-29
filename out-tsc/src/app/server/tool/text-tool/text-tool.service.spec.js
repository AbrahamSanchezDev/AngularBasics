import { TestBed, async } from '@angular/core/testing';
import { TextToolService } from './text-tool.service';
import { ElementRef } from '@angular/core';
export class MockElementRef extends ElementRef {
}
describe('TextToolService', () => {
    let service;
    let input;
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
        service = TestBed.inject(TextToolService);
        input = new MockElementRef(HTMLInputElement);
    });
    afterAll(() => {
        input = null;
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
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
        input.nativeElement.innerText = testingText;
        let textPos = testingText.indexOf(codeText);
        input.nativeElement.selectionStart = textPos;
        let theText = service.setToCode(testingText, codeText, input);
        expect(theText.toString()).toBe(replacedText.toString());
    });
});
//# sourceMappingURL=text-tool.service.spec.js.map