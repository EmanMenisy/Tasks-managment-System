import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgrtPassword } from './forgrt-password';

describe('ForgrtPassword', () => {
  let component: ForgrtPassword;
  let fixture: ComponentFixture<ForgrtPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgrtPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgrtPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
