import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupCoverPhotoComponent } from './add-group-cover-photo.component';

describe('AddGroupCoverPhotoComponent', () => {
  let component: AddGroupCoverPhotoComponent;
  let fixture: ComponentFixture<AddGroupCoverPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupCoverPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupCoverPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
