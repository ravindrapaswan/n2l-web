import { Component } from '@angular/core';
import {FormGroup , FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// Services
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  // New Codes
  RegisterBox: boolean = true;
  OtpInputBox: boolean = false;
  PasswordBox: boolean = false;

  GenerateOtpForm: FormGroup = this.fb.group({
    Name: ['', [Validators.required]],
    MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}$")]],
    email: ['', Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i)],
    mobileOtp: [''],
    emailOtp: [''],
    OtpId: [''],
    password: [''],
    confirmPassword: [''],
  });


  paymentDataForm = this.fb.group({
    name: [''],
    mobileNumber: [''],
  });

  transferData() {
    this.paymentDataForm.patchValue({
      name: this.GenerateOtpForm.get('Name')?.value,
      mobileNumber: this.GenerateOtpForm.get('MobileNumber')?.value,
    });
  }

  async PayAndResisterHandle(){
    await this.transferData()
    this.generateOTP()
  }



  PasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/i)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/i)]]
  })

  OtpId: number = 0;
  generateOTP() { //Generate OTP
    if (!this.GenerateOtpForm.valid) {
      return;
    } 

    this.userService.sendOtpFunction('users/GenerateOtp', this.GenerateOtpForm.value).subscribe((res: any) => {
      if (res.ResponseCode == 800) {
        this.OtpId = res.OtpId;
        this.RegisterBox = false;
        this.OtpInputBox = true;
      } else {
        console.log("Not found mobile or email")
      }
    })
  }

  // OTP verification Started
  mobileOtp: string = '';
  onMobileOtpChange(Event: string) {
    if(Event.length == 4){
      this.mobileOtp = Event;
    }else{
      this.mobileOtp
    }
  }

  emailOtp: string = '';
  onEmailOtpChange(Event: string) {
    if(Event.length == 4){
      this.emailOtp = Event;
    }else{
      this.emailOtp =''
    }
  }

  NotVerified: boolean = false; //When Otp not Matched
  verified: boolean = false; //When Otp not Matched
  btnOtpSubmit: boolean = false;

  PayAndResister() {

    this.userService.registerFunction('appApi/create-order', this.paymentDataForm.value).subscribe(
      (res: any) => {
        if (res.ResponseCode == 800) {
          // Handle successful registration/payment initiation
          console.log('Registration successful', res);
  
          if (res?.url) {
            // Navigate to the payment page if the URL exists in the response
            window.location.href = res.url;
          } else {
            // Handle the case where the URL is missing in the response
            console.error('Payment URL not found in response');
          }
        } else {
          // Handle registration failure (e.g., invalid data, backend issue)
          console.error('Registration failed:', res.ResponseMsg || 'Unknown error');
          // Optionally display an error message to the user
        }
      },
      (error: any) => {
        // Handle network or server errors
        console.error('API error occurred:', error);
        // Optionally show a generic error message to the user
      }
    );
  }
  

  VerifyOtp() {
    if (this.mobileOtp.length == 4) {
      this.GenerateOtpForm.patchValue({
        mobileOtp: this.mobileOtp,
        emailOtp: this.emailOtp,
        OtpId: this.OtpId
      })
      this.userService.verifyOtpFunction('users/VerifyOtp', this.GenerateOtpForm.value).subscribe((res: any) => {
        if (res.ResponseCode == 800) {
          this.verified = true;


          // setTimeout(() => {
          //   this.OtpInputBox = false;
          //   this.PasswordBox = true;
          // }, 2000);

          setTimeout( ()=>{
            this.PayAndResister()
          }, 2000);


        } else if (res.ResponseCode == 300) {
          this.NotVerified = true;
          this.OtpInputBox = false;
          this.RegisterBox = true;
        }
      })

    } else {
      this.btnOtpSubmit = true;
    }
  }
  //OTP varification End

  //Password Validation Check
  PassValidation: boolean = false;
  checkPassword() {
    if (this.PasswordForm.valid) {
      if (this.PasswordForm.value.password == this.PasswordForm.value.confirmPassword) {
        this.GenerateOtpForm.patchValue({
          password: this.PasswordForm.value.password,
          confirmPassword: this.PasswordForm.value.confirmPassword
        })
        this.verifyAndRegister(); //Register Method Call here
      } else {
        this.PassValidation = true;
      }
    } else {
      console.log("Please Enter Valid Password")
    }
  }

  verifyAndRegister() {
    this.userService.registerFunction('users/Register', this.GenerateOtpForm.value).subscribe((res: any) => {
      if (res.ResponseCode == 800) {
        Swal.fire({ icon: 'success', text: res.ResponseMsg, timer: 3000 })
        this.RegisterBox = true;
        this.PasswordBox = false;
        this.GenerateOtpForm.reset();
        this.PasswordForm.reset();
        this.PassValidation = false;
      } else if(res.ResponseCode == 300 ){
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
        this.RegisterBox = true;
        this.PasswordBox = false;
        this.GenerateOtpForm.reset();
        this.PasswordForm.reset(); 
      }
      else {
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
        this.RegisterBox = true;
        this.PasswordBox = false;
        this.GenerateOtpForm.reset();
        this.PasswordForm.reset();
      }
    })

  }

}