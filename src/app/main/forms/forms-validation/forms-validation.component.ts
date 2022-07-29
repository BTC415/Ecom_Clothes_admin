import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms-validation',
  templateUrl: './forms-validation.component.html',
  styleUrls: ['./forms-validation.component.css']
})
export class FormsValidationComponent implements OnInit {
  mainTitle: any
  paramsId: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsId = this.route.snapshot.params['id'];
    this.mainTitle = this.paramsId ? 'Update Product' : 'Add Product'
  }

}
