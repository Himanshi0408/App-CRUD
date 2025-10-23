import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navabr } from './navbar.component';

describe('Navabr', () => {
  let component: Navabr;
  let fixture: ComponentFixture<Navabr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navabr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navabr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
