import { TestBed, inject } from '@angular/core/testing';

import { InspectBizService } from './inspect-biz.service';

describe('InspectBizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectBizService]
    });
  });

  it('should be created', inject([InspectBizService], (service: InspectBizService) => {
    expect(service).toBeTruthy();
  }));
});
