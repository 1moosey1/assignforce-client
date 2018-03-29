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

const TEST_DIRECTIVES = [LocationAddDialogComponent, NoopComponent];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [LocationAddDialogComponent]
})
class DialogTestModule {}

describe('LocationAddDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
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

  it("should have title as 'Location'", () => {
    const config = {
      width: '450px',
      data: {
        addType: 'location',
        location: null
      }
    };
    dialog.open(LocationAddDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const title = overlayContainerElement.querySelector('#title');
    expect(title.textContent).toBe('Add Location');
  });

  it("should have title as 'Building'", () => {
    const config = {
      width: '450px',
      data: {
        addType: 'building',
        building: null
      }
    };
    dialog.open(LocationAddDialogComponent, config);

    const title = overlayContainerElement.querySelector('#title');
    expect(title.textContent).toBe('Add Bulding');
  });

  it("should have title as 'Room'", () => {
    const config = {
      width: '450px',
      data: {
        addType: 'room',
        location: null
      }
    };
    dialog.open(LocationAddDialogComponent, config);

    const title = overlayContainerElement.querySelector('#title');
    expect(title.textContent).toBe('Add Room');
  });
});

// describe('LocationAddDialogComponent', () => {
//   let dialog: MatDialog;

//   beforeEach(
//     async(() => {
//       TestBed.configureTestingModule({
//         imports: [AppMaterialModule, FormsModule, BrowserAnimationsModule],
//         declarations: [LocationAddDialogComponent],
//         providers: [LocationAddDialogComponent],
//       }).compileComponents();
//     })
//   );

//   beforeEach(inject([MatDialog], (d: MatDialog) => {
//     dialog = d;
//   }));

//   fit(
//     'should create the component',
//     async(() => {

//       let dialogRef = dialog.open(LocationAddDialogComponent);

//       const fixture = TestBed.createComponent(LocationAddDialogComponent);
//       const component = fixture.debugElement.componentInstance;
//       expect(component).toBeTruthy();
//     })
//     // async(() => {
//     //   const fixture = TestBed.createComponent(LocationAddDialogComponent);
//     //   const component = fixture.debugElement.componentInstance;
//     //   expect(component).toBeTruthy();

//     // })
//   );

//   it(
//     `should have as title 'Add location'`,
//     async(() => {
//       const fixture = TestBed.createComponent(LocationAddDialogComponent);
//       fixture.detectChanges();
//       const el = fixture.nativeElement.querySelector('.mat-dialog-title');
//       expect(el.textContent).toEqual('Add location');
//     })
//   );

//   //   beforeEach(async(() => {
//   //     TestBed.configureTestingModule({
//   //       imports: [ AppMaterialModule, HttpClientTestingModule, BrowserAnimationsModule ],
//   //       declarations: [ Loca ]
//   //     })
//   //       .compileComponents();
//   //   }));

//   //   beforeEach(() => {
//   //     fixture = TestBed.createComponent(LocationsComponent);
//   //     component = fixture.componentInstance;
//   //     fixture.detectChanges();
//   //   });

//   //   it('should create', () => {
//   //     expect(component).toBeTruthy();
//   //   });
// });
