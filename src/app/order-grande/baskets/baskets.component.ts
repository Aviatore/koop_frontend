import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Basket} from '../basket';
import {OrderGrandeService} from '../order-grande.service';
import {MatTableDataSource} from '@angular/material/table';
import {PackList} from '../../reports/models/pack-list';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {jsPDF} from 'jspdf';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {

  displayedColumns: string[] = [
    'basketName',
    'cooperator'
  ];
  dataSource: MatTableDataSource<Basket>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // data for PDF generator
  head = [['L.p.', 'Koszyk', 'Kooperant']];
  data = [];
  reader: FileReader;
  fontInBase64: any;

  baskets: Observable<Basket[]>;

  constructor(private orderGrandeService: OrderGrandeService) {
    this.getDataFromObservable();
  }

  ngOnInit(): void {
    this.baskets = this.orderGrandeService.getBaskets();
    this.data = this.getDataForPdf();
    this.reader = new FileReader();

  }

  getDataFromObservable(): void {
    this.orderGrandeService.getBaskets()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  ngAfterViewInit(): void {
    this.orderGrandeService.getBaskets()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  async readFile(): Promise<void> {
    const fileTtfPath = '../../../assets/ttf/ARIALUNI.TTF';
    const blob = await fetch(fileTtfPath).then(r => r.blob());

    this.reader.onloadend = (readerEvt) => {
      // const binaryString = readerEvt.target.result.toString().split(',')[1];
      this.fontInBase64 = this.reader.result.toString().split(',')[1];

      this.createPdf('ARIALUNI.TTF', this.fontInBase64);
    };

    this.reader.readAsDataURL(blob);
  }

  createPdf(fileName, fontBase64): void {
    const doc = new jsPDF('p', 'mm', 'a4');
    const fileNameWithoutExtension = fileName.split('.')[0];
    doc.addFileToVFS(fileName, fontBase64);
    doc.addFont(fileName, fileNameWithoutExtension, 'normal');

    doc.setFont(fileNameWithoutExtension);
    doc.setLanguage('pl');

    const currentDate = formatDate(Date.now(), 'yyyy.MM.dd HH:mm:ss', 'pl-PL');

    doc.setFontSize(14);
    doc.text(`Lista koszyków (${currentDate})`, 15, 18);
    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: this.head,
      body: this.data,
      theme: 'striped',
      startY: 20,
      margin: {horizontal: 14},
      styles: {
        font: fileNameWithoutExtension,    // <-- place name of your font here
        fontStyle: 'normal',
        fontSize: 10
      }
    });

    // Open PDF document in new tab
    doc.output('dataurlnewwindow');

    // Download PDF document
    doc.save(`baskets_list ${currentDate}.pdf`);
  }

  getDataForPdf(): any[] {
    const pdfList = [];

    this.baskets.forEach(x => {
      x.forEach((currentValue, index) => {
        pdfList.push([`${index + 1}.`, currentValue.basketName, currentValue.cooperator]);
      });
    }).then(() => console.log('Done'));

    return pdfList;
  }

}
