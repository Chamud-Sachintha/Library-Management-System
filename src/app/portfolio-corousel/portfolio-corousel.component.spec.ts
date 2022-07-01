import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCorouselComponent } from './portfolio-corousel.component';

describe('PortfolioCorouselComponent', () => {
  let component: PortfolioCorouselComponent;
  let fixture: ComponentFixture<PortfolioCorouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioCorouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCorouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
