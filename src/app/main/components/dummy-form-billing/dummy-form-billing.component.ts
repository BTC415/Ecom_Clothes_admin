import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isFormItemValid } from '../../../../@youpez';
import { countriesData, usStatesData } from '../../../../@youpez/data/dummy';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'carbon-components-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dummy-form-billing',
  templateUrl: './dummy-form-billing.component.html',
  styleUrls: ['./dummy-form-billing.component.scss'],
})
export class DummyFormBillingComponent implements OnInit {
  @Input() theme: string = 'light';
  @Input() layout: string = 'horizontal';

  public countries = countriesData;
  public usStates = usStatesData;
  file: any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  now: any;
  paramsId: any;
  updateImages: any = [];
  env = environment;
  previews: any = [];
  product_id: any;
  public ProductForm: FormGroup;

  public size = [
    { content: 'Select Size', disabled: true, selected: true },
    { content: '  UK4 / US0 / EU32' },
    { content: ' UK6 / US2 / EU34' },
    { content: ' UK8 / US4 / EU36' },
    { content: 'UK10 / US6 / EU38' },
    { content: ' UK12 / US8 / EU40' },
    { content: ' UK14 / US10 / EU42' },
    { content: ' UK16 / US12 / EU44' },
    { content: ' UK18 / US14 / EU46' },
  ];
  public category = [
    { content: 'Select Category', disabled: true, selected: true },
    { content: 'Dresses ' },
    { content: 'Suits' },
    { content: 'Jumpsuits' },
    { content: 'Tops' },
    { content: 'Shorts' },
    { content: 'Trousers' },
  ];
  public collection = [
    { content: 'Select Product Collection', disabled: true, selected: true },
    { content: 'Sunkissed ' },
    { content: 'The Main Event' },
    { content: 'Resort' },
    { content: 'The Holiday Collection' },
    { content: 'Lost Garden' },
    { content: ' Occasionwear' },
    { content: ' Partywear' },
    { content: ' Activewear' },
  ];
  images: any = [];
  constructor(
    protected formBuilder: FormBuilder,
    private api: ApiService,
    private notificationService: NotificationService,
    private acroute: ActivatedRoute,
    private router: Router,
  ) {
    // 30-07-2022
  }

  ngOnInit(): void {
    this.createForm();
    this.GetOneProduct();
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.ProductForm.get('date').patchValue(this.now)
  }

  createForm() {
    this.ProductForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required, Validators.minLength(3)]],
        size: ['', [Validators.required]],
        description: ['', [Validators.required]],
        material: ['', [Validators.required]],
        care: ['', [Validators.required]],
        modelHeight: ['', [Validators.required]],
        modelSize: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        category: ['', [Validators.required]],
        color: ['', [Validators.required]],
        date: ['', [Validators.required]],
        discount: ['', [Validators.required]],
        product_collection: ['', [Validators.required]],
        images: ['', [Validators.required]],
        product_id: ['', [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }
  get f() {
    return this.ProductForm.controls;
  }
  onFileSelect(event: any) {
    // console.log('-=-=-=-=event', event);

    event.preventDefault();
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      this.images = [];
      for (let i = 0; i < numberOfFiles; i++) {
        const file = this.selectedFiles[i];
        // console.log('file', file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.images.push(file);
        reader.onload = (e: any) => {
          this.previews.push(reader.result);
        };
      }
      // console.log('this.images', this.images);
      this.ProductForm.get('images')!.patchValue(this.images);
    }
  }

  removeImage(url: any) {
    // console.log('url', url);
    // console.log('this.previews ====>', this.previews);
    this.previews = this.previews.filter((img: any) => {
      const result = url != img;
      return result;
    });
    // console.log('this.previews', this.previews);
  }

  submit() {
    this.ProductForm.markAllAsTouched();
    // if (this.ProductForm.valid) {
    console.log('value ==> ', this.ProductForm.value);
    let fd = new FormData();
    fd.append('name', this.ProductForm.value.name);
    fd.append('price', this.ProductForm.value.price);
    fd.append('size', this.ProductForm.value.size.content);
    fd.append('description', this.ProductForm.value.description);
    fd.append('material', this.ProductForm.value.material);
    fd.append('care', this.ProductForm.value.care);
    fd.append('modelHeight', this.ProductForm.value.modelHeight);
    fd.append('modelSize', this.ProductForm.value.modelSize.content);
    fd.append('quantity', this.ProductForm.value.quantity);
    fd.append('category', this.ProductForm.value.category.content);
    fd.append('color', this.ProductForm.value.color);
    fd.append('date', this.ProductForm.value.date);
    fd.append('discount', this.ProductForm.value.discount);
    fd.append(
      'product_collection',
      this.ProductForm.value.product_collection.content
    );
    console.log('images ****===>', this.images);
    for (let i = 0; i < this.images.length; i++) {
      fd.append('images', this.selectedFiles[i]);
    }

    this.api.AddProduct(fd).subscribe({
      next: (res) => {
        this.reset();
        this.router.navigate(['app/product/show-products'])
        this.notificationService.showToast({
          type: 'info',    
          title: 'A product has been added.',
          target: '#notificationHolder',
          message: 'message',
          duration: 5000,
          position: 'right',
        });
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  reset() {
    this.ProductForm.reset();
    this.previews = [];
    this.images = [];
  }

  isValid(name) {
    return isFormItemValid(this.ProductForm, name);
  }

  isFormValid() {
    if (!this.ProductForm.valid) {
      return false;
    }
    return true;
  }

  getRowLayout(num) {
    if (this.layout === 'vertical') {
      return '100%';
    }
    return num + '%';
  }

  UpdateImage(image_id: any) {
    // console.log('obj', obj);
    this.api.UpdateImages(this.product_id, image_id).subscribe({
      next: (res) => {
        this.updateImages = this.updateImages.filter((img: any) => {
          // console.log("img",img._id);
          const result = image_id != img._id;
          return result;
        });
        console.log('res', res);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  EditData() {
    let fd = new FormData();
    fd.append('product_id', this.ProductForm.value.product_id);
    fd.append('name', this.ProductForm.value.name);
    fd.append('price', this.ProductForm.value.price);
    fd.append('size', this.ProductForm.value.size.content);
    fd.append('description', this.ProductForm.value.description);
    fd.append('material', this.ProductForm.value.material);
    fd.append('care', this.ProductForm.value.care);
    fd.append('modelHeight', this.ProductForm.value.modelHeight);
    fd.append('modelSize', this.ProductForm.value.modelSize.content);
    fd.append('quantity', this.ProductForm.value.quantity);
    fd.append('category', this.ProductForm.value.category.content);
    fd.append('color', this.ProductForm.value.color);
    fd.append('date', this.ProductForm.value.date);
    fd.append('discount', this.ProductForm.value.discount);
    fd.append(
      'product_collection',
      this.ProductForm.value.product_collection.content
    );

    for (let i = 0; i < this.images.length; i++) {
      fd.append('images', this.selectedFiles[i]);
    }

    this.api.UpdateProduct(fd).subscribe({
      next: (res) => {
        console.log('res', res);
        this.reset();
        this.GetOneProduct();
        this.router.navigate(['/app/product/show-products']);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  GetOneProduct() {
    this.paramsId = this.acroute.snapshot.params['id'];
    this.api.GetOneProduct(this.paramsId).subscribe({
      next: (res) => {
        this.ProductForm.patchValue(res.data);
        this.product_id = res.data._id;
        this.ProductForm.get('product_id').patchValue(res.data._id);
        this.ProductForm.patchValue({
          size: { content: res.data.size, selected: true },
        });
        this.ProductForm.patchValue({
          modelSize: { content: res.data.modelSize, selected: true },
        });
        this.ProductForm.patchValue({
          category: { content: res.data.category, selected: true },
        });
        this.ProductForm.patchValue({
          product_collection: {
            content: res.data.product_collection,
            selected: true,
          },
        });
        this.updateImages = res.data.images;
        console.log('updateImages', this.updateImages);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
