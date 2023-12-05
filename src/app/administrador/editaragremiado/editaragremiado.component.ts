import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AgremiadoService } from 'src/app/agremiado.service';
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
  agremiadoForm: FormGroup;

  constructor(private fb: FormBuilder, private tuServicio: AgremiadoService) {
    this.agremiadoForm = this.fb.group({
      a_paterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      a_materno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      sexo: ['', Validators.required],
      NUP: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      RFC: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      NSS: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      cuota: [false, Validators.required] // Establecí un valor por defecto (puedes ajustarlo según tus necesidades)
    });
  }

  ngOnInit(): void {
    console.log("Agremiado recibido:", this.agremiado);
    if (this.agremiado && this.agremiado.id) {
      this.tuServicio.obtenerAgremiadoPorId(this.agremiado.id).subscribe(
        (data) => {
          console.log("Datos del agremiado:", data);
          if (data) {
            this.agremiadoForm.patchValue(data);
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

    // Verifica si hay un agremiado antes de intentar actualizarlo
    if (this.agremiado && this.agremiado.id) {
      this.tuServicio.actualizarAgremiado(this.agremiado.id, datosActualizados).subscribe(
        response => {
          console.log('Agremiado actualizado correctamente', response);
          // Puedes realizar acciones adicionales después de la actualización si es necesario
        },
        error => {
          console.error('Error al actualizar agremiado', error);
          // Manejar el error si es necesario
        }
      );
    } else {
      console.error('No se proporcionó un agremiado válido para actualizar.');
    }
  }
}
