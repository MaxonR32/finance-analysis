import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentDataComponent } from './different-data.component';

describe('DifferentDataComponent', () => {
  let component: DifferentDataComponent;
  let fixture: ComponentFixture<DifferentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifferentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
