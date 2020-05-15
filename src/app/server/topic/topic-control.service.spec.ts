import { TestBed } from '@angular/core/testing';

import { TopicControlService } from './topic-control.service';

describe('TopicControlService', () => {
  let service: TopicControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
