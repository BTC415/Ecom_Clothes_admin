import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColDef, GridOptions, IAfterGuiAttachedParams } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { ICellRendererAngularComp } from "@ag-grid-community/angular";

const categories = {
  Utilities: '#edb879',
  'Technology Services': '#1979a9',
  Transportation: '#e07b39',
  'Retail Trade': '#80391e',
  'Producer Manufacturing': '#042f66',
  'Health Technology': '#042f66',
  'Health Services': '#521799',
  Finance: '#991717',
  'Energy Minerals': '#805C33',
  'Electronic Technology': '#003A52',
  'Consumer Services': '#008580',
  'Consumer Non-Durables': '#D1C400',
  'Consumer Durables': '#850200',
  Communications: '#001FD1',
};

const companyCellRenderer = (params) => {
  const { value } = params;
  // const split = value.split('|');

  return `
  <div fxFlex="100%" fxFlex.gt-md="70%">
  <ibm-toggle
    class="app-ibm-toggle-fix"
    [onText]="'Company'"
    [offText]="'Personal'"
    [checked]="false"
    size="md">
  </ibm-toggle>
  <div class="mt-2 app-caption-01">VAT information needed</div>
</div>
  `;
};
// const companyCellRenderer = (params) => {
//   const { value } = params;
//   const split = value.split('|');

//   return `
//     <div class="app-row app-row--center overflow-hidden">
//       <div class="app-symbol app-symbol--default mr-2 rounded">
//         <div class="app-symbol__label w-6 h-6 app-color-info font-bold ">${split[0][0]}</div>
//       </div>
//       // <div>
//       //   <div class="app-expressive-heading-01">${split[0]}</div>
//       //   <div class="text-overflow-ellipsis app-caption-01">${split[1]}</div>
//       // </div>
//     </div>
//   `;
// };

const sectorCellRenderer = (params) => {
  const { data } = params;  
  const color =
    data.status === 'block' ? { background: 'red' } : { background: 'green' };
  return `
  <div class="flex">
      <button style="color:white; width:66px; height:33px; background:${color.background};cursor:pointer;border : none" (click)="statusToggle(${data._id})">${data.status}</button>
     </div>
  `;
};

// const sectorCellRenderer = (params) => {
//   const { value } = params;
//   const color = categories[value];

//   return `
//     <div class="flex">
//     <div style="width:4px;height:16px;background: ${color};margin-right:5px;"></div>
//       ${value}
//     </div>
//   `;
// };

const numberCellRenderer = function (params) {
  const value = params.value;

  // const sign = value.charAt(0);

  // if (isNaN(sign)) {
  //   return `
  //   <span class="app-color-danger">${value}</span>
  // `;
  // }
  return `
    <span class="app-color-success">${value}</span>
  `;
};

const rateClassRenderer = (params) => {
  const value = params.value;
  return value === 'Sell'
    ? { backgroundColor: 'rgba(255, 212, 219, .5)' }
    : value === 'Strong Buy'
    ? { backgroundColor: 'rgba(198, 255, 189, .5)' }
    : { backgroundColor: 'rgba(227, 255, 223, .5)' };
};

const createRowHelper = (_0, _1, _2, _3, _4) => {
  return {
    _id: _0,
    firstname: _1,
    lastname: _2,
    email: _3,
    status: _4,
  };
};

const parseCSV = (csv) => {
  return (
    csv
      // .toString()
      .split('\n')
      .map((row) => row.split(','))
      .filter((row) => row[0])
  );
};

@Component({
  selector: 'app-table-full',
  templateUrl: './table-full.component.html',
  styleUrls: ['./table-full.component.css'],
})
export class TableFullComponent implements ICellRendererAngularComp, OnDestroy,  OnInit {
  private params: any;
  frameworkComponents: { btnCellRenderer: any; };

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    console.log('#####');
    
    this.params.clicked(this.params.value);
  }

  statusToggle(id: any) {
    alert(id)
  }  

  public modules = [InfiniteRowModelModule, ClientSideRowModelModule];
  public gridOptions: GridOptions = {};
  public loading: boolean = false;
  public defaultColDef = {};
  btnstatus: any;

  constructor(private http: HttpClient, private api: ApiService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.createTable();
  }

  createTable() {
    this.loading = true;
    const columnDefs: Array<ColDef> = [
      {
        headerName: 'First Name',
        field: 'firstname',
        filter: true,
        headerClass: 'cell-flex-center',
        cellClass: 'cell-flex-middle cell-flex-center',
      },
      {
        headerName: 'Last Name',
        field: 'lastname',
        filter: true,
        headerClass: 'cell-flex-center',
        cellClass: 'cell-flex-middle cell-flex-center',
      },
      {
        headerName: 'Email Address',
        field: 'email',
        filter: true,
        headerClass: 'cell-flex-center',
        cellClass: 'cell-flex-middle cell-flex-center',
      },
      {
        headerName: 'Status',
        field: 'status',
        filter: true,
        cellRenderer: sectorCellRenderer,
        cellRendererParams: {
          onClick: this.statusToggle.bind(this),
          label: 'Click'
        },
        headerClass: 'cell-flex-center',
        cellClass: 'cell-flex-middle cell-flex-center',
      },
    ];


    this.frameworkComponents = {
      btnCellRenderer: TableFullComponent
  };
  
    this.api.Allusers().subscribe((response) => {
      console.log('response', response.data);
      const rowData = response.data.map((row) =>
        createRowHelper(row._id, row.firstname, row.lastname, row.email, row.status)
      );
      this.gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        rowHeight: 50,
        headerHeight: 60,
        rowSelection: 'multiple',
        defaultColDef: {
          editable: true,
          sortable: true,
          resizable: true,
        },
        pagination: true,
        paginationPageSize: 5,
        groupSelectsChildren: true,
      };
      this.loading = false;
      setTimeout(() => {
        try {
          this.gridOptions.api.sizeColumnsToFit();
        } catch (error) {}
      }, 10);
    });
  }
}
