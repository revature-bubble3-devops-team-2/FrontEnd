import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FollowComponent } from './follow.component';

describe('FollowComponent', () => {
  let component: FollowComponent;
  let fixture: ComponentFixture<FollowComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,
              RouterTestingModule], 
    providers: [FollowComponent]
  }));


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
