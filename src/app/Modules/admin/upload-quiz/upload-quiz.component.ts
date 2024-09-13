import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload-quiz',
  templateUrl: './upload-quiz.component.html',
  styleUrls: ['./upload-quiz.component.css']
})
export class UploadQuizComponent {

  constructor(private adminService: AdminService) { }

  loader: boolean = false;

  // Store Files in Variables
  QuizMasterFile: any;
  QuizDetailsFile: any;
  QuestionAnswerZipFile: any;

  // Select QuizMaster File
  selectQuizMasterFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.QuizMasterFile = file;
    }
  }

  // Select Quiz Details File
  selectQuizDetailsFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.QuizDetailsFile = file;
    }
  }

  // Select Question-Answer Image Zip File
  selectQuestionsImageZipFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.QuestionAnswerZipFile = file;
    }
  }


  // UploadQuizMaster
  UploadQuizMaster(fileQuizMasterInput: HTMLInputElement) {

    if (!this.QuizMasterFile) {
      Swal.fire({ icon: 'error', text: 'Please select a file', timer: 3000 });
      return;
    }

    this.loader = true;

    const formData = new FormData();

    formData.append('QuizMasterFile', this.QuizMasterFile);
    
    this.adminService.ExcelFunction('admin/QuizEntry', formData).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        Swal.fire({
          icon: "success",
          title: "Data Inserted Successfully",
          text: "Already Exist QuizIds - (" + res.skippedQuizIds + ")" + ", Inserted QuizIds - (" + res.insertedRows + ")",
          showConfirmButton: true,
          timer: 20000
        });
        // Reset the input field after success
        fileQuizMasterInput.value = ''; // This will clear the selected file
        this.QuizMasterFile = null; // Set it to null or an empty string
      } else {
        // Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 });
      }


    });
  }

  // UploadQuizDetails
  UploadQuizDetails(fileQuizDetailInput: HTMLInputElement) {

    if (!this.QuizDetailsFile) {
      Swal.fire({ icon: 'error', text: 'Please select a file', timer: 3000 });
      return;
    }

    this.loader = true;

    const formData = new FormData();

    formData.append('QuizDetailsFile', this.QuizDetailsFile);
    this.adminService.ExcelFunction('admin/QuizDetailsEntry', formData).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        Swal.fire({
          icon: "success",
          title: "Data Inserted Successfully",
          text: "Already Exist QuestionIds - (" + res.skippedQuestionIds + ")" + ", Inserted QuestionIds - (" + res.insertedRows + ")",
          showConfirmButton: true,
          timer: 20000
        });
        // Reset the input field after success
        fileQuizDetailInput.value = ''; // This will clear the selected file
        this.QuizDetailsFile = null; // Set it to null or an empty string
      } else {
        // Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 });
      }
    });

  }

  // UploadQuestionAnswerZip
  // UploadQuestionAnswerZip(fileImageInput: HTMLInputElement) {

  //   if (!this.QuestionAnswerZipFile) {
  //     Swal.fire({ icon: 'error', text: 'Please select a file', timer: 3000 });
  //     return;
  //   }

  //   this.loader = true;

  //   const formData = new FormData();

  //   formData.append('QuestionAnswerZipFile', this.QuestionAnswerZipFile);
  //   this.adminService.ExcelFunction('admin/UploadObjectInS3', formData).subscribe((res: any) => {
  //     this.loader = false;

  //     if (res.ResponseCode == 800) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Images Uploaded on the server Successfully",
  //         showConfirmButton: true,
  //         timer: 20000
  //       });
  //       // Reset the input field after success
  //       fileImageInput.value = ''; // This will clear the selected file
  //       this.QuestionAnswerZipFile = null; // Set it to null or an empty string
  //     } else {
  //       // Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 });
  //     }
  //   });
  // }

  // Upload Process
  CallForUploads(fileQuizMasterInput: HTMLInputElement, fileQuizDetailInput: HTMLInputElement) {

    Swal.fire({
      title: "Are you sure?",
      text: "Please insure file and format is correct or not, before click Upload",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Upload it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.UploadQuizMaster(fileQuizMasterInput);
        // this.UploadQuizDetails(fileQuizDetailInput);

        setTimeout(() => {
          this.UploadQuizDetails(fileQuizDetailInput);
        }, 4000);

      }
    });




    // setTimeout(() => {
    //   this.UploadQuestionAnswerZip(fileImageInput);
    // }, 4000);

  }


}
