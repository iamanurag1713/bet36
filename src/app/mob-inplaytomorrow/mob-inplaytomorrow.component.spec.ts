import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobInplaytomorrowComponent } from './mob-inplaytomorrow.component';

describe('MobInplaytomorrowComponent', () => {
  let component: MobInplaytomorrowComponent;
  let fixture: ComponentFixture<MobInplaytomorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobInplaytomorrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobInplaytomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
