import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMaterialModule } from '../../../material.module';
import { Location } from '../../../model/Location';

@Component({
  selector: 'app-location-add-dialog',
  templateUrl: './location-add-dialog.component.html'
})
export class LocationAddDialogComponent implements OnInit {
  addType: string;
  typeContent;
  // dialogContent;

  constructor(public dialogRef: MatDialogRef<LocationAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

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
          this.typeContent.location = this.data.location;
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
