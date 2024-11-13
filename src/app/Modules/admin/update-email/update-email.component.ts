import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';


import { StudentAssignmentListComponent } from '../student-assignment-list/student-assignment-list.component';





@Component({
    selector: 'app-update-email',
    templateUrl: './update-email.component.html',
    styleUrls: ['./update-email.component.css']
  })


export class UpdateEmailComponent{

  loader:boolean = false;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchEmailBody()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  
  textContent: string = '';
  updateSuccess: boolean = false;

  fetchEmailBody() {
    this.adminService.getFunction('admin/getEmailTemplateBody').subscribe(
      (res: any) => {
        console.log("textContent res: ", res.data);
        if (res.ResponseCode === 800) {
          // If successful, update the textContent with the fetched data
          this.textContent = res.data;  // Assuming res.data contains the text you want to set in the textarea
          
        } else {
          console.log('Failed to fetch email body');
        }
      },
      (error) => {
        console.error('Error fetching email body', error);
      }
    );
  }


  // Function to update the text in the database
  updateText() {
    console.log("textContent ",this.textContent)
    this.adminService.postFunction('admin/updateEmailBody', {textContent: this.textContent}).subscribe( async (res: any) =>{
      console.log("textContent res",res.data)
      if(res.ResponseCode == 800){

        Swal.fire({ icon: 'success', text: "Email Updated Successfully!", timer: 3000 });
   
      }
      
    })

    // Simulating the successful update
    this.updateSuccess = true;

    // Reset the success message after 3 seconds
    setTimeout(() => {
      this.updateSuccess = false;
    }, 3000);
  }


}