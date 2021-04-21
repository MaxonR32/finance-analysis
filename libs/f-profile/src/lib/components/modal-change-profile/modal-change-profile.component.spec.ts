import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeProfileComponent } from './modal-change-profile.component';

describe('ModalChangeProfileComponent', () => {
  let component: ModalChangeProfileComponent;
  let fixture: ComponentFixture<ModalChangeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
