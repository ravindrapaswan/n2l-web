import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/Services/admin.service';
import { ShareService } from 'src/app/Services/share.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-zoom-file',
  templateUrl: './upload-zoom-file.component.html',
  styleUrls: ['./upload-zoom-file.component.css']
})
export class UploadZoomFileComponent {
  loader: boolean = false;
  UserId: number = 0;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private shareService: ShareService,
    private http: HttpClient
  ) {
    this.UserId = this.shareService.currentUser.userid;
    this.getUplodedDetails();
  }


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any = [];
  displayedColumns: string[] = ['practicesno', 'studentid', 'filename', 'practicedate', 'download'];

  UploadZoomForm: FormGroup = this.fb.group({ //Register Method
    QuizId: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
    BatchId: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
    PracticeDate: [''],
    UserId: [''],
    toTrimInSecond: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]]
  })

  ZoomFiles: any[] = [];
  selectAudio(event: any) {
    if (event.target.files.length > 0) {
      this.ZoomFiles = Array.from(event.target.files);
    }
  }

  // Upload audio method
  Upload() {
    const formattedDate = this.datePipe.transform(this.UploadZoomForm.value.PracticeDate, 'yyyy-MM-dd');

    this.UploadZoomForm.patchValue({
      PracticeDate: formattedDate,
      UserId: this.UserId
    })

    const formData = new FormData();

    // Append all files to the formData
    for (let i = 0; i < this.ZoomFiles.length; i++) {
      formData.append('ZoomAudio', this.ZoomFiles[i]);
    }

    if (!this.UploadZoomForm.valid) {
      return;
    }

    this.loader = true;

    this.adminService.UploadZoomFile('admin/UploadZoomFileBulk', formData, this.UploadZoomForm.value).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.UploadZoomForm.reset();
        Swal.fire({ icon: 'success', text: res.ResponseMsg, timer: 3000 });
        this.getUplodedDetails();
      } else if (res.ResponseCode == 302) {
        Swal.fire({ icon: 'error', text:  res.ResponseMsg, timer: 3000 })
      }
      else if (res.ResponseCode == 301) {
        Swal.fire({ icon: 'error', text:  res.ResponseMsg, timer: 3000 })
      }
      else {
        Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 })
      }
    })
  }

  table: boolean = false;
  getUplodedDetails() {
    this.loader = true;
    this.adminService.getAssignment('admin/getZoomAudioList').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.table = true;
        this.dataSource = new MatTableDataSource(res.data.reverse());
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      } else {
        this.table = false;
      }
    })
  }

  // Download file
  DownloadFile(url: string) {

    this.loader = true;
    // window.open(url)
    const filename = url.substring(url.lastIndexOf('/') + 1);

    this.http.get(url, { responseType: 'arraybuffer' }).subscribe(response => {
      this.loader = false;
      // Create a Blob from the response data
      const blob = new Blob([response], { type: 'application/*' });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    });


    //download through API + aws
    // this.adminService.getAssignment('api/files/download/' + name).subscribe((res: any) => {
    //   console.log(res);
    //   const blob = new Blob([res], { type: 'application/octet-stream' });
    //   const link = document.createElement('a');
    //   link.href = window.URL.createObjectURL(blob);
    //   link.download = name;
    //   link.click();
    // })
  }

}
