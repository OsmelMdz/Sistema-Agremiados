import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AgremiadoService } from 'src/app/agremiado.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
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
  fecha_nacimiento: Date;
  telefono: string;
  cuota: boolean;
}

@Component({
  selector: 'app-editaragremiado',
  templateUrl: './editaragremiado.component.html',
  styleUrls: ['./editaragremiado.component.css']
})
export class EditaragremiadoComponent {
  @Input() agremiado!: Agremiado; // Asegúrate de utilizar el tipo correcto (Agremiado) en lugar de any
  agremiadoForm!: FormGroup;

  constructor(private fb: FormBuilder, private tuServicio: AgremiadoService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.agremiado) {
      this.agremiadoForm = this.fb.group({
        a_paterno: [data.agremiado.a_paterno, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        a_materno: [data.agremiado.a_materno, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        nombre: [data.agremiado.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        sexo: [data.agremiado.sexo, Validators.required],
        NUP: [data.agremiado.NUP, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        NUE: [data.agremiado.NUE, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        RFC: [data.agremiado.RFC, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
        NSS: [data.agremiado.NSS, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        fecha_nacimiento: [data.agremiado.fecha_nacimiento, Validators.required],
        telefono: [data.agremiado.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        cuota: [data.agremiado.cuota, Validators.required]
      });
    } else {
      console.error('No se proporcionó un agremiado válido para editar.');
    }
  }

  ngOnInit(): void {
    console.log('Agremiado recibido en ngOnInit:', this.data.agremiado);

    // Verifica si agremiado y agremiado.id están definidos antes de realizar la lógica
    if (this.data.agremiado && this.data.agremiado.id) {
      this.tuServicio.obtenerAgremiadoPorId(this.data.agremiado.id).subscribe(
        (data) => {
          console.log("Datos del agremiado:", this.data.agremiado.id);
          if (this.data.agremiado.id) {
            this.agremiadoForm.patchValue(this.data.agremiado.id);
          } else {
            console.error('Datos del agremiado no válidos.');
          }
        },
        (error) => {
          console.error("Error al obtener datos del agremiado:", error);
        }
      );
    } else {
      console.error('No se proporcionó un agremiado válido para editar.');
    }
  }


  actualizarAgremiado() {
    const datosActualizados = this.agremiadoForm.value;
    this.tuServicio.actualizarAgremiado(this.data.agremiado.id, datosActualizados).subscribe(
      response => {
        console.log('Agremiado actualizado correctamente', response);
        Swal.fire({
          icon: 'success',
          text: 'Agremiado actualizado correctamente',
          showConfirmButton: true
        });
        location.reload();
      },
      error => {
        console.error('Error al actualizar agremiado', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Al actualizar agremiado',
          showConfirmButton: true
        });
      }

    );
  }
}
