import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutlutvComponent } from './mutlutv.component';

describe('MutlutvComponent', () => {
  let component: MutlutvComponent;
  let fixture: ComponentFixture<MutlutvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutlutvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutlutvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
