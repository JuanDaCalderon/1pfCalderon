import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-alumno-modal',
  templateUrl: './add-alumno-modal.component.html',
  styleUrls: ['./add-alumno-modal.component.scss']
})
export class AddAlumnoModalComponent implements OnInit {
  isLoading: boolean = false;
  addForm: FormGroup;

  constructor (
    public dialogRef: MatDialogRef<AddAlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private alumnoService: AlumnosService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'middleName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'curso': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.isLoading = true;
    let alumno = this.addForm?.value;
    this.alumnoService.postAlumno(alumno)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Refresca la tabla de alumnos para ver el nuevo registro', 'Alumno Agregado');
          this.isLoading = false;
          this.addForm.reset();
          this.dialogRef.close();
        },
        error: (error) => {
          this.toastr.error(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

}
