import { TestBed } from '@angular/core/testing';

import { DownloadToolService } from './download-tool.service';

describe('DownloadToolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadToolService = TestBed.get(DownloadToolService);
    expect(service).toBeTruthy();
  });
});
