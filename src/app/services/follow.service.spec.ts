import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FollowService } from './follow.service';

describe('FollowService', () => {
  let service: FollowService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,
              RouterTestingModule], 
    providers: [FollowService]
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
