import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-assignment-dialog',
  templateUrl: './assignment-dialog.component.html',
  styleUrls: ['./assignment-dialog.component.css']
})

export class AssignmentDialogComponent {

  fileURL: string = ''
  fileType: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private sanitizer: DomSanitizer
  ) {
    this.Opener();
    console.log(data);
  }

  isVideo: boolean = false;
  isAudio: boolean = false;
  isPdf: boolean = false;

  Opener() {
    // console.log(this.data.fileUrl+this.data.filePath);
    if (!this.data.fileType) {
      this.fileType = 'No file Uploaded';
    } else if (this.data.fileType == 'application/pdf') { //check pdf
      this.fileURL = this.data.fileUrl+this.data.filePath;
      this.isPdf = true;
      this.dialogRef.updateSize('70%', '70%');
    } else if (this.data.fileType == 'video/mp4' || this.data.fileType == 'audio/mpeg') { //check video
      this.fileURL = this.data.fileUrl+this.data.filePath;
      window.open(this.fileURL);
      this.isVideo = true;
    } else if (this.data.fileType == 'audio/mp3') { //check audio
      this.fileURL = this.data.fileUrl+this.data.filePath;
      this.isAudio = true;
      window.open(this.fileURL);
    } else {
      this.fileType = 'file format not suported';
    }
  }

  ngOnInit(): void { }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
