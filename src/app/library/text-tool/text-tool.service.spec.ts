import { TestBed } from '@angular/core/testing';

import { TextToolService } from './text-tool.service';

describe('TextToolService', () => {
  let service: TextToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
