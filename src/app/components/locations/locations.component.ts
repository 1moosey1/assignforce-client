import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Address } from '../../model/Address';
import { Building } from '../../model/Building';
import { Room } from '../../model/Room';
import { LocationsAddDialogComponent } from './add-dialog/locations-add-dialog.component';
import { LocationsDeleteDialogComponent } from './delete-dialog/locations-delete-dialog.component';
import { LocationsEditDialogComponent } from './edit-dialog/locations-edit-dialog.component';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../services/url/url.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';

class BuildingItem {
  building: Building;
  rooms: Room[];
}

class LocationItem {
  address: Address;
  buildings: BuildingItem[];
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocationsComponent implements OnInit {
  expanded: boolean[] = [];
  locations: LocationItem[] = [];
  loading = true;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private addressService: AddressControllerService,
    private buildingService: BuildingControllerService,
    private roomService: RoomControllerService
  ) {
    for (const location of this.locations) {
      this.expanded[location.address.id] = false;
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
    this.getLocations();
  }
  getLocations() {
    this.loading = true;
    this.locations = new Array<LocationItem>();
    let addressArr = new Array<Address>();
    let buildingArr = new Array<Building>();
    let roomArr = new Array<Room>();
    this.addressService
      .findAll()
      .toPromise()
      .then(addresses => {
        addressArr = addresses;
        this.buildingService
          .findAll()
          .toPromise()
          .then(buildings => {
            buildingArr = buildings;
            console.log('buildingArr: ');
            console.log(buildingArr);
            this.roomService
              .findAll()
              .toPromise()
              .then(rooms => {
                roomArr = rooms;
                console.log('roomsArr: ');
                console.log(roomArr);
                for (const address of addressArr) {
                  this.locations.push({
                    address: address,
                    buildings: new Array<BuildingItem>()
                  });
                } // locations initialized with address
                this.locations.forEach(value => {
                  buildingArr
                    .filter(value2 => {
                      return value2.address && value2.address.id === value.address.id;
                    })
                    .forEach(value2 => {
                      value.buildings.push({
                        building: value2,
                        rooms: roomArr.filter(value3 => {
                          return value3.building && value3.building.id === value2.id;
                        }) // building filled
                      }); // location filled
                    });
                });
                this.loading = false;
                console.log('this.locations: ');
                console.log(this.locations);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  collapseAll(id: any) {
    this.expanded[id] = !this.expanded[id];

    for (const location of this.locations) {
      if (location.address.id !== id) {
        this.expanded[location.address.id] = false;
      }
    }
  }
  addLocation(location: Address) {
    this.addressService
      .create(location)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateLocation(location: Address) {
    this.addressService
      .update(location)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  deleteLocation(location: Address) {
    this.addressService
      .remove(location.id)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  addBuilding(building: Building) {
    console.log(building);
    this.buildingService
      .create(building)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateBuilding(building: Building) {
    this.buildingService
      .update(building)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  deleteBuilding(building: Building) {
    this.buildingService
      .remove(building.id)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  addRoom(room: Room) {
    console.log(room);
    this.roomService
      .create(room)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateRoom(room: Room) {
    this.roomService
      .update(room)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  deleteRoom(room: Room) {
    this.roomService
      .remove(room.id)
      .toPromise()
      .then(resp => {
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }
  openAddLocationDialog(evt): void {
    evt.stopPropagation();
    const location: Address = {
      id: null,
      name: '',
      city: '',
      state: '',
      active: null
    };
    const dialogRef = this.dialog.open(LocationsAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'location',
        location: location
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(added => {
        if (added) {
          this.addLocation(added);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openDeleteLocationDialog(evt, location: Address): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationsDeleteDialogComponent, {
      width: '250px',
      data: {
        deleteType: 'location',
        location: location,
        name: location.name
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(deleted => {
        if (deleted) {
          this.deleteLocation(deleted);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openEditLocationDialog(evt, location: Address): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationsEditDialogComponent, {
      width: '450px',
      data: {
        editType: 'location',
        location: location
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(edited => {
        if (edited) {
          this.updateLocation(edited);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openAddBuildingDialog(evt, location: Address): void {
    evt.stopPropagation();
    const building: Building = {
      id: null,
      name: '',
      active: null,
      address: location,
      rooms: new Array<Room>()
    };
    const dialogRef = this.dialog.open(LocationsAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'building',
        building: building
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(added => {
        if (added) {
          this.addBuilding(added);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   // this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openDeleteBuildingDialog(evt, location: Address, building: Building): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationsDeleteDialogComponent, {
      width: '250px',
      data: {
        deleteType: 'building',
        building: building,
        name: building.name
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(deleted => {
        if (deleted) {
          this.deleteBuilding(deleted);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   // this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openEditBuildingDialog(evt, location: Address, building: Building): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationsEditDialogComponent, {
      width: '450px',
      data: {
        editType: 'building',
        building: building
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(edited => {
        if (edited) {
          this.updateBuilding(edited);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   // this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openAddRoomDialog(evt, location: Address, building: Building): void {
    evt.stopPropagation();
    const room = {
      roomName: ''
    };
    const dialogRef = this.dialog.open(LocationsAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'room',
        room: room
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(added => {
        if (added) {
          this.addRoom(added);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   // this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openDeleteRoomDialog(evt, location: Address, building: Building, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationsDeleteDialogComponent, {
      width: '250px',
      data: {
        deleteType: 'room',
        room: room
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(deleted => {
        if (deleted) {
          this.deleteRoom(deleted);
          // building.rooms = building.rooms.filter(e => e !== result);
          // this.updateLocation(location);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   // this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  openEditRoomDialog(evt, location: Address, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationsEditDialogComponent, {
      width: '450px',
      data: {
        editType: 'room',
        room: room
      }
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(edited => {
        if (edited) {
          this.updateRoom(edited);

          // this.addressService.findAll()
          // .toPromise()
          // .then(resp => {
          //   // this.locations = resp;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
