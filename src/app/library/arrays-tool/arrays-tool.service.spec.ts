import { TestBed } from '@angular/core/testing';

import { ArraysToolService } from './arrays-tool.service';

describe('ArraysToolService', () => {
  let service: ArraysToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArraysToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
