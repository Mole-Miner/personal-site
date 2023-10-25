import { TestBed } from '@angular/core/testing';

import { AccomplishmentsService } from './accomplishments.service';

describe('AccomplishmentsService', () => {
  let service: AccomplishmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccomplishmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
