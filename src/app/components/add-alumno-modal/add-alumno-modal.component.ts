import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-alumno-modal',
  templateUrl: './add-alumno-modal.component.html',
  styleUrls: ['./add-alumno-modal.component.scss']
})
export class AddAlumnoModalComponent implements OnInit {
  isLoading: boolean = false;
  addForm: FormGroup;

  constructor() { }

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
    console.log(this.addForm?.value);
  }

}
