import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  constructor(private rou: Router, private authS: LoginService) { }

  logOut() {
    this.authS.logOut();
  }

  confirmarAlert() {
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
     icon: 'warning',
    showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, do it!'
   }).then((result) => {
    if (result.isConfirmed) {
        this.logOut();
        Swal.fire(
          'Logged Out!',
          'You have been logged out successfully.',
          'success'
        );
    }
  });
  }

}
