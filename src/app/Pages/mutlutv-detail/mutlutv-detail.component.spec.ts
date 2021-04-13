import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutlutvDetailComponent } from './mutlutv-detail.component';

describe('MutlutvDetailComponent', () => {
  let component: MutlutvDetailComponent;
  let fixture: ComponentFixture<MutlutvDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutlutvDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutlutvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
