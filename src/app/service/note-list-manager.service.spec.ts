import { TestBed } from '@angular/core/testing';

import { NoteListManagerService } from './note-list-manager.service';

describe('NoteListManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteListManagerService = TestBed.get(NoteListManagerService);
    expect(service).toBeTruthy();
  });
});
