import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-edit-dialog',
  templateUrl: './location-edit-dialog.component.html'
})
export class LocationEditDialogComponent {
  editType: string;
  typeContent;

  constructor(public dialogRef: MatDialogRef<LocationEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.editType = this.data.editType;
    switch (this.data.editType) {
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
