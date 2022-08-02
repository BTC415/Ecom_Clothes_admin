import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactDataRes: any;
  contactData: any;
  statusDropdown = [
    'pending',
    'respond',
    'ignore'
  ]
  selectedStatus = 'pending';
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getContactData();
  }

  getContactData() {
    this.api.getContactData().subscribe({
      next: (res) => {
        this.contactDataRes = res.data;
        this.contactData = this.contactDataRes;
        this.onSelected(this.selectedStatus)
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  onSelected(value: string): void {
    this.selectedStatus = value;
    if (this.selectedStatus === 'pending') {
      this.contactData = this.contactDataRes.filter((i: any) => {
        return this.selectedStatus === i.status;
      });
    }
    else if(this.selectedStatus === 'respond'){
      this.contactData = this.contactDataRes.filter((i: any) => {
        return this.selectedStatus === i.status;
      });
    }
    else if(this.selectedStatus === 'ignore'){
      this.contactData = this.contactDataRes.filter((i: any) => {
        return this.selectedStatus === i.status;
      });
    }else{
      // this.getContactData();
    }
  }
}
