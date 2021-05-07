import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from '../admin-interfaces/categories';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {ProductsService} from '../admin-services/products.service';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  filteredCategories: Observable<Category[]>;
  allCategories: Category[] = [];
  test = ['p1', 'p2'];
  @ViewChild('categorySelect') categorySelect: MatSelect;
  @Input() productData;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.GetAllCategories().subscribe(rolesResult => {
      rolesResult.forEach(role => this.allCategories.push(role));

      // Subscribe to the Subject provided as an Input to listen.
      // When the userData is updated the Subject sends empty data by the next() method
      // which triggers filling-up filteredRoles.
      this.filteredCategories = of(this.allCategories.filter(p => !this.productData.get('category').value.includes(p)).slice());
    });
  }

  selected(event: MatSelectChange): void {
    const newCat: Category = {
      categoryId: event.value,
      categoryName: event.source.triggerValue
    };
    const catTmp = this.productData.get('category').value.slice();
    catTmp.push(newCat);

    this.productData.patchValue({
      category: catTmp
    });

    this.categorySelect.value = '';

    const userCurrentCategory: Category[] = this.productData.get('category').value;
    console.log(`Data: ${JSON.stringify(userCurrentCategory)}`);

    this.filteredCategories = of(this.allCategories.filter(category => {
      const tmp = userCurrentCategory.filter(p => p.categoryId === category.categoryId);
      return tmp.length === 0;
    }).slice());
  }

  removeCategory(role: Category): void {
    const catTmp: Category[] = this.productData.get('category').value.slice();
    const index = catTmp.map(p => p.categoryId).indexOf(role.categoryId);
    if (index >= 0) {
      catTmp.splice(index, 1);
    }

    this.productData.patchValue({
      category: catTmp
    });

    this.filteredCategories = of(this.allCategories.filter(category => {
      const tmp = this.productData.get('category').value.filter(p => p.categoryId === category.categoryId);
      return tmp.length === 0;
    }).slice());
  }
}
