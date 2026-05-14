import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralAluno } from './mural-aluno';

describe('MuralAluno', () => {
  let component: MuralAluno;
  let fixture: ComponentFixture<MuralAluno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuralAluno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuralAluno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
