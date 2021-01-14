import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { INote } from '../../interface/note.interface';
import constantValues from '../../utils/const';
import { MatSort } from '@angular/material/sort';
import { OrderStringByNamePipe } from '../../utils/tablefilter.pipe';
import { MatTableDataSource } from '@angular/material';
import { NoteListManagerService } from 'src/app/service/note-list-manager.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: any = [];
  noteChangeSubscriber;
  formData: INote;
  orderByNamePipe = new OrderStringByNamePipe();
  displayedColumns: string[] = ['title', 'created'];
  sortingOrder = constantValues.DESC;
  notes: INote[];
  formOpened: boolean = false;
  summaryOpened: boolean = false;

  constructor(private noteListManagerService: NoteListManagerService) {
  }

  ngOnInit() {
    this.fetchNoteAndSort();
    this.addListener();
  }

  addListener() {
    this.noteChangeSubscriber = this.noteListManagerService.getNoteChangeEventSubscription().subscribe(() => {
      let isNotesEmpty = false;
      if (!this.notes.length) {
        isNotesEmpty = true;
      }
      this.fetchNoteAndSort();
      if (isNotesEmpty) {
        setTimeout(() => {
          this.handleSortChange();
        })
      }
    });
  }

  ngAfterViewInit() {
    this.handleSortChange();
  }

  handleSortChange() {
    if (this.sort) {
      this.sort.sortChange.subscribe(() => this.sortTable());
    }
  }

  fetchNoteAndSort() {
    this.notes = this.noteListManagerService.getNotes();
    this.sortTable();
  }

  sortTable() {
    const orderedNotes = this.orderByNamePipe.transform(this.notes, (this.sort && this.sort.direction) || 'desc');
    this.dataSource = new MatTableDataSource(orderedNotes);
  }

  toggleFormOpenedFlag() {
    this.formOpened = !this.formOpened;
    if (!this.formOpened) {
      this.turnOffFormOpenedFlag();
    } else {
      this.setDummyDataInForm();
    }
  }

  setDummyDataInForm() {
    const dummyData: INote = this.noteListManagerService.getDummyNoteData();
    this.noteListManagerService.raiseNoteClickedEvent(dummyData);
  }

  turnOffFormOpenedFlag() {
    this.formOpened = false;
    this.setDummyDataInForm();
  }

  toggleSummaryFlag() {
    this.summaryOpened = !this.summaryOpened;
  }

  closeSummary() {
    this.summaryOpened = false;
  }

  handleRowClick(row) {
    console.log('row ', row);
    if (this.formOpened) {
      this.noteListManagerService.raiseNoteClickedEvent(row);
      return;
    }
    this.formOpened = true;
    setTimeout(() => {
      this.noteListManagerService.raiseNoteClickedEvent(row);
    });
  }

  ngOnDestroy() {
    this.noteChangeSubscriber.unsubscribe();
  }
}
