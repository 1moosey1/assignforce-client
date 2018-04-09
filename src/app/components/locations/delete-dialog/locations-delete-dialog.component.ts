import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-locations-delete-dialog',
  templateUrl: './locations-delete-dialog.component.html'
})
export class LocationsDeleteDialogComponent implements OnInit {
  deleteType: string;
  typeContent;

  constructor(
    public dialogRef: MatDialogRef<LocationsDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.deleteType = this.data.deleteType;
    switch (this.data.deleteType) {
      case 'location':
        {
          this.typeContent = this.data.location.name;
        }
        break;
      case 'building':
        {
          this.typeContent = this.data.building.name;
        }
        break;
      case 'room':
        {
          this.typeContent = this.data.room.name;
        }
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
