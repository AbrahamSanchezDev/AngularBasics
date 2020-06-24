import { TestBed, async } from '@angular/core/testing';

import { TextToolService } from './text-tool.service';
import { ElementRef } from '@angular/core';
export class MockElementRef extends ElementRef {}
describe('TextToolService', () => {
  let service: TextToolService;

  let input: ElementRef<HTMLInputElement>;
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
});
