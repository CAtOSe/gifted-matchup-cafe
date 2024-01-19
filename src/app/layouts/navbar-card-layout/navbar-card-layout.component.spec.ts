import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCardLayoutComponent } from './navbar-card-layout.component';

describe('NavbarCardLayoutComponent', () => {
  let component: NavbarCardLayoutComponent;
  let fixture: ComponentFixture<NavbarCardLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCardLayoutComponent],
    });
    fixture = TestBed.createComponent(NavbarCardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
