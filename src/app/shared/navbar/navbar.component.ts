import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/app/interfaces/room.interface';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

// Redux
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as fromActions from '../../store/actions'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  // User
  user: IUser = null;
  loadingUser: boolean;
  errorUser: any;

  rooms: IRoom[];
  loadedRooms: boolean;
  loadingRooms: boolean;
  errorRooms: any = null;

  currentRoom: IRoom;

  constructor( public authService: AuthService,
               private store: Store<AppState>,
               public chatService: ChatService) { }

  ngOnInit() {
    this.initUserSub();
    this.initRoomsSub();
    this.store.select('currentRoom')
      .subscribe( currentRoom => {
        this.currentRoom = currentRoom.room;
      })
  }

  
  getRooms() {
    if (this.loadedRooms) {
      return;
    }
    this.store.dispatch( new fromActions.ListenToRoomsAction() );
    this.store.dispatch( new fromActions.LoadRoomsAction());
  }

  changeRoom(room_id: string) {
    if (room_id === this.currentRoom._id) {
      return;
    }    
    this.store.dispatch( new fromActions.SetRoomAction(room_id));
  }

  removeRoom( room: IRoom ) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la sala ${ room.name }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#745AF2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.chatService.deleteRoom( room._id )
          .subscribe( (res: any) => {
            if (res.ok) {
              Swal.fire({
                title: 'Sala eliminada',
                text: `Se eliminó la sala con nombre ${ res.room.name }`,
                icon: 'success'
              })
            } else {
              this.swalError(res.err)
            }
          })
      }
    })
  }
  
  showNewRoom() {
    Swal.mixin({
      confirmButtonColor: '#745AF2',
      confirmButtonText: 'Siguiente &rarr;',     
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Nombre (*)',
        text: 'Todas las salas son públicas',
        input: 'text',
      },
      {
        title: 'Descripción (opcional)',
        text: 'Todas las salas son públicas',
        input: 'textarea',
        confirmButtonText: 'Confirmar'
      }
    ]).then((result) => {
      if (result.value) {
        if(result.value[0] == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Error al crear',
            text: 'El nombre es obligatorio!',
          })
        } else {
          this.newRoom(result.value);
        }
      }
    })
  }

  
  //===============================================
  //                   PRIVATE
  //===============================================
  private initUserSub() {
    this.store.select('user')
      .subscribe( user => {
        this.user = user.user;
        this.loadingUser = user.loading;
        this.errorUser = user.error;
      }) 
  }

  
  private initRoomsSub() {
    this.store.select('rooms').pipe(
      filter( rooms => rooms.loaded)
    ).subscribe( rooms => {
      this.loadingRooms = rooms.loading;
      this.rooms = rooms.rooms;
      this.errorRooms = rooms.error;
      this.loadedRooms = rooms.loaded;
      if ( rooms.rooms.indexOf(this.currentRoom) < 0 ) {
        this.changeRoom( rooms.rooms[0]._id );
      }
    })
  }
  

  private newRoom( data: string[] ) {
    let newRoom;
    if (data[1] == '') {
      newRoom = { name: data[0], email: this.user.email };
    } else {
      newRoom = { name: data[0], email: this.user.email, description: data[1]}
    }
    this.chatService.newRoom(newRoom)
      .subscribe( (res: any) => {
        if (res.ok) {
          this.swalCreatedRoom(res.room);
        } else {
          this.swalError(res.err);
        }
      })    
  }

  //===============================================
  //                  SWEET ALERT
  //===============================================
  swalError(err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal!',
      text: err.message,
    })
  }
  
  
  swalCreatedRoom( room: IRoom ) {
    Swal.fire({
      title: 'Sala creada',
      text: `Se creó la sala con nombre ${ room.name }`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#745AF2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ir a la sala',
      cancelButtonText: 'Más tarde'
    }).then((result) => {
      if (result.value) {
        this.changeRoom( room._id );
      }
    })
  }
}
