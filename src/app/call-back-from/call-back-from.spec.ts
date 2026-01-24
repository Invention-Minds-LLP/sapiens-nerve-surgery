import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBackFrom } from './call-back-from';

describe('CallBackFrom', () => {
  let component: CallBackFrom;
  let fixture: ComponentFixture<CallBackFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBackFrom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBackFrom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
