import { TestBed } from '@angular/core/testing';

import { HtmlBaseService } from './html-base.service';

describe('HtmlBaseService', () => {
  let service: HtmlBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
