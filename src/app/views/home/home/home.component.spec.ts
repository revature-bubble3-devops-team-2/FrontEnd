import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/views/home/like/like.component.spec.ts
import { LikeComponent } from './like.component';

describe('LikeComponent', () => {
  let component: LikeComponent;
  let fixture: ComponentFixture<LikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeComponent ]
=======
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
>>>>>>> main:src/app/views/home/home/home.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/views/home/like/like.component.spec.ts
    fixture = TestBed.createComponent(LikeComponent);
=======
    fixture = TestBed.createComponent(HomeComponent);
>>>>>>> main:src/app/views/home/home/home.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
