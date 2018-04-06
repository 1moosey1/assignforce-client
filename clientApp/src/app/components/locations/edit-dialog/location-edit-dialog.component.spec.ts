import { inject, async, fakeAsync, flushMicrotasks, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NgModule, Component, Directive, ViewChild, ViewContainerRef, Injector, Inject } from '@angular/core';

import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LocationEditDialogComponent } from './location-edit-dialog.component';
import { AppMaterialModule } from '../../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [LocationEditDialogComponent, NoopComponent];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, FormsModule, AppMaterialModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [LocationEditDialogComponent]
})
class LocationEditDialogTestModule {}

describe('LocationEditDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocationEditDialogTestModule],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);
  });

  it("should have correct content for 'Location'", () => {
    const config = {
      data: {
        editType: 'location',
        location: {}
      }
    };
    dialog.open(LocationEditDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#title');
    const okButton = overlayContainerElement.querySelector('#ok-button');
    const cancelButton = overlayContainerElement.querySelector('#cancel-button');

    expect(h2.textContent).toBe('Edit Location');
    // expect(h2).toBeTruthy();
    expect(okButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it("should have correct content for 'Building'", () => {
    const config = {
      data: {
        editType: 'building',
        building: {}
      }
    };
    dialog.open(LocationEditDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#title');
    const okButton = overlayContainerElement.querySelector('#ok-button');
    const cancelButton = overlayContainerElement.querySelector('#cancel-button');

    expect(h2.textContent).toBe('Edit Building');
    expect(okButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it("should have correct content for 'Room'", () => {
    const config = {
      data: {
        editType: 'room',
        room: {}
      }
    };
    dialog.open(LocationEditDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#title');
    const okButton = overlayContainerElement.querySelector('#ok-button');
    const cancelButton = overlayContainerElement.querySelector('#cancel-button');

    expect(h2.textContent).toBe('Edit Room');
    expect(okButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });
});
