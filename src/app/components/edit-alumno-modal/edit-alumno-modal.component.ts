import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrService } from 'ngx-toastr';
import { alumnosOutput } from 'src/app/other/users';

@Component({
  selector: 'app-edit-alumno-modal',
  templateUrl: './edit-alumno-modal.component.html',
  styleUrls: ['./edit-alumno-modal.component.scss']
})

export class EditAlumnoModalComponent implements OnInit {
  isLoading: boolean = false;
  editForm: FormGroup;
  isSelected: boolean = false;
  bodyCopy: string = 'No se ha seleccionado ningún alumno aún';

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dialog:MatDialog, alumnos: alumnosOutput},
    private alumnoService: AlumnosService,
    private toastr: ToastrService
  ) {
    if (this.data.alumnos !== undefined && this.data.alumnos !== null) {
      console.log(this.data.alumnos);
      this.isSelected = true;
      this.bodyCopy = '';
    }
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'firstName': new FormControl({value: this.data.alumnos?.nombre || null || null, disabled: !this.isSelected}, [Validators.required]),
      'middleName': new FormControl({value: this.data.alumnos?.nombre || null || null, disabled: !this.isSelected}, [Validators.required]),
      'lastName': new FormControl({value: this.data.alumnos?.nombre || null || null, disabled: !this.isSelected}, [Validators.required]),
      'curso': new FormControl({value: this.data.alumnos?.curso || null, disabled: !this.isSelected}, [Validators.required])
    });
  }

  onSubmit() {
    this.isLoading = true;
    let alumno = this.editForm?.value;
  }

}
