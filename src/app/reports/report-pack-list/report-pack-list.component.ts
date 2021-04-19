import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PackList} from '../models/PackList';
import {ReportService} from '../services/report.service';

import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-report-pack-list',
  templateUrl: './report-pack-list.component.html',
  styleUrls: ['./report-pack-list.component.css']
})
export class ReportPackListComponent implements OnInit {

  packList$: Observable<PackList[]>;

  head = [['ID', 'Nazwa Produktu', 'Nr koszyka: Ilość']];
  data = [];
  reader: FileReader;
  fontInBase64: any;

  constructor(private service: ReportService) {
  }

  ngOnInit(): void {
    this.packList$ = this.service.getReportForPackers();
    this.data = this.getDataForPdf();
    this.reader = new FileReader();
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
    doc.text(`Lista dla paczkersów (${currentDate})`, 15, 18);
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
    doc.save(`pack_list ${currentDate}.pdf`);
  }

  getDataForPdf(): any[] {
    const pdfList = [];

    this.packList$.forEach(x => {
      x.forEach((currentValue, index) => {
        pdfList.push([`${index + 1}.`, currentValue.productName, currentValue.productsInBaskets]);
      });
    }).then(() => console.log('Done'));

    return pdfList;
  }

}
