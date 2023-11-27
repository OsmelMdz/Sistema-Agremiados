import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AgremiadoService } from 'src/app/agremiado.service';

@Component({
  selector: 'app-agremiado',
  templateUrl: './agremiado.component.html',
  styleUrls: ['./agremiado.component.css']
})
export class AgremiadoComponent {
  agremiadoForm: FormGroup;
  


  constructor(private fb: FormBuilder, private tuServicio: AgremiadoService) {
    this.agremiadoForm = this.fb.group({
      a_paterno: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      a_materno: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      nombre: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      sexo: ['', Validators.required],
      NUP: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),]],
      NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),]],
      RFC: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13),]],
      NSS: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11),]],
      fecha_nacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),]],
      cuota: ['', Validators.required]
    });
  }

  agregarAgremiado() {
    const datosNuevoAgremiado = this.agremiadoForm.value;

    this.tuServicio.agregarAgremiado2(datosNuevoAgremiado).subscribe(
      response => {
        console.log('Agremiado agregado correctamente', response);
        // Recargar la página después de agregar el agremiado
        location.reload();
      },
      error => {
        console.error('Error al agregar agremiado', error);
        // Manejar el error si es necesario
      }
    );
  }

 
}