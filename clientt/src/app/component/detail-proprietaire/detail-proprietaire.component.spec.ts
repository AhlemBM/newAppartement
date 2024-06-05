import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProprietaireComponent } from './detail-proprietaire.component';

describe('DetailProprietaireComponent', () => {
  let component: DetailProprietaireComponent;
  let fixture: ComponentFixture<DetailProprietaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProprietaireComponent]
    });
    fixture = TestBed.createComponent(DetailProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
