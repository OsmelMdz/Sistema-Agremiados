import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  solicitudes: any[] = []; // Ajusta el tipo de datos según la estructura de tus solicitudes

  constructor(private solic: SolicitudService,
    ) {}

  ngOnInit() {
    this.getsolicitud();
  }

  getsolicitud() {
    this.solic.getVersolicitud().subscribe(
      (data) => {
        this.solicitudes = data; // Asigna los datos recibidos al arreglo agremiados
        console.log('Datos obtenidos:', this.solicitudes); // Muestra los datos en la consola
      },
      (error) => {
        console.error('Error al obtener solicitud:', error);
      }
    );
  }

  descargarArchivo(nombreArchivo: string): void {
    console.log(nombreArchivo);
    this.solic.descargarArchivo(nombreArchivo).subscribe(
      (blob: Blob) => {
        console.log(nombreArchivo);
        console.log('Blob:', blob); // Muestra los datos en la consola
        // Crea un objeto URL para el blob y lo utiliza para abrir una nueva ventana o pestaña
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url); // Libera recursos
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
        // Maneja el error según sea necesario
      }
    );
  }



}
