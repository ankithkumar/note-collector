import { Injectable } from '@angular/core';
import { INote } from '../interface/note.interface';
import { Subject } from 'rxjs';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class NoteListManagerService {
  notes: INote[] = [];
  lastUpdateNote: INote;
  notesChangeEvent = new Subject<any>();
  summaryUpdatedEvent = new Subject<any>();
  noteClickedEvent = new Subject<any>();

  constructor() { }

  getNotes(): INote[] {
    return cloneDeep(this.notes);
  }

  getLastIdOfNote() {
    let maxId = 0;
    this.notes.forEach(note => {
      maxId = maxId > note.id ? maxId : note.id;
    });
    return maxId;
  }

  getNextNoteId() {
    return this.getLastIdOfNote() + 1;
  }

  /**
   *
   * @param note
   * adds a new notes to the list,
   * raised summary change event and note list change event.
   */
  appendNoteToList(note: INote) {
    this.notes.push(note);
    this.summaryChangedEvent();
    this.raiseNotesChangedEvent();
  }

  /**
   * @param note
   * keeps track of the last updated note.
   */
  setLastUpdatedNote(note: INote) {
    this.lastUpdateNote = note;
  }

  /**
   * @param updateNote
   * updates the previous note.
   * raises summaryChanged event and note changed event.
   */
  updateNote(updateNote: INote) {
    const index = this.notes.findIndex((note: INote) => note.id === updateNote.id);
    this.notes[index] = updateNote;
    this.setLastUpdatedNote(updateNote);
    this.raiseNotesChangedEvent();
    this.summaryChangedEvent();
  }

  /**
   * sends info to summary page, only if atleast one note is created.
   */
  getSummary() {
    if (this.notes.length) {
      return {
        notesLength: this.notes.length,
        latestUpdateNote: this.lastUpdateNote
      };
    }
  }

  getNoteChangeEventSubscription() {
    return this.notesChangeEvent;
  }

  raiseNotesChangedEvent() {
    this.notesChangeEvent.next();
  }

  getSummaryChangedEvent() {
    return this.summaryUpdatedEvent;
  }

  summaryChangedEvent() {
    this.summaryUpdatedEvent.next();
  }

  getNoteClickedEvent() {
    return this.noteClickedEvent;
  }

  raiseNoteClickedEvent(note: INote) {
    this.noteClickedEvent.next(note);
  }

  /**
   * dummy note data for the form page to reset to once closed.
   */
  getDummyNoteData() {
    return {
      id: -1,
      Name: '',
      Created: new Date(),
      Updated: new Date(),
      Editable: false,
      Description: ''
    }
  }
}
