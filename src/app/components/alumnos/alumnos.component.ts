import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { alumnosOutput } from 'src/app/other/users';

import { AddAlumnoModalComponent } from '../add-alumno-modal/add-alumno-modal.component';
import { EditAlumnoModalComponent } from '../edit-alumno-modal/edit-alumno-modal.component';
import { DeleteAlumnoModalComponent } from '../delete-alumno-modal/delete-alumno-modal.component';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlumnosComponent implements OnInit {
  titulo: string = 'Alumnos';
  data: alumnosOutput[] = [];
  columnsToDisplay: string[] = ['select', 'id', 'nombre', 'curso', 'clases', 'avatar'];
  selection = new SelectionModel<alumnosOutput>(true, []);

  constructor(private alumoService: AlumnosService, public dialog: MatDialog) {
    this.alumoService.getAlumnos().subscribe(response => {
      this.data = response;
      console.log(this.data);
    })
  }

  ngOnInit(): void { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.data);
  }

  checkboxLabel(row?: alumnosOutput): string {
    if (!row) {
      return `${this.isAllSelected() ? 'selected' : 'noSelected'} all`;
    }
    return `${this.selection.isSelected(row) ? 'selected' : 'noSelected'} row ${row.id}`;
  }

  openAddDialog() {
    this.dialog.open(AddAlumnoModalComponent,{
      width: '600px'
    });
  }

  openEditDialog() {
    this.dialog.open(EditAlumnoModalComponent);
  }

  openDeleteDialog() {
    this.dialog.open(DeleteAlumnoModalComponent);
  }
}
