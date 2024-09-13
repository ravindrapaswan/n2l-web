import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bulk-student-register',
  templateUrl: './bulk-student-register.component.html',
  styleUrls: ['./bulk-student-register.component.css']
})
export class BulkStudentRegisterComponent {

  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private http: HttpClient
  ) { }
  excelForm: FormGroup = this.fb.group({ //Method Define Login
    MobileNumber: [''],
    password: ['']
  });

  file1: any;
  selectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file1 = file;
    }
  }

  Submit(fileInput: HTMLInputElement) {

    if(!this.file1){
      Swal.fire({ icon: 'error', text: 'Please select a file', timer: 3000 });
      return;
    }
    
    this.loader = true;
    const formData = new FormData();
    formData.append('file', this.file1);
    this.adminService.ExcelFunction('admin/bulkRegister', formData).subscribe((res: any) => {
     this.loader = false;
      if (res.ResponseCode == 800) {
        Swal.fire({
          icon: "success",
          title: "Data Inserted Successful",
          text: "Already Exist Mobile Numbers - (" + res.skippedMobileNumbers + ")" + ", Inserted Mobile Numbers - (" + res.insertedRows + ")",
          showConfirmButton: true,
          timer: 20000
        });
        // Reset the input field after success
        fileInput.value = ''; // This will clear the selected file
        this.file1 = null; // Set it to null or an empty string
      } else {
        Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 });
      }
    });
  }

  ExcelDownload() {
    this.loader =true;
    const fileUrl = 'https://nodeapitesting.s3.ap-south-1.amazonaws.com/MasterResource/file/Sample+Format+for+upload+student+data.xlsx';

    // Make a GET request to the file URL
    this.http.get(fileUrl, { responseType: 'arraybuffer' }).subscribe(response => {
      this.loader = false;
      // Create a Blob from the response data
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Sample_Format_for_bulk_student_registration.xlsx';

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    });
  }
}

