import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateFormComponent } from './modal-update-form.component';

describe('ModalUpdateFormComponent', () => {
  let component: ModalUpdateFormComponent;
  let fixture: ComponentFixture<ModalUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
