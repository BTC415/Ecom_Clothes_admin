import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'carbon-components-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
})
export class ShowProductComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.masterSelected = false;
    this.checkBox_array;
    this.getCheckedItemList();
  }
  products: any;
  closeResult: string;
  checkBox_array = [];
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  check_id: any[] = [];
  uniqueCheck_id: any[] = [];
  searchText: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  sortDir = 1;
  count_id: any[] = [];
  env = environment;
  public ascNumberSort = true;
  products_length:any;
  ngOnInit(): void {
    this.showProductData();
  }

  showProductData() {
    this.api.ShowProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.products.map((i: any) => {
          const obj = Object.assign(i, { isSelected: false });
          this.checkBox_array.push(obj);
        });
        this.products_length = this.products.length
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  open(content: any, videoId: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            this.deleteHero(videoId);
            // this.deleteMultiple_products();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.showProductData();
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteHero(_id: any) {
    console.log('id', _id);
    this.api.DeleteProduct(_id).subscribe({
      next: (res) => {
        this.showProductData();
        this.notificationService.showToast({
          type: 'info',
          title: 'Prodct was successfully deleted.',
          target: '#notificationHolder',
          message: 'message',
          duration: 3000,
        });
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  btnUpdate(_id: any) {
    this.router.navigate(['app/forms/validation/', _id]);
  }
  AddProduct() {
    this.router.navigate(['/app/forms/validation']);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.checkBox_array.length; i++) {
      this.checkBox_array[i].isSelected = this.masterSelected;
      // console.log('this.checkBox_array[i', this.checkBox_array[i]);
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.checkBox_array.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checkBox_array.length; i++) {
      if (this.checkBox_array[i].isSelected)
        this.checkedList.push(this.checkBox_array[i]);
    }
    console.log('this.checkedList ', this.checkedList);
    const selected_id = this.checkedList.find((x: any) => {
      // console.log("x",x);

      this.check_id.push(x._id);
    });
  }
  deleteMultiple_products(multiplecontent: any, notmultiplecontent: any) {
    if (this.checkedList.length !== 0) {
      this.modalService
        .open(multiplecontent, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
            if (result === 'yes') {
              this.check_id = [...new Set(this.check_id)];

              console.log('this.checkedList===>', this.checkedList);

              this.checkedList.map((i: any) => {
                console.log('i==>', i._id);
                console.log('this.checkedList map in ===>', this.checkedList);
                this.api.DeleteProduct(i._id).subscribe({
                  next: (res) => {
                    console.log('res', res);
                    this.showProductData();
                  },
                  error: (error) => {
                    console.log('error', error);
                  },
                });
              });
            }
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      if (this.checkedList.length === 0) {
        this.modalService
          .open(notmultiplecontent, { ariaLabelledBy: 'modal-basic-title' })
          .result.then(
            (result) => {
              this.closeResult = `Closed with: ${result}`;
              if (result === 'yes') {
              }
            },
            (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
      }
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.showProductData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showProductData();
  }

  onSortClick(event, col) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr(col);
  }

  sortArr(colName: any) {
    this.products.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  public sortNumberColumn(event:any) {
    let target = event.currentTarget,
      classList = target.classList;
     this.ascNumberSort = !this.ascNumberSort;
    if (classList.contains('fa-chevron-up') && this.ascNumberSort) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.products.sort((a:any, b:any) => a.quantity - b.quantity);
      this.products.sort((a:any, b:any) => a.price - b.price);
      this.products.sort((a:any, b:any) => a.discount - b.discount);
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.products.sort((a:any, b:any) => b.quantity - a.quantity); 
      this.products.sort((a:any, b:any) => b.price - a.price); 
      this.products.sort((a:any, b:any) => b.discount - a.discount); 
    }
  }
}
