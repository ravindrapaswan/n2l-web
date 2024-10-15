import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators, AbstractControl, FormGroupDirective } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { DatePipe } from '@angular/common';
import { ShareService } from 'src/app/Services/share.service';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentBatchListComponent } from '../student-batch-list/student-batch-list.component';


@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreateBatchComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSourceBatch: any = [];
  originalStudentList: any = []; // for search student
  studentList: any[] = []; // main list
  studentList2: any[] = []; // all student which are not part from current batch
  filteredstudentsglobally: any[] = []; // filter the student bassed on global search.
  batchwisestudents: any[] = []; // all students from current batch
  allStudent: any[] = []; // allstudent backup for clearing search input in batch main page
  allIdOfBatches: any[] = [];

  allStudentsFromAllBatches: any[] = [];
  allStudentWhichAreNotFromAnyBatch: any[] = [];

  // *******************************

  // *******************************

  displayedColumnsBatch: string[] = ['sno', 'coursename', 'batchname', 'noofstudents', 'fromdate', 'todate', 'edit', 'delete'];

  dataSourceStudent: any = [];
  displayedColumnsStudent: string[] = ['sno', 'name', 'mobilenumber', 'photo', 'delete'];

  loader: boolean = false;
  isEditMode: boolean = false;
  isDropdownVisible: boolean = false;
  studentids: any;

  userid: number = 0;
  BatchId: number = 0;
  selectedStudentIds: any[] = [];

  allSelected: boolean = false;

  courseList: any[] = [];
  CreateBatchForm!: FormGroup;
  forEditstudentIds: any;
  isforUpdate: boolean = false;


  s3Url: string = '';
  userPhoto = 'assets/images/user_ico2.jpg';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private datePipe: DatePipe,
    private shareService: ShareService,
    public dialog: MatDialog
  ) {
    this.userid = this.shareService.currentUser.userid;
    this.getStudents();
    this.getCourse();
    this.getBatch();
    this.initializeData();


  }

  ngOnInit(): void {
    this.studentids = new FormControl([], Validators.required);

    this.CreateBatchForm = this.fb.group({
      courseid: ['', [Validators.required]],
      batchname: ['', [Validators.required]],
      fromdate: ['', [Validators.required, this.validateFromDate.bind(this)]],
      todate: ['', [Validators.required, this.validateToDate.bind(this)]],
      studentids: this.studentids,
      userid: [],
      oldIds: [],
      v_isdeletedForBatch: [],
      batchid: [],
    });
  }


  // ***************************************************************************************************
  async initializeData() {
    await this.getAllBatchId();
    await this.fetchAllStudentsSequentially();
    this.populateStudentsNotInBatches();
  }


  checkStudents(){
    console.log("studentList ",this.studentList);
  }
  
  getAllBatchId(): Promise<void> {
    // console.log("getAllBatchId called");
    this.loader = true;

    return new Promise((resolve, reject) => {
      this.adminService.getFunction('admin/getAllBatchIds/').subscribe(
        (res: any) => {
          this.loader = false;
          console.log("Response from API:", res);

          if (res.ResponseCode === 800) {
            // Assign data to batchwisestudents
            this.allIdOfBatches = res.data ? [...res.data] : [];
            resolve(); // Resolve the promise when the data is successfully fetched
          } else {
            console.error('Failed to fetch Batch_Id:', res.ResponseMsg);
            reject(); // Reject the promise in case of an error response
          }
        },
        (error) => {
          this.loader = false;
          console.error('Error fetching students:', error);
          reject(); // Reject the promise in case of a network or server error
        }
      );
    });
  }


  async fetchAllStudentsSequentially() {
    console.log("allIdOfBatches from fetchAllStudentsSequentially: ", this.allIdOfBatches);

    for (let i = 0; i < this.allIdOfBatches.length; i++) {
      const batchId = this.allIdOfBatches[i].batchid;
      await this.acceseBatchWiseStudents2(batchId);
    }
    console.log('All students from all batches have been fetched:', this.allStudentsFromAllBatches);
  }


  acceseBatchWiseStudents2(batchid: number): Promise<void> {
    this.loader = true;

    return new Promise((resolve, reject) => {
      this.adminService.getBatchStudents('admin/getStudentsByBatchwise2/' + batchid).subscribe(
        (res: any) => {
          this.loader = false;
          console.log("Response from API:", res);

          if (res.ResponseCode === 800) {

            this.allStudentsFromAllBatches = [
              ...this.allStudentsFromAllBatches,
              ...(res.data ? res.data : [])
            ];

            resolve(); 
          } else {
            console.error('Failed to fetch students:', res.ResponseMsg);
            reject();
          }
        },
        (error) => {
          this.loader = false;
          console.error('Error fetching students:', error);
          reject();
        }
      );
    });
  }


  async populateStudentsNotInBatches() {
    // Create a Set of userids from allStudentsFromAllBatches for faster lookups
    const batchUserIds = new Set(this.allStudentsFromAllBatches.map(student => student.userid));

    // Filter originalStudentList to include only those students not in the batchUserIds
    await this.allStudentWhichAreNotFromAnyBatch.push(
      ...this.originalStudentList.filter((student: any) => !batchUserIds.has(student.userid))
    );

    console.log("allStudentWhichAreNotFromAnyBatch from populate ",this.allStudentWhichAreNotFromAnyBatch);

    this.studentList = [...this.allStudentWhichAreNotFromAnyBatch];
  }


  // ***************************************************************************************************

  handleClickOutside(event: Event): void {
    const clickedInside = (event.target as HTMLElement).closest('.col-md-5.mb-3');
    if (!clickedInside) {
      this.isDropdownVisible = false;
    }
  }
  acceseBatchWiseStudents(batchid: number) {
    this.loader = true;

    this.adminService.getBatchStudents('appApi/getStudentsByBatchwise/' + batchid).subscribe(
      (res: any) => {
        this.loader = false;
        console.log("Response from API:", res);

        if (res.ResponseCode === 800) {
          // Assign data to batchwisestudents
          this.batchwisestudents = res.data ? [...res.data] : [];
          console.log('batchwisestudents:', this.batchwisestudents);
          console.log("studentList ",this.studentList);
        } else {
          console.error('Failed to fetch students:', res.ResponseMsg);
        }
      },
      (error) => {
        this.loader = false;
        console.error('Error fetching students:', error);
      }
    );
  }

  loadAllStudentInitially(){
    this.filteredstudentsglobally = [...this.allStudent];
    console.log("filteredstudentsglobally ",this.filteredstudentsglobally);
  }

 // Method to check if a student is in the current batch
 isStudentInBatch(student: any): boolean {

  return this.batchwisestudents.some(batchStudent => batchStudent.userid === student.userid && batchStudent.isdeleted ===0 && student.isdeleted===0);
 }

 isStudentInOtherBatch(student: any): boolean {

  return this.allStudentsFromAllBatches.some(batchStudent => batchStudent.userid === student.userid && batchStudent.isdeleted===0 && student.isdeleted===0);
 }


filterStudentsGlobally(searchTerm: any) {
  const searchValue = searchTerm.value ? searchTerm.value.trim().toLowerCase() : '';

  if (searchValue) {
    this.filteredstudentsglobally = this.allStudent.filter((student: any) =>
      student.name.toLowerCase().includes(searchValue) || student.mobilenumber.toString().includes(searchValue)
    );
  } else {
    this.filteredstudentsglobally = [...this.allStudent];
  }

}

showGlobalArray(){
  console.log("filteredstudentsglobally ",this.filteredstudentsglobally);
}


// <!--  added filter functionalities by ravindra -->
getStudents() {
  this.loader = true;

  this.adminService.getStudentFunction('admin/getStudents').subscribe((res: any) => {
    this.loader = false;

    if (res.ResponseCode === 800) {
      // If dataSourceStudent is empty, show all students
      if (this.dataSourceStudent && this.dataSourceStudent.length > 0) {

        const batchStudentIds = this.dataSourceStudent.map((student: any) => student.userid);
        this.originalStudentList = res.data.filter((student: any) => !batchStudentIds.includes(student.userid));

      } else {
        this.originalStudentList = res.data;  // No filtering needed, display all students
      }
      console.log("data from get Student ",res.data);

      // this.studentList = [...this.allStudentWhichAreNotFromAnyBatch]
      // console.log("studentList from getStudent",this.allStudentWhichAreNotFromAnyBatch);
      // console.log("studentList from getStudent",this.studentList);

      this.allStudent = res.data;

    }
  });

}
// =================================================================================================
async editAndAccessStudent(batchid: number) {
  console.log("batchid: ",batchid);
  await this.editBatch(batchid);
  await this.acceseStudent(batchid);
  await this.acceseBatchWiseStudents(batchid);
  await this.loadAllStudentInitially();


  console.log("studentList from edAs", this.studentList);
  console.log("studentList2 from edAs", this.studentList2);

  this.isEditMode = true;

  this.studentList = [...this.allStudentWhichAreNotFromAnyBatch];
}



editBatch(batchid: number): Promise<void> {
  this.BatchId = batchid;

  console.log("this.userid: ",this.userid);
  console.log("this.BatchId ",this.BatchId);
  return new Promise((resolve, reject) => {
    this.BatchId = batchid;
    this.getBatchbyBatchidData(batchid);

    this.adminService.getFunction('admin/getBatch/' + batchid).subscribe(
      (res: any) => {
        if (res.ResponseCode === 800) {
          this.isforUpdate = true;
          this.forEditstudentIds = res.data.map((batch: { studentid: any }) => batch.studentid);

          console.log("forEditstudentIds from editBatch", this.forEditstudentIds);

          const firstBatch = res.data[0];
          const formattedFromDate = this.formatDate(firstBatch.fromdate);
          const formattedToDate = this.formatDate(firstBatch.todate);

          this.CreateBatchForm.patchValue({
            courseid: firstBatch.courseid,
            batchname: firstBatch.batchname,
            fromdate: formattedFromDate,
            todate: formattedToDate,
            studentids: this.forEditstudentIds,
            userid: firstBatch.userid,
          });
        }
        resolve();
      },
      (error) => {
        reject(error);
      }
    );
  });
}

acceseStudent(batchid: number): Promise<void> {
  return new Promise((resolve, reject) => {

    this.adminService.getStudentFunction('admin/getStudents').subscribe(
      (res: any) => {
        if (res.ResponseCode === 800) {
          const allStudents = res.data;

          this.adminService.getFunction('admin/getBatch/' + batchid).subscribe(
            (batchRes: any) => {
              if (batchRes.ResponseCode === 800) {
                const batchStudentIds = batchRes.data.map((batch: { studentid: any }) => batch.studentid);

                this.studentList2 = allStudents.filter((student: any) => !batchStudentIds.includes(student.userid));

                console.log('Students not in batch:', this.studentList2);
              }
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}


filterStudents(searchTerm: any) {
  const searchValue = searchTerm.value ? searchTerm.value.trim().toLowerCase() : '';

  if (searchValue) {
    this.studentList = this.allStudentWhichAreNotFromAnyBatch.filter((student: any) =>
      student.name.toLowerCase().includes(searchValue) || student.mobilenumber.toString().includes(searchValue)
    );
  } else {

    this.studentList = [...this.allStudentWhichAreNotFromAnyBatch];

  }

}

  // ****************************************************************************


  getCourse() {
    this.adminService.getStudentFunction('admin/getCourse').subscribe((res: any) => {
      if (res.ResponseCode === 800) {
        this.courseList = res.data;
      }
    });
  }

  validateToDate(control: AbstractControl) {
    const fromDate = new Date(this.CreateBatchForm?.get('fromdate')?.value);
    const toDate = new Date(control.value);

    if (fromDate && toDate && toDate < fromDate) {
      return { toDateLessThanFromDate: true };
    }
    return null;
  }

  validateFromDate(control: AbstractControl) {
    const toDate = new Date(this.CreateBatchForm?.get('todate')?.value);
    const fromDate = new Date(control.value);

    if (toDate && fromDate && fromDate > toDate) {
      return { fromDateGreaterThanToDate: true };
    }
    return null;
  }

  CreateBatch(event :any) {
    event.preventDefault();
    
    const formattedFromDate = this.datePipe.transform(this.CreateBatchForm?.get('fromdate')?.value, 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform(this.CreateBatchForm?.get('todate')?.value, 'yyyy-MM-dd');

    this.CreateBatchForm.patchValue({
      fromdate: formattedFromDate,
      todate: formattedToDate,
      userid: this.userid
    });

    if (!this.CreateBatchForm.valid) {
      Swal.fire({ icon: 'error', text: 'All fields required', timer: 3000 });
      return;
    }

    this.adminService.postFunction('admin/createBatch', this.CreateBatchForm.value).subscribe((res: any) => {
      if (res.ResponseCode === 800) {
        this.resetForm();
        Swal.fire({ icon: 'success', text: res.ResponseMsg, timer: 3000 }).then( ()=>{
          location.reload();
        } )

      } else {
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 });
      }
    });
  }

  getBatch() {
    this.adminService.getFunction('admin/getBatch').subscribe((res: any) => {
      if (res.ResponseCode === 800) {
        this.dataSourceBatch = new MatTableDataSource(res.data);
        this.dataSourceBatch.paginator = this.paginator;
      }
    });
  }

  getBatchbyBatchid(batchid: number) {
    const dialogRef = this.dialog.open(StudentBatchListComponent, { data: { batchid } });
    dialogRef.afterClosed().subscribe(() => {
      this.getBatch();
    });
  }


  getBatchbyBatchidData(batchid: number) {
    this.adminService.getFunction('admin/getBatch/' + batchid).subscribe((res: any) => {
      if (res.ResponseCode === 800) {
        this.dataSourceStudent = new MatTableDataSource(res.data);
        this.dataSourceStudent.paginator = this.paginator;
        this.s3Url = res.MainUrl;

        this.getStudents();
      }
    });
  }


  private formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  getSelectedStudentIDs(): string {
    const selectedStudentIds = this.studentids.value;
    if (Array.isArray(selectedStudentIds)) {
      return selectedStudentIds.join(', ');
    }
    return ''; // Return an empty string if there's no value or the value is not an array
  }

  // toggleSelectAll(checked: boolean) {
  //   if (checked) {
  //     this.studentids.setValue(this.studentList.map(student => student.userid));
  //   } else {
  //     this.studentids.setValue([]);
  //   }
  //   this.allSelected = checked;
  // }

  toggleSelectAll(checked: boolean) {
    const studentIdsControl = this.studentids;
    studentIdsControl.setValue([]); // Clear the current selection
    if (checked) {
      const allStudentIds = this.studentList.map(student => student.userid);
      studentIdsControl.setValue(allStudentIds); // Set all student IDs
    }
  }


  UpdateBatch(event: any) {
    event.preventDefault();
    const selectedStudentIds = this.studentids.value;

    if (!Array.isArray(selectedStudentIds)) {
      console.error('Selected Student IDs should be an array');
      return;
    }

    // Convert the array to a comma-separated string for submission
    // const studentIdsAsString = selectedStudentIds.join(',');

    const formValue = {
      ...this.CreateBatchForm.value,
      BatchId: this.BatchId,
      studentids: selectedStudentIds, // Replace the array with a string just before submission
    };
    console.log("formValue from updateBatch",formValue);

    if (!this.CreateBatchForm.valid) {
      Swal.fire({ icon: 'error', text: 'All fields required', timer: 3000 });
      return;
    }

    this.adminService.postFunction('admin/updateBatch', formValue).subscribe((res: any) => {
      this.isforUpdate = false;
      if (res.ResponseCode === 800) {
        this.resetForm();
        this.getBatch();
        Swal.fire({ icon: 'success', text: res.ResponseMsg, timer: 3000 });
      } else {
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 });
      }
    });
  }
// ********************************************************************************************************

deleteBatch(batchid: number) {
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
      this.adminService.postFunction('admin/deleteBatch/' + batchid + '/' + this.userid, this.CreateBatchForm.value).subscribe((res: any) => {
        this.loader = false;
        if (res.ResponseCode === 800) {
          this.acceseBatchWiseStudents(this.BatchId);
          this.dataSourceBatch = null;
          
          Swal.fire({
            title: "Deleted!",
            text: res.ResponseMsg,
            icon: "success"
          }).then(() => {
            // Reload the page after the success confirmation is acknowledged
            location.reload();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: res.ResponseMsg,
            icon: "error"
          });
        }
      });
    }
  });
}


  // *********************************************************************** new api by ravindra

  deleteStudentFromCurrentBatch(userid: number) {
    console.log("batchid: ", this.BatchId);
    console.log("userid: ", userid);

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
            this.adminService.postFunction('admin/deleteStudentFromBatch/' + this.BatchId + '/' + userid, this.CreateBatchForm.value).subscribe((res: any) => {
                this.loader = false;
                if (res.ResponseCode === 800) {
                    // Remove the student from the batchwisestudents array
                    this.batchwisestudents = this.batchwisestudents.filter(student => student.userid !== userid);
                    this.getBatch();
                    this.dataSourceBatch = null;
                    this.getStudents();
                    Swal.fire({ title: "Deleted!", text: res.ResponseMsg, icon: "success" });
                    setTimeout( ()=>{
                      location.reload();
                    }, 1000 )
                } else {
                    Swal.fire({ title: "Error!", text: res.ResponseMsg, icon: "error" });
                }
            });
        }
    });
}


  deleteStudentFromAnotherBatch(student: any) {
    console.log("student: ",student);

    Swal.fire({
      title: "Are you sure?",
      text: student.batchname ? "You are about to delete this student to this batch." : "Do you want to add this student to a batch?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: student.batchname ? "Yes, deleted it and ready to add in another batch again!" : "Yes, this student is ready to be added to a batch."
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;
        this.adminService.postFunction('admin/deleteStudentFromBatch/' + student.batchid + '/' + student.userid, this.CreateBatchForm.value).subscribe((res: any) => {
          this.loader = false;
          if (res.ResponseCode === 800) {
            this.getBatch();

            this.dataSourceBatch = null;
            this.getStudents();
            Swal.fire({ title: "Added!", text: res.ResponseMsg, icon: "success" });
            setTimeout( ()=>{
              location.reload();
            }, 1000 )
          } else {
            Swal.fire({ title: "Error!", text: res.ResponseMsg, icon: "error" });
          }
        });
      }
    });
  }
  // ********************************************************************** Testing Demo api

  TestingPayment(){
    
  }

  TestingApi() {
    const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0].name);
        formData.append('StudentId', '10001');
        formData.append('CourseId', '101');
        formData.append('AssignmentTypeId', '20');
        formData.append('FileType', 'video');
        formData.append('FilePath', 'www.facebook.com');
        formData.append('AssignmentPoints', '2000');

        this.adminService.postFunction2('appApi/insertstudentassignments', formData).subscribe(
            (res: any) => {
                // Handle the custom response
                if (res.ResponseCode === 300) {
                    console.log('Response:', res);
                } else if (res.ResponseCode === 800) {
                    this.resetForm();
                    console.log('Assignment uploaded successfully:', res);
                }
            },
            (error) => {
                // Handle other errors
                console.error('Error occurred:', error);
            }
        );
    } else {
        console.error('No file selected');
    }
   }

// TestingApi() {
//   const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;

//   if (fileInput.files && fileInput.files.length > 0) {
//       const formData = new FormData();
//       formData.append('file', fileInput.files[0]);

//       formData.append('StudentId', '10001');
//       formData.append('courseid', '101');
//       formData.append('DateOfAudioCreation', '2024-10-02 11:36:24');
//       formData.append('QuizId', '1001');
//       formData.append('single_multi', '1');
//       formData.append('friendid', '1000');


//       this.adminService.postFunction2('appApi/UploadAppPracticeAudio', formData).subscribe(
//           (res: any) => {
//               // Handle the custom response
//               if (res.ResponseCode === 300) {
//                   console.log('Response:', res);
//               } else if (res.ResponseCode === 800) {
//                   this.resetForm();
//                   console.log('Assignment uploaded successfully:', res);
//               }
//           },
//           (error) => {
//               // Handle other errors
//               console.error('Error occurred:', error);
//           }
//       );
//   } else {
//       console.error('No file selected');
//   }
// }



  // **********************************************************************



  private resetForm() {
    this.CreateBatchForm.reset();
    this.CreateBatchForm.setValue({
      courseid: null,
      batchname: null,
      fromdate: null,
      todate: null,
      studentids: [],
      userid: null,
      oldIds: null,
      v_isdeletedForBatch: null,
      batchid: null
    });
  }
}
