import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { alumnosOutput } from 'src/app/other/users';
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

  constructor(private alumoService: AlumnosService) {
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: alumnosOutput): string {
    if (!row) {
      return `${this.isAllSelected() ? 'selected' : 'noSelected'} all`;
    }
    return `${this.selection.isSelected(row) ? 'selected' : 'noSelected'} row ${row.id}`;
  }
}
