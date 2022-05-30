import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { alumnosOutput } from 'src/app/other/users';
import { MatTableDataSource } from '@angular/material/table';
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
  ELEMENT_DATA:any[] = [
    {id: '1', nombre: 'pepe', curso: 2, clases: [1], avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/104.jpg'}
  ];
  dataSource = new MatTableDataSource<alumnosOutput>(this.ELEMENT_DATA);
  columns = [
    {
      columnDef: 'id',
      header: 'id.',
      cell: (element: alumnosOutput) => `${element.id}`,
    },
    {
      columnDef: 'nombre',
      header: 'nombre',
      cell: (element: alumnosOutput) => `${element.nombre}`,
    },
    {
      columnDef: 'curso',
      header: 'curso',
      cell: (element: alumnosOutput) => `${element.curso}`,
    },
    {
      columnDef: 'clases',
      header: 'clases',
      cell: (element: alumnosOutput) => `${element.clases}`,
    }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private alumoService: AlumnosService, private toastr: ToastrService) {
    this.alumoService.getAlumnos()
    .subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response;
      },
      error: (error) => {
        this.toastr.error(error);
      },
    })
  }

  ngOnInit(): void {
    this.alumoService.getAlumnos()
    .subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response;
      },
      error: (error) => {
        this.toastr.error(error);
      },
    })
  }

}
