import { Template } from '@angular/compiler/src/render3/r3_ast';
import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import {
  TableItem,
  TableHeaderItem,
  TableModel,
} from 'carbon-components-angular';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../../environments/environment';
class CustomHeaderItem extends TableHeaderItem {
  // used for custom sorting
  compare(one: TableItem, two: TableItem) {
    const stringOne = (
      one.data.name ||
      one.data.surname ||
      one.data
    ).toLowerCase();
    const stringTwo = (
      two.data.name ||
      two.data.surname ||
      two.data
    ).toLowerCase();

    if (stringOne > stringTwo) {
      return 1;
    } else if (stringOne < stringTwo) {
      return -1;
    } else {
      return 0;
    }
  }
}

@Component({
  selector: 'app-dummy-table-expansion',
  templateUrl: './dummy-table-expansion.component.html',
  styleUrls: ['./dummy-table-expansion.component.scss'],
})
export class DummyTableExpansionComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() size = 'lg';
  @Input() showSelectionColumn = true;
  @Input() striped = true;
  @Input() isDataGrid = false;
  @Input() sortable = true;
  @Input() stickyHeader = false;
  @Input() skeleton = false;

  @ViewChild('customHeaderTemplate', { static: true })
  customHeaderTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate', { static: true })
  customTableItemTemplate: TemplateRef<any>;
  @ViewChild('statusToggle', { static: true })
  statusToggle: TemplateRef<any>;
  @ViewChild('displayImage', { static: true })
  displayImage: TemplateRef<any>;

  constructor(private api: ApiService) {}
  id: any;
  env = environment;
  ngOnInit() {
    this.api.Allusers().subscribe({
      next: (res) => {
        res.data.map((m: any, i: any) => {
          m.status = m.status === 'block' ? true : false;
          console.log('image', m.image);

          this.model.data[i] = [
            new TableItem({
              data: { image: m.image, fullName: m.firstname + ' ' + m.lastname },
              template: this.displayImage,
            }),
            new TableItem({ data: m.firstname }),
            new TableItem({ data: m.lastname }),
            new TableItem({ data: m.email }),
            new TableItem({
              data: { id: m._id, status: m.status },
              template: this.statusToggle,
            }),
          ];
        });
      },
      error: (err) => {
        console.log('err', err);
      },
    });

    this.model.header = [
      new CustomHeaderItem({
        data: { name: 'Profile' },
        template: this.customHeaderTemplate,
      }),
      new TableHeaderItem({ data: 'First Name' }),
      new CustomHeaderItem({
        data: { name: 'Last Name' },
        template: this.customHeaderTemplate,
      }),
      new CustomHeaderItem({
        data: { name: 'Email' },
        template: this.customHeaderTemplate,
      }),
      new CustomHeaderItem({
        data: { name: 'Status' },
        template: this.customHeaderTemplate,
      }),
    ];
  }

  customSort(index: number) {
    this.sort(this.model, index);
  }

  onRowClick(index: number) {}

  sort(model, index: number) {
    if (model.header[index].sorted) {
      model.header[index].ascending = model.header[index].descending;
    }
    model.sort(index);
  }

  StatusToggleChange(event: any, id: any) {
    let status = event.checked ? 'block' : 'unblock';
    const statusObj = { id: id, status: status };
    // console.log('statusObj', statusObj);
    this.api.UserStatus(statusObj).subscribe({
      next: (res) => {
        // console.log('res', res);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
