import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobSettingComponent } from './mob-setting.component';

describe('MobSettingComponent', () => {
  let component: MobSettingComponent;
  let fixture: ComponentFixture<MobSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
