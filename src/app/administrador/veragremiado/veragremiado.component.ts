import { PageOrientation } from './../../../../node_modules/@types/pdfmake/interfaces.d';
import { Component } from '@angular/core';
import { AgremiadoService } from 'src/app/agremiado.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditaragremiadoComponent } from '../editaragremiado/editaragremiado.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
interface Agremiado {
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
  agremiados: Agremiado[] = []; // Ajusta el tipo de datos según la estructura de tus agremiados


  constructor(private agremiado: AgremiadoService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAgremiados();
  }

  getAgremiados() {
    this.agremiado.getVerAagremido().subscribe(
      (data) => {
        this.agremiados = data; // Asigna los datos recibidos al arreglo agremiados
        console.log('Lista de Agremiados:', this.agremiados); // Muestra los datos en la consola
      },
      (error) => {
        console.error('Error al obtener agremiados:', error);
      }
    );
  }

  generatePDF(agremiados: any) {
    try {
      const documentDefinition = {
        PageOrientation: 'portrait', // Cambiado a orientación vertical
        content: [
          { text: 'Lista de Agremiados', style: 'header' },
          '\n\n',
          {
            table: {
              headerRows: 1,
              widths: [20, 50, 50, 40, 50, 30, 30, 30, 30, 40, 40, 20],
              body: [
                ['#ID', 'Apellido Paterno', 'Apellido Materno', 'Nombre(s)', 'Sexo', 'NUP', 'NUE', 'RFC', 'NSS', 'Fecha de Nacimiento', 'Telefono', 'Cuota'],
                ...agremiados.map((p: any) => [
                  p.id, p.a_paterno, p.a_materno, p.nombre, p.sexo, p.NUP, p.NUE, p.RFC, p.NSS, p.fecha_nacimiento, p.telefono, p.cuota
                ]),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 12,
            bold: true,
          },
        },
      };

      // Crear el PDF
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

      Swal.fire({
        icon: 'success',
        text: 'Solicitud enviada correctamente',
        showConfirmButton: true
      });

      // Descargar el PDF
      pdfDocGenerator.download('Lista_de_Agremiados.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Al generar el PDF',
        showConfirmButton: true
      });
    }
  }




  editarAgremiado(agremiado: Agremiado) {
    console.log('Agremiado a editar:', agremiado);
    // Abre el componente de edición en un cuadro de diálogo modal
    const dialogRef = this.dialog.open(EditaragremiadoComponent, {
      data: { agremiado } // Pasa el agremiado completo al componente de edición
    });

    // Suscríbete a cualquier acción realizada en el componente de edición
    dialogRef.afterClosed().subscribe(result => {
      // Puedes realizar acciones adicionales después de cerrar el componente de edición
      console.log('Resultado después de cerrar:', result);
      this.getAgremiados();
    });
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
            swalWithBootstrapButtons.fire(
              '¡Aceptado!',
              'Agremiado ha sido eliminado',
              'success'
            );
            this.getAgremiados();
          },
          (error) => {
            console.error('Error al eliminar agremiado:', error);
            Swal.fire('Error', 'Error al eliminar el agremiado', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Operación cuando se cancela
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Agremiado no eliminado',
          'error'
        );
      }
    });
  }

}
