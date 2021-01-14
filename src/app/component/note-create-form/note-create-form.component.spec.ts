import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCreateFormComponent } from './note-create-form.component';

describe('NoteCreateFormComponent', () => {
  let component: NoteCreateFormComponent;
  let fixture: ComponentFixture<NoteCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
