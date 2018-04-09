import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMaterialModule } from '../../../material.module';
import { Address } from '../../../model/Address';

@Component({
  selector: 'app-locations-add-dialog',
  templateUrl: './locations-add-dialog.component.html'
})
export class LocationsAddDialogComponent implements OnInit {
  addType: string;
  typeContent;

  constructor(public dialogRef: MatDialogRef<LocationsAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.addType = this.data.addType;
    switch (this.data.addType) {
      case 'location':
        {
          this.typeContent = this.data.location;
        }
        break;
      case 'building':
        {
          this.typeContent = this.data.building;
        }
        break;
      case 'room':
        {
          this.typeContent = this.data.room;
        }
        break;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
