import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobInplayComponent } from './mob-inplay.component';

describe('MobInplayComponent', () => {
  let component: MobInplayComponent;
  let fixture: ComponentFixture<MobInplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobInplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobInplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
