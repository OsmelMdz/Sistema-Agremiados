import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgremiadoService } from 'src/app/agremiado.service';
import { LoginService } from 'src/app/login.service';
import { SolicitudService } from 'src/app/solicitud.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  agremiados: any[] = [];
  nuevaSolicitud: any = {
    NUE: '',
    nombre_archivo: '',
    fecha_subida: '',
    archivo: '' // Inicializa como null
  };
  selectedFile: File | undefined;

  constructor(private router: Router, private authS: LoginService,private agremiado: AgremiadoService, private solic: SolicitudService) { }

  ngOnInit() {
    this.getAgremiados();
  }

  getAgremiados() {
    this.agremiado.getVerAdmin().subscribe(
      (data) => {
        this.agremiados = data; // Asigna los datos recibidos al arreglo agremiados
        console.log('Datos obtenidos:', this.agremiados); // Muestra los datos en la consola
      },
      (error) => {
        console.error('Error al obtener agremiados:', error);
      }
    );
  }


}

