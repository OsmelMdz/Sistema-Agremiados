import { Component } from '@angular/core';
import { AgremiadoService } from 'src/app/agremiado.service';
import Swal from 'sweetalert2';

interface Curso {
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
  selector: 'app-veragremiado',
  templateUrl: './veragremiado.component.html',
  styleUrls: ['./veragremiado.component.css']
})
export class VeragremiadoComponent { 
  agremiados: any[] = []; // Ajusta el tipo de datos según la estructura de tus agremiados


  

  constructor(private agremiado: AgremiadoService) {}

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
  

  editarAgremiado(agremiado: any) {
    // Agrega lógica para editar un agremiado
    console.log('Editar agremiado:', agremiado);
  }

  eliminarAgremiado(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: '¿Deseas eliminar agremiados?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.agremiado.eliminarAgremiado(id).subscribe(
          (res: any) => {
            console.log('Agremiado eliminado:', res);
            // Recargar los datos después de la eliminación
            this.getAgremiados();
            // Aquí puedes realizar acciones adicionales después de la eliminación
            swalWithBootstrapButtons.fire(
              '¡Aceptado!',
              'Agremiado ha sido eliminado',
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar agremiado:', error);
            // Puedes manejar el error aquí, por ejemplo, mostrando una alerta con SweetAlert
            Swal.fire('Error', 'Error al eliminar el agremiado', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Operación cuando se cancela
      }
    });
  }

}