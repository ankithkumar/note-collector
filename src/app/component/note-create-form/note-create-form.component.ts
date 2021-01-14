import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { INote } from 'src/app/interface/note.interface';
import { NoteListManagerService } from 'src/app/service/note-list-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-create-form',
  templateUrl: './note-create-form.component.html',
  styleUrls: ['./note-create-form.component.scss']
})
export class NoteCreateFormComponent implements OnInit, OnDestroy {
  @Output() formClosed = new EventEmitter<any>();
  noteClickedSubscription;
  noteForm: FormGroup;
  formData: INote;
  constructor(
    private noteListManagerService: NoteListManagerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.addListener();
  }

  addListener() {
    this.noteClickedSubscription = this.noteListManagerService.getNoteClickedEvent().subscribe((note: INote) => {
      this.formData = note;
      this.buildForm(note);
    });
  }

  buildForm(note?: INote) {
    this.noteForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      editable: [false, []]
    });
    if (note && typeof note === 'object') {
      if (note.Name) {
        this.noteForm.controls.name.setValue(note.Name);
      }
      if (note.Description) {
        this.noteForm.controls.desc.setValue(note.Description);
      }
      if (note.hasOwnProperty('Editable')) {
        this.noteForm.controls.editable.setValue(note.Editable);
      }
    }
  }

  onFormSubmit() {
    const newDate = new Date();
    const filledFormValues: INote = {
      Name: this.noteForm.value.name,
      Description: this.noteForm.value.desc,
      Editable: this.noteForm.value.editable,
      Created: newDate,
      Updated: newDate,
      id: -1
    };
    if (this.formData.id === -1) {
      filledFormValues.id = this.noteListManagerService.getNextNoteId();
      this.noteListManagerService.appendNoteToList(filledFormValues);
      this.handleFormClose();
      return;
    }
    filledFormValues.id = this.formData.id;
    filledFormValues.Created = this.formData.Created;
    this.noteListManagerService.updateNote(filledFormValues);
    this.handleFormClose();
  }

  handleFormClose() {
    this.buildForm();
    this.formClosed.emit();
  }

  ngOnDestroy() {
    this.noteClickedSubscription.unsubscribe();
  }

}
