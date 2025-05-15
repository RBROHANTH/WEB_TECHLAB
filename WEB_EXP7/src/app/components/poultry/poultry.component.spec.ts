import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoultryComponent } from './poultry.component';

describe('PoultryComponent', () => {
  let component: PoultryComponent;
  let fixture: ComponentFixture<PoultryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoultryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoultryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
