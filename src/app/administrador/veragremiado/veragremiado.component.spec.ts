import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeragremiadoComponent } from './veragremiado.component';

describe('VeragremiadoComponent', () => {
  let component: VeragremiadoComponent;
  let fixture: ComponentFixture<VeragremiadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeragremiadoComponent]
    });
    fixture = TestBed.createComponent(VeragremiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
