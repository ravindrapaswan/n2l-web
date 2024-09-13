import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewPhotoComponent } from '../view-photo/view-photo.component';
import { VideoViewComponent } from '../../webinar/video-view/video-view.component';
import { DialogEditWebinarComponent } from '../dialog-edit-webinar/dialog-edit-webinar.component';
import Swal from 'sweetalert2';
import { WebinarService } from 'src/app/Services/webinar.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-webinar',
  templateUrl: './edit-webinar.component.html',
  styleUrls: ['./edit-webinar.component.css']
})
export class EditWebinarComponent {

  loader: boolean = false;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private webinarService: WebinarService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
    ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any = [];
  displayedColumns: string[] = ['topic', 'duration', 'date', 'starttime', 'description', 'picturelink', 'videolink', 'zoomlink', 'Edit', 'Delete'];

  ngOnInit() {
    this.getWebinar();
  }

  FileUrl: string = '';
  getWebinar() {
    this.loader = true;

    this.adminService.getWebinar('webinar/getWebinarAdmin').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.FileUrl = res.data[0].url;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.cdRef.detectChanges();
      } else {

      }
    })
  }

  public imagePath: string = '';
  viewPhoto(path: string) {
    this.imagePath = path;
    // console.log(this.imagePath)
    const dialogRef = this.dialog.open(ViewPhotoComponent, { data: this.FileUrl + this.imagePath });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ViewWebinarVideo(videolink: string) {
    const VideoUrl = this.FileUrl + videolink
    // const dialogRef = this.dialog.open(VideoViewComponent, { data: { VideoUrl } });
    // dialogRef.afterClosed().subscribe(result => {
    // });

    window.open(VideoUrl);

    // this.loader = true;

    // const filename = VideoUrl.substring(VideoUrl.lastIndexOf('/') + 1);
    // this.http.get(VideoUrl, { responseType: 'arraybuffer' }).subscribe(response => {
    //   this.loader = false;
    //   const blob = new Blob([response], { type: 'video/mp4' });

    //   const link = document.createElement('a');
    //   link.href = window.URL.createObjectURL(blob);
    //   link.download = filename;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // });
    
  }

  openZoom(zoomlink: string) {
    window.open(zoomlink);
  }

  EditDialog(webinarid: string) {
    const dialogRef = this.dialog.open(DialogEditWebinarComponent, { data: { webinarid } });

    dialogRef.afterClosed().subscribe(result => {
      this.getWebinar();
    });
  }

  DeleteWebinar(webinarid: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;
        this.webinarService.deleteWebinar('webinar/deleteWebinar/' + webinarid).subscribe((res: any) => {
          this.loader = false;
          if (res.status == 800) {
            Swal.fire({
              title: "Deleted!",
              text: "Webinar Deleted.",
              icon: "success"
            });
            this.cdRef.detectChanges();
            this.getWebinar();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong",
              icon: "error"
            });
          }
        })
      }
    });
  }
}
