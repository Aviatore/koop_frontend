import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from '../admin-interfaces/categories';
import {MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {ProductsService} from '../admin-services/products.service';
import {AvailQuantity} from '../admin-interfaces/availQuantity';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-avail-quant-selector',
  templateUrl: './avail-quant-selector.component.html',
  styleUrls: ['./avail-quant-selector.component.css']
})
export class AvailQuantSelectorComponent implements OnInit {
  availQuantities: AvailQuantity[];
  @ViewChild('categoryInput') categoryInput: MatInput;
  @Input() productData;
  @Input() productId;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.GetAvailQuantities(this.productId).subscribe(result => {
      this.availQuantities = result;
    });
  }

  add(event: MatChipInputEvent): void {
    if (event.value === '') {
      return;
    }
    const newQuant: AvailQuantity = {
      quantity: Number(event.value),
      availableQuantityId: null,
      productId: this.productId === undefined ? null : this.productId
    };

    const quantTmp = this.productData.get('availQuantity').value.slice();
    quantTmp.push(newQuant);

    this.productData.patchValue({
      availQuantity: quantTmp
    });

    event.input.value = '';
    event.value = '';

    console.log('ok');
    console.log(`Data: ${JSON.stringify(this.productData.get('availQuantity').value)}`);
  }

  remove(quant: AvailQuantity): void {
    const quantTmp: AvailQuantity[] = this.productData.get('availQuantity').value.slice();
    const index = quantTmp.map(p => p.quantity).indexOf(quant.quantity);
    if (index >= 0) {
      quantTmp.splice(index, 1);
    }

    this.productData.patchValue({
      availQuantity: quantTmp
    });

    console.log(`Data: ${JSON.stringify(this.productData.get('availQuantity').value)}`);
  }
}
