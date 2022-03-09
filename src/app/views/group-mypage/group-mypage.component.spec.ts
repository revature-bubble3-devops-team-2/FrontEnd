import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMypageComponent } from './group-mypage.component';

describe('GroupMypageComponent', () => {
  let component: GroupMypageComponent;
  let fixture: ComponentFixture<GroupMypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
