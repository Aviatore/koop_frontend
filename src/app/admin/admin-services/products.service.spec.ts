import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Unit} from '../admin-interfaces/unit';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        {
          provide: HttpClient,
          useValue: spy
        }
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Testing async methods
  it('ppp', (done: DoneFn) => {
    const mockUnit: Unit[] = [
      {
        unitId: '01',
        unitName: 'kg'
      },
      {
        unitId: '02',
        unitName: 'g'
      }
    ];
    httpSpy.get.and.returnValue(of(mockUnit));
    service.GetAllUnits().subscribe(result => {
      expect(result).toEqual(mockUnit);
      done();
    });
  });
});
