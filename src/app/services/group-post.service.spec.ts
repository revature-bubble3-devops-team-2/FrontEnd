import { TestBed } from '@angular/core/testing';

import { GroupPostService } from './group-post.service';

describe('GroupPostService', () => {
  let service: GroupPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
