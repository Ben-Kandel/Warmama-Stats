import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GametypeDetailsComponent } from './gametype-details.component';

describe('GametypeDetailsComponent', () => {
  let component: GametypeDetailsComponent;
  let fixture: ComponentFixture<GametypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GametypeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GametypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
