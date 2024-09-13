import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// Services
import { UserService } from 'src/app/Services/user.service';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  ForgetFromBox: boolean = true;
  OtpBox: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private shareService: ShareService
  ) {
  }

  ForgetForm: FormGroup = this.fb.group({
    MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}$")]],
    mobileOtp: [''],
    OtpId:['']
  });


  // OTP verification Started
  mobileOtp: string = '';
  onMobileOtpChange(Event: string) {
    if (Event.length == 4) {
      this.mobileOtp = Event;
    } else {
      this.mobileOtp
    }
  }

  //Inserted OtpId
  OtpId:number=0;

  // Generate Otp method
  generateOTP() {
    // form Validation Check
    if (!this.ForgetForm.valid) {
      Swal.fire({ icon: 'error', text: "Enter Valid Mobile Number", timer: 3000 });
      return;
    };

    //API calling method
    this.userService.GenerateOtoFunction('users/GenerateOtpForgetPass', this.ForgetForm.value).subscribe((res: any) => {
      // Conditions as per Response
      if(res.ResponseCode=800){
        this.OtpId = res.OtpId;
        this.OtpBox = true;
      }else if(res.ResponseCode==300){
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
      }else if(res.ResponseCode==500){
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
      }else{
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
      }
    })
  }

  MobileVerified: boolean = false;
  MobileNotVerified: boolean = false;

  VerifyOtp() {

    this.ForgetForm.patchValue({
      mobileOtp: this.mobileOtp,
      OtpId: this.OtpId
    })

    this.userService.VerifyAndForgetPass('users/forgetPassword', this.ForgetForm.value).subscribe((res:any)=>{
      if(res.ResponseCode=800){
        this.MobileVerified = true;
        this.OtpBox = false;
      }else if(res.ResponseCode==300){
        this.MobileNotVerified = true;
      }else if(res.ResponseCode==500){
        alert("Internal Server Error")
      }else{
        alert("Something went wrong")
      }

    })
  }

  

}
