import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuota } from 'src/app/domain/cuota';
import { Solicitud } from 'src/app/domain/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  signUpForm: FormGroup;
  cuotas: Cuota[] = [];

  constructor(private formBuilder: FormBuilder, private solicitudServices: SolicitudService){
    this.signUpForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(0)]],
      meses: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const solicitud: Solicitud = this.signUpForm.value;
      this.solicitudServices.agregarSolicitud(solicitud).subscribe(
        response => {
          console.log('Registro exitoso', response);
          this.cuotas = response;
          alert('Registro exitoso')
        },
        error => {
          console.error('Error al registrar el cliente', error);
          // Aquí puedes manejar errores, como mostrar un mensaje al usuario
        }
      );
    }
  }

}
