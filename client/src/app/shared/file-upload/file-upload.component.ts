import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  file: File;
  @Output() onFileSelected = new EventEmitter<File>();
  maxFileSize = 1;
  allowedMimeType: string[] = ['image/png', 'image/jpg'];
  fileTypesAllowed: string[];

  constructor() {}

  ngOnInit(): void {
    this.fileTypesAllowed = this.allowedMimeType.map((fileType: string) =>
      fileType.substring(fileType.lastIndexOf('/') + 1, fileType.length),
    );
  }

  isValid(item: File) {
    if (item.size / 1024 / 1024 > this.maxFileSize) {
      return false;
    }
    const itemType =
      item.name.substring(item.name.lastIndexOf('.') + 1, item.name.length) ||
      item.name;
    if (!this.fileTypesAllowed.includes(itemType)) {
      return false;
    }
    return true;
  }

  // On file Select
  onChange(event: any) {
    const file = event.target.files[0] as File;
    if (!this.isValid(file)) {
      alert('file is invalid');
      return;
    }
    this.file = file;
    this.onFileSelected.emit(this.file);
  }
}
