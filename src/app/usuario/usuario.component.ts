import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AgremiadoService } from '../agremiado.service';
import { SolicitudService } from '../solicitud.service';
interface Usuario {
  id: number;
  a_paterno: string;
  a_materno: string;
  nombre: string;
  sexo: string;
  NUP: string;
  NUE: string;
  RFC: string;
  NSS: string;
  fecha_nacimiento: Date,
  telefono: string;
  cuota: boolean;
}
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  agremiados: any[] = []; // Ajusta el tipo de datos según la estructura de tus agremiados
  nuevaSolicitud: any = {
    NUE: '',
    nombre_archivo: '',
    fecha_subida: '',
    archivo: '' // Inicializa como null
  };
  selectedFile: File | undefined;


  constructor(private rou: Router, private authS: LoginService,private agremiado: AgremiadoService, private solic: SolicitudService) { }

  ngOnInit() {
    this.getAgremiados();
  }

  getAgremiados() {
    this.agremiado.getVerAagremido().subscribe(
      (data) => {
        this.agremiados = data; // Asigna los datos recibidos al arreglo agremiados
        console.log('Datos obtenidos:', this.agremiados); // Muestra los datos en la consola
      },
      (error) => {
        console.error('Error al obtener agremiados:', error);
      }
    );
  }

  agregarSolicitud() {
    // Asegúrate de que hay un archivo seleccionado
    if (this.selectedFile) {
      // Crear un objeto FormData para enviar datos y archivos juntos
      const formData = new FormData();
      formData.append('NUE', this.nuevaSolicitud.NUE);
      formData.append('nombre_archivo', this.nuevaSolicitud.nombre_archivo);
      formData.append('fecha_subida', this.nuevaSolicitud.fecha_subida);
      formData.append('archivo', this.selectedFile);

      // Lógica para enviar la solicitud al servicio
      this.solic.agregarSolicitud(formData).subscribe(
        (response) => {
          console.log('Solicitud agregada exitosamente:', response);
          Swal.fire({
            icon: 'success',
            text: 'Solicitud agregada exitosamente',
            showConfirmButton: true
          });
          //resetear el formulario
          this.nuevaSolicitud = {
            NUE: '',
            nombre_archivo: '',
            fecha_subida: '',
            archivo: null
          };
          // Realizar cualquier acción adicional después de agregar la solicitud
        },
        (error) => {
          console.error('Error al agregar la solicitud:', error);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Al agregar la solicitud',
            showConfirmButton: true
          });
          //resetear el formulario
          this.nuevaSolicitud = {
            NUE: '',
            nombre_archivo: '',
            fecha_subida: '',
            archivo: null
          };
        }
      );
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

  onFileSelected(event: any) {
    // Lógica para manejar la selección de archivos
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    } else {
      console.error('No se ha seleccionado ningún archivo.');
      this.selectedFile = undefined; // Asegúrate de establecerlo como undefined si no hay archivos seleccionados
    }
  }

  logOut() {
    this.authS.logOut();
  }

  confirmarAlert() {
    Swal.fire({
    title: 'Deseas Cerrar Sesión?',
     icon: 'warning',
    showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
     confirmButtonText: 'Si'
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
