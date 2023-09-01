import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitePageComponent } from './specialite-page.component';

describe('SpecialitePageComponent', () => {
  let component: SpecialitePageComponent;
  let fixture: ComponentFixture<SpecialitePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialitePageComponent]
    });
    fixture = TestBed.createComponent(SpecialitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
