import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAppartementComponent } from './detail-appartement.component';

describe('DetailAppartementComponent', () => {
  let component: DetailAppartementComponent;
  let fixture: ComponentFixture<DetailAppartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAppartementComponent]
    });
    fixture = TestBed.createComponent(DetailAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
