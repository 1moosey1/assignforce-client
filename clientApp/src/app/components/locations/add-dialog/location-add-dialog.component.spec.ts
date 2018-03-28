import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddDialogComponent } from './location-add-dialog.component';
// import {AppMaterialModule} from "app/app-material/app-material.module";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationAddDialogComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LocationAddDialogComponent]
      }).compileComponents();
    })
  );

  fit(
    'should create the component',
    async(() => {
      const fixture = TestBed.createComponent(LocationAddDialogComponent);
      const component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
    })
  );

  it(
    `should have as title 'Add location'`,
    async(() => {
      const fixture = TestBed.createComponent(LocationAddDialogComponent);
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('.mat-dialog-title');
      expect(el.textContent).toEqual('Add location');
    })
  );

  //   beforeEach(async(() => {
  //     TestBed.configureTestingModule({
  //       imports: [ AppMaterialModule, HttpClientTestingModule, BrowserAnimationsModule ],
  //       declarations: [ Loca ]
  //     })
  //       .compileComponents();
  //   }));

  //   beforeEach(() => {
  //     fixture = TestBed.createComponent(LocationsComponent);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });

  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
});
