import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoCard } from './aviso-card';

describe('AvisoCard', () => {
  let component: AvisoCard;
  let fixture: ComponentFixture<AvisoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
