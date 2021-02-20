import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbFormComponent } from './gb-form.component';

describe('GbFormComponent', () => {
  let component: GbFormComponent;
  let fixture: ComponentFixture<GbFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GbFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
