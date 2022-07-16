import {Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {isFormItemValid} from "../../../../@youpez"
import {countriesData, usStatesData} from "../../../../@youpez/data/dummy"

@Component({
  selector: 'app-dummy-form-billing',
  templateUrl: './dummy-form-billing.component.html',
  styleUrls: ['./dummy-form-billing.component.scss']
})
export class DummyFormBillingComponent implements OnInit {

  @Input() theme: string = 'light'
  @Input() layout: string = 'horizontal'

  public countries = countriesData
  public usStates = usStatesData

  public formGroup: FormGroup

  constructor(protected formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.minLength(3)]],
      size: ['', [Validators.required]],
      description: ['', [Validators.required]],
      material: ['', [Validators.required]],
      care: ['', [Validators.required]],
      modelHeight: ['', [Validators.required]],
      modelSize: ['', [Validators.required]],
      quantity: ['', [Validators.requiredTrue]],
      category: ['', [Validators.requiredTrue]],
      color: ['', [Validators.requiredTrue]],
      date: ['', [Validators.requiredTrue]],
      discount: ['', [Validators.requiredTrue]],
      product_collection: ['', [Validators.requiredTrue]],
      images: ['', [Validators.required]],
    }, {updateOn: 'blur'})
  }

  submit() {
    this.formGroup.markAllAsTouched()
    console.log("valiue ==> ",)
  }

  reset() {
    this.formGroup.reset()
  }

  isValid(name) {    
    return isFormItemValid(this.formGroup, name)
  }

  isFormValid() {
    if (!this.formGroup.valid) {
      return false
    }
    return true
  }

  getRowLayout(num) {
    if (this.layout === 'vertical') {
      return '100%'
    }
    return num + '%'
  }

}
