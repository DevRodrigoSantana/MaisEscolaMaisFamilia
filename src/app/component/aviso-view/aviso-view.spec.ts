import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoView } from './aviso-view';

describe('AvisoView', () => {
  let component: AvisoView;
  let fixture: ComponentFixture<AvisoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
