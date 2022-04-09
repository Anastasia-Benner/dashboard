import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartcardComponent } from './piechartcard.component';

describe('PiechartcardComponent', () => {
  let component: PiechartcardComponent;
  let fixture: ComponentFixture<PiechartcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
