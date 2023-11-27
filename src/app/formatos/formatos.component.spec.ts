import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatosComponent } from './formatos.component';

describe('FormatosComponent', () => {
  let component: FormatosComponent;
  let fixture: ComponentFixture<FormatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormatosComponent]
    });
    fixture = TestBed.createComponent(FormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
