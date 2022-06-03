import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { alumnosOutput } from 'src/app/other/users';

import { AddAlumnoModalComponent } from '../add-alumno-modal/add-alumno-modal.component';
import { EditAlumnoModalComponent } from '../edit-alumno-modal/edit-alumno-modal.component';
import { DeleteAlumnoModalComponent } from '../delete-alumno-modal/delete-alumno-modal.component';

import { MatTable } from '@angular/material/table';
import { AlumnosService } from 'src/app/services/alumnos.service';

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
  @ViewChild('alumnosTable') alumnosTable: MatTable<Element>;

  getAlumnosData() {
    this.alumnoService.getAlumnos().subscribe(response => {
      this.data = response;
    })
  }

  constructor(private alumnoService: AlumnosService, public dialog: MatDialog) {
    this.getAlumnosData();
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
    return `${this.selection.isSelected(row) ? 'selected' : 'noSelected'} ${row.id}`;
  }

  openAddDialog() {
    this.dialog.open(AddAlumnoModalComponent, {
      width: '600px',
      data: this.dialog,
    });
  }

  openEditDialog() {
    let alumnoEdit = null;
    if (this.selection.selected[0] !== undefined && this.selection.selected[0] !== null) {
      let fullName = this.selection.selected[0].nombre.split(' ');
      alumnoEdit = {
        id: this.selection.selected[0].id,
        firstName: fullName[0],
        middleName: fullName[1],
        lastName: fullName[2],
        curso: this.selection.selected[0].curso,
      }
    }
    this.dialog.open(EditAlumnoModalComponent, {
      width: '600px',
      data: {dialog: this.dialog, alumnos: alumnoEdit},
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteAlumnoModalComponent, {
      width: '400px',
      data: {dialog: this.dialog, alumnos: this.selection.selected},
    });
  }

  refrescarAlumnos() {
    this.data = [];
    this.getAlumnosData();
    this.alumnosTable.renderRows();
  }
}
