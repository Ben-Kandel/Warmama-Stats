import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBrowserComponent } from './player-browser.component';

describe('PlayerBrowserComponent', () => {
  let component: PlayerBrowserComponent;
  let fixture: ComponentFixture<PlayerBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
