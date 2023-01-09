import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatePollutionComponent } from './simulate-pollution.component';

describe('SimulatePollutionComponent', () => {
  let component: SimulatePollutionComponent;
  let fixture: ComponentFixture<SimulatePollutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatePollutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatePollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
