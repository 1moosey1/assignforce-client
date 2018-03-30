import { inject, async, fakeAsync, flushMicrotasks, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NgModule, Component, Directive, ViewChild, ViewContainerRef, Injector, Inject } from '@angular/core';

import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LocationAddDialogComponent } from './location-add-dialog.component';
import { AppMaterialModule } from '../../../app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  LocationAddDialogComponent, 
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, FormsModule, AppMaterialModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [LocationAddDialogComponent]
})
class LocationAddDialogTestModule {}

describe('LocationAddDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocationAddDialogTestModule],
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
        addType: 'location',
        location: {}
      }
    };
    dialog.open(LocationAddDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#title');
    const nameInput = overlayContainerElement.querySelector('#name-input');
    const cityInput = overlayContainerElement.querySelector('#city-input');
    const stateInput = overlayContainerElement.querySelector('#state-input');
    const okButton = overlayContainerElement.querySelector('#ok-button');
    const cancelButton = overlayContainerElement.querySelector('#cancel-button');
    
    expect(h2.textContent).toBe('Add Location');
    expect(nameInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(stateInput).toBeTruthy();
    expect(okButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it("should have correct content for 'Building'", () => {
    const config = {
      data: {
        addType: 'building',
        building: {}
      }
    };
    dialog.open(LocationAddDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#title');
    const nameInput = overlayContainerElement.querySelector('#name-input');
    const okButton = overlayContainerElement.querySelector('#ok-button');
    const cancelButton = overlayContainerElement.querySelector('#cancel-button');

    expect(h2.textContent).toBe('Add Building');
    expect(nameInput).toBeTruthy();
    expect(okButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it("should have correct content for 'Room'", () => {
    const config = {
      data: {
        addType: 'room',
        room: {}
      }
    };
    dialog.open(LocationAddDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#title');
    const nameInput = overlayContainerElement.querySelector('#name-input');
    const okButton = overlayContainerElement.querySelector('#ok-button');
    const cancelButton = overlayContainerElement.querySelector('#cancel-button');

    expect(h2.textContent).toBe('Add Room');
    expect(nameInput).toBeTruthy();
    expect(okButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

});