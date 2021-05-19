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
  // @Output() public onUploadFinished = new EventEmitter();
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
          // this.onUploadFinished.emit(event.body);
          this.path = event.body;
          this.service.updateImageNameService(categoryId, this.path.dbPath)
            .subscribe((data) => {
                const delay = setTimeout(() => this.dialogRef.close({msg: data.info}), 1400);
              },
              err => {
                if ('error' in err.error) {
                  this.dialogRef.close({msg: err.error.error});
                } else if ('detail' in err.error) {
                  this.dialogRef.close({msg: err.error.detail});
                }
              });
        }
      });
  }
}
