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
        (cuotas: Cuota[]) => { // Ajusta el tipo de respuesta esperada a Cuota[]
          this.cuotas = cuotas;
          console.log('Registro exitoso', cuotas);
          // Aquí puedes hacer algo con la lista de cuotas, como mostrarla en la UI
        },
        error => {
          console.error('Error al registrar el cliente', error);
          // Aquí manejas errores, como mostrar un mensaje al usuario
        }
      );
    }
  }

}
