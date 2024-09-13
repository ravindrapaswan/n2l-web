import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.component.html',
  styleUrls: ['./view-photo.component.css']
})
export class ViewPhotoComponent {

  imageURL: string = ''
  getImage: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) {
    this.ImageOpener();
  }

  // Condition check for Image have or not
  ImageOpener() {
    this.imageURL = (this.data);
    if (this.data == '') {
      this.getImage = false;
    } else {
      this.getImage = true;
    }
  }

  //Dialog Change as per Screen Size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.logScreenSize();
  }
  logScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
    } else {
      this.dialogRef.updateSize('60%', '75%');
    }
  }

  ngOnInit(): void {
    // this.dialogRef.updateSize('50%','75%');
    this.logScreenSize();
  }

  close() {
    this.dialogRef.close();
  }
}
