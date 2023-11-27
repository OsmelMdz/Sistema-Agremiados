import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgremiadoComponent } from './agremiado.component';

describe('AgremiadoComponent', () => {
  let component: AgremiadoComponent;
  let fixture: ComponentFixture<AgremiadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgremiadoComponent]
    });
    fixture = TestBed.createComponent(AgremiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
