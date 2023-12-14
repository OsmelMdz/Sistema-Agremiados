import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import { AgremiadoService } from '../agremiado.service';
import { SolicitudService } from '../solicitud.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  agremiados: any[] = [];
  nuevaSolicitud: any = {
    NUE: '',
    nombre_archivo: '',
    fecha_subida: '',
    archivo: null
  };
  selectedFile: File | undefined;
  solicitudForm!: FormGroup;

  constructor(private rou: Router, private auth: AuthService, private authS: LoginService,
    private agremiado: AgremiadoService, private solic: SolicitudService, private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      NUE: ['', Validators.required],
      archivo: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getAgremiados();
  }

  getAgremiados() {
    const idUsuarioLogeado = this.auth.getUser().id;
    this.agremiado.getVerAagremido().subscribe(
      (data) => {
        this.agremiados = data.filter((agremiado: { id: any; }) => agremiado.id === idUsuarioLogeado);
        console.log('Datos obtenidos del usuario logeado:', this.agremiados);
      },
      (error) => {
        console.error('Error al obtener agremiados:', error);
      }
    );
  }

  async agregarSolicitud() {
    if (this.solicitudForm.valid) {
      const formData = new FormData();
      formData.append('NUE', this.solicitudForm.get('NUE')!.value);
      formData.append('archivo', this.solicitudForm.get('archivo')!.value);
      try {
        const response = await this.solic.agregarSolicitud(formData).toPromise();
        console.log('Solicitud agregada exitosamente:', response);
        Swal.fire({
          icon: 'success',
          text: 'Solicitud agregada exitosamente',
          showConfirmButton: true
        });
      } catch (error) {
        console.error('Error al agregar la solicitud:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Al agregar la solicitud',
          showConfirmButton: true
        });
      } finally {
        this.nuevaSolicitud = {
          NUE: '',
          nombre_archivo: '',
          fecha_subida: '',
          archivo: null
        };
        this.selectedFile = undefined;
        this.solicitudForm.reset(); // También puedes usar reset para reiniciar el formulario
      }
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.solicitudForm.patchValue({
        archivo: file,
      });
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
          'Cerrando Sesión',
          'Has cerrado tu sesión correctamente.',
          'success'
        );
      }
    });
  }
}
