import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { ICategory } from './../../models/category.interface';
import { CategoryService } from './../../services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categories: ICategory[] = [];

  public productSearchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    manufacturer: new FormControl(''),
    categoryId: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    public router: Router) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(c => this.categories = c);
  }

  public reset() {
    this.productSearchForm.reset();
    this.onSubmit();
  }

  public onSubmit() {
    let c = this.productSearchForm.get('categoryId').value;

    if (!c) {
      c = 'all';
    }

    this.router.navigate([`home/categories/${c}`], { queryParams: { category: 'all' , ...this.productSearchForm.value } });
  }
}
