import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxeListeComponent } from './axe-liste.component';

describe('AxeListeComponent', () => {
  let component: AxeListeComponent;
  let fixture: ComponentFixture<AxeListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AxeListeComponent]
    });
    fixture = TestBed.createComponent(AxeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
