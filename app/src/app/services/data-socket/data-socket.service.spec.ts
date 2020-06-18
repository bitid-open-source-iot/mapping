import { TestBed } from '@angular/core/testing';

import { DataSocketService } from './data-socket.service';

describe('DataSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSocketService = TestBed.get(DataSocketService);
    expect(service).toBeTruthy();
  });
});
