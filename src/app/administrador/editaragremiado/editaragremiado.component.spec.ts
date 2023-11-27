import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaragremiadoComponent } from './editaragremiado.component';

describe('EditaragremiadoComponent', () => {
  let component: EditaragremiadoComponent;
  let fixture: ComponentFixture<EditaragremiadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditaragremiadoComponent]
    });
    fixture = TestBed.createComponent(EditaragremiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
