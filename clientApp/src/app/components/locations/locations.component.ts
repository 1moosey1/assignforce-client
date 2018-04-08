import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Location } from '../../model/Location';
import { Building } from '../../model/Building';
import { Room } from '../../model/Room';
import { LocationAddDialogComponent } from './add-dialog/location-add-dialog.component';
import { LocationDeleteDialogComponent } from './delete-dialog/location-delete-dialog.component';
import { LocationEditDialogComponent } from './edit-dialog/location-edit-dialog.component';
import { HttpClient } from '@angular/common/http';
import { BatchLocation } from '../../model/BatchLocation';
import { UrlService } from '../../services/url/url.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocationsComponent implements OnInit {
  expanded: boolean[] = [];
  locations: Location[] = [];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private addressService: AddressControllerService
  ) {
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
  ngOnInit() {
    this.addressService.getAllLocations().subscribe(resp => {
      this.locations = resp;
    });
  }
  collapseAll(id: any) {
    this.expanded[id] = !this.expanded[id];

    for (const location of this.locations) {
      if (location.id !== id) {
        this.expanded[location.id] = false;
      }
    }
  }
  addLocation(location: Location) {
    // call service
    this.addressService.createLocation(location);
  }
  updateLocation(location: Location) {
    // call service
    this.addressService.updateLocation(location);
  }
  deleteLocation(location: Location) {
    // call service
    this.addressService.removeLocations(location);
  }
  openAddLocationDialog(evt): void {
    evt.stopPropagation();
    const location = {
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
        const added: Location = {
          id: null,
          name: result.name,
          city: result.city,
          state: result.state,
          active: null,
          buildings: new Array<Building>()
        };

        // testing
        console.log(added);
        this.locations.push(added);

        this.addLocation(added);

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openDeleteLocationDialog(evt, location: Location): void {
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
        const deleted: Location = {
          id: result.id,
          name: result.name,
          city: result.city,
          state: result.state,
          active: result.active,
          buildings: result.buildings
        };

        this.deleteLocation(deleted);

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openEditLocationDialog(evt, location: Location): void {
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
        const edited: Location = {
          id: result.id,
          name: result.name,
          city: result.city,
          state: result.state,
          active: result.active,
          buildings: result.buildings
        };

        this.updateLocation(edited);

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openAddBuildingDialog(evt, location: Location): void {
    evt.stopPropagation();
    const building = {
      name: '',
      rooms: []
    };
    const dialogRef = this.dialog.open(LocationAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'building',
        building: building,
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const added: Building = {
          id: result.id,
          name: result.name,
          active: null,
          location: result.location,
          rooms: new Array<Room>()
        };

        location.buildings.push(added);
        this.updateLocation(location);

        // testing
        console.log(added);

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openDeleteBuildingDialog(evt, location: Location, building: Building): void {
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

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openEditBuildingDialog(evt, location: Location, building: Building): void {
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

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openAddRoomDialog(evt, location: Location, building: Building): void {
    evt.stopPropagation();
    const room = {
      roomName: ''
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

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openDeleteRoomDialog(evt, location: Location, building: Building, room: Room): void {
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

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
  openEditRoomDialog(evt, location: Location, room: Room): void {
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

        this.addressService.getAllLocations().subscribe(resp => {
          this.locations = resp;
        });
      }
    });
  }
}
