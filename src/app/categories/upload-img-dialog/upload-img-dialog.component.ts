import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UploadDataDialog} from '../models/upload-data-dialog';
import {CategoryService} from '../services/category.service';
import {HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Path} from '../models/path';

@Component({
  selector: 'app-upload-img-dialog',
  templateUrl: './upload-img-dialog.component.html',
  styleUrls: ['./upload-img-dialog.component.css']
})
export class UploadImgDialogComponent implements OnInit {
  progress: number;
  message: string;
  selectedFile: File = null;
  @Output() public onUploadFinished = new EventEmitter();
  isDisabled: boolean;
  path: Path;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UploadDataDialog,
              private dialogRef: MatDialogRef<UploadImgDialogComponent>,
              private service: CategoryService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  disableButton(): void {
    this.isDisabled = true;
  }

  uploadImg(categoryId: string, picture: string, fileList: FileList): void {
    if (fileList.length === 0) {
      return;
    }

    const fileName = fileList.item(0).name.split('.');
    const fileExtension = fileName[fileName.length - 1];

    const formData = new FormData();
    formData.append('image', fileList.item(0), `${categoryId}.${fileExtension}`);
    this.service.uploadFileService(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.disableButton();
          this.progress = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Obrazek dodany';
          this.onUploadFinished.emit(event.body);
          this.path = event.body;
          const test = this.service.updateImageNameService(categoryId, this.path.dbPath);
          console.log(test.subscribe((s) => s.info, error => error.error));
          setInterval(() => this.dialogRef.close({msg: event.body}), 1400);
        }
      });
  }
}
