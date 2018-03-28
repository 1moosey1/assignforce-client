import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Locations } from '../../model/locations';
import { Building } from '../../model/building';
import { Room } from '../../model/room';
import { LocationAddDialogComponent } from './add-dialog/location-add-dialog.component';
import { LocationDeleteDialogComponent } from './delete-dialog/location-delete-dialog.component';
import { LocationEditDialogComponent } from './edit-dialog/location-edit-dialog.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocationsComponent implements OnInit {
  expanded: boolean[] = [];
  locations = [
    {
      id: '13F',
      name: 'Revature HQ',
      city: 'Reaston',
      state: 'VA',
      buildings: [
        {
          name: 'Building 1',
          rooms: [
            {
              name: 'Room 101'
            },
            {
              name: 'Room 102'
            }
          ]
        },
        {
          name: 'Building 2',
          rooms: [
            {
              name: 'Room 201'
            },
            {
              name: 'Room 202'
            }
          ]
        }
      ]
    },
    {
      id: '13E',
      name: 'CUNY',
      city: 'New York',
      state: 'NY',
      buildings: [
        {
          name: 'SPS',
          rooms: [
            {
              name: 'Room 216'
            },
            {
              name: 'Room 220'
            }
          ]
        },
        {
          name: 'Queens College',
          rooms: [
            {
              name: 'Room 301'
            },
            {
              name: 'Room 302'
            }
          ]
        }
      ]
    }
  ];

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, public dialog: MatDialog) {
    for (const location of this.locations) {
      this.expanded[location.id] = false;
    }

    iconRegistry.addSvgIcon(
      'location',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_location_city_black_48px.svg')
    );
    iconRegistry.addSvgIcon(
      'building',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_business_black_48px.svg')
    );
    iconRegistry.addSvgIcon('room', sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_business_black_48px.svg'));
  }
  ngOnInit() {}
  collapseAll(id: any) {
    this.expanded[id] = !this.expanded[id];

    for (const location of this.locations) {
      if (location.id !== id) {
        this.expanded[location.id] = false;
      }
    }
  }
  addLocation(location: Locations) {
    // call service
  }
  updateLocation(location: Locations) {
    // call service
  }
  deleteLocation(location: Locations) {
    // call service
  }
  openAddLocationDialog(evt): void {
    evt.stopPropagation();
    const location: Locations = {
      id: '',
      name: '',
      city: '',
      state: '',
      buildings: []
    };
    const dialogRef = this.dialog.open(LocationAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'location',
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addLocation(result);
      }
    });
  }
  openDeleteLocationDialog(evt, location: Locations): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteDialogComponent, {
      width: '250px',
      data: {
        deleteType: 'location',
        location: location,
        name: location.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLocation(result);
      }
    });
  }
  openEditLocationDialog(evt, location: Locations): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditDialogComponent, {
      width: '450px',
      data: {
        editType: 'location',
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLocation(result);
      }
    });
  }
  openAddBuildingDialog(evt, location: Locations): void {
    evt.stopPropagation();
    const building: Building = {
      name: '',
      rooms: []
    };
    // const dialogRef = this.dialog.open(LocationAddBuildingDialogComponent, {
    const dialogRef = this.dialog.open(LocationAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'building',
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.buildings.push(result);
        this.updateLocation(location);
      }
    });
  }
  openDeleteBuildingDialog(evt, location: Locations, building: Building): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteDialogComponent, {
      width: '250px',
      data: {
        deleteType: 'building',
        building: building,
        name: building.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.buildings = location.buildings.filter(e => e !== result);
        this.updateLocation(location);
      }
    });
  }
  openEditBuildingDialog(evt, location: Locations, building: Building): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditDialogComponent, {
      width: '450px',
      data: {
        editType: 'building',
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLocation(location);
      }
    });
  }
  openAddRoomDialog(evt, location: Locations, building: Building): void {
    evt.stopPropagation();
    const room: Room = {
      name: ''
    };
    const dialogRef = this.dialog.open(LocationAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'room',
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        building.rooms.push(result);
        this.updateLocation(location);
      }
    });
  }
  openDeleteRoomDialog(evt, location: Locations, building: Building, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteDialogComponent, {
      width: '250px',
      data: {
        deleteType: 'room',
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        building.rooms = building.rooms.filter(e => e !== result);
        this.updateLocation(location);
      }
    });
  }
  openEditRoomDialog(evt, location: Locations, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditDialogComponent, {
      width: '450px',
      data: {
        editType: 'room',
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLocation(location);
      }
    });
  }
}
