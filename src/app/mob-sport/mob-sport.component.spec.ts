import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobSportComponent } from './mob-sport.component';

describe('MobSportComponent', () => {
  let component: MobSportComponent;
  let fixture: ComponentFixture<MobSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobSportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
