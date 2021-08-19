import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxSacarComponent } from './textbox-sacar.component';

describe('TextboxSacarComponent', () => {
  let component: TextboxSacarComponent;
  let fixture: ComponentFixture<TextboxSacarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextboxSacarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxSacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
