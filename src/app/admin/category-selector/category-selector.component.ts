import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
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
  @ViewChild('categorySelect') categorySelect: MatSelect;
  @Input() productData;
  @Input() onProductDataUpdated: Subject<any>;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.GetAllCategories().subscribe(rolesResult => {
      console.log('cat-selector start');
      rolesResult.forEach(role => this.allCategories.push(role));

      // Subscribe to the BehaviourSubject provided as an Input to listen.
      // When the userData is updated the Subject sends empty data by the next() method
      // which triggers filling-up filteredRoles.
      this.onProductDataUpdated.subscribe(result => {
        this.filteredCategories = of(this.allCategories.filter(category => {
          const tmp = this.productData.get('category').value.filter(p => p.categoryId === category.categoryId);
          return tmp.length === 0;
        }).slice());
      });
    });
  }

  selected(event: MatSelectChange): void {
    const newCat: Category = {
      categoryId: event.value,
      categoryName: event.source.triggerValue,
      productId: '00000000-0000-0000-0000-000000000000'
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

  removeCategory(category: Category): void {
    const catTmp: Category[] = this.productData.get('category').value.slice();
    const index = catTmp.map(p => p.categoryId).indexOf(category.categoryId);
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
