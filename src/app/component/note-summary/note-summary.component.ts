import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NoteListManagerService } from 'src/app/service/note-list-manager.service';

@Component({
  selector: 'app-note-summary',
  templateUrl: './note-summary.component.html',
  styleUrls: ['./note-summary.component.scss']
})
export class NoteSummaryComponent implements OnInit, OnDestroy {
  @Output() summaryClosed = new EventEmitter<any>();
  updateSubscription;
  summary;
  constructor(private noteListManagerService: NoteListManagerService) { }

  ngOnInit() {
    this.setSummary();
    this.addListener();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  addListener() {
    this.updateSubscription = this.noteListManagerService.getSummaryChangedEvent().subscribe(() => this.setSummary());
  }

  setSummary() {
    this.summary = this.noteListManagerService.getSummary();
  }

  handleSummaryClose() {
    this.summaryClosed.emit();
  }
}
