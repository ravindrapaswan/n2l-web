import { Component } from '@angular/core';
import {FormGroup , FormBuilder, Validators } from '@angular/forms';


import Swal from 'sweetalert2';
// Services
import { UserService } from 'src/app/Services/user.service';
import { data } from 'jquery';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; //for environment URL
import { Observable, catchError, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap, window } from 'rxjs/operators';
import { transition } from '@angular/animations';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  pollSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router


  ) { }

  async ngOnInit() {

      // Check if redirected back from PayU with transactionId
      const transactionId = this.route.snapshot.queryParams['transactionid'];
      const name = this.route.snapshot.queryParams['name'];
      const phone = this.route.snapshot.queryParams['phone'];
      const email = this.route.snapshot.queryParams['email'];

      console.log("transactionId ",transactionId);

      console.log("GenerateOtpForm before: ",this.GenerateOtpForm.value)

      await this.GenerateOtpForm.patchValue({
        Name: name,
        MobileNumber: phone,
        email: email,
      })

      console.log("GenerateOtpForm after : ",this.GenerateOtpForm.value)

      if (transactionId) {
        this.RegisterBox = false;
        await Swal.fire({ icon: 'success', text: "User paid and registered successfully.", timer: 3000 })
        this.router.navigate(['/home']);
      }
    
  }



  // New Codes
  RegisterBox: boolean = true;
  OtpInputBox: boolean = false;
  PasswordBox: boolean = false;
  isLoading: boolean = false; // New loading state

  successUrl: String = 'https://n2lacademy.in/api/appApi/success';
  failureUrl: String = 'https://n2lacademy.in/api/appApi/failure';

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
    email: ['']
  });

  transferData() {
    this.paymentDataForm.patchValue({
      name: this.GenerateOtpForm.get('Name')?.value,
      mobileNumber: this.GenerateOtpForm.get('MobileNumber')?.value,
      email: this.GenerateOtpForm.get('email')?.value
    });
  }

  normalizeMobileNumber() {
    let mobile = this.GenerateOtpForm.controls['MobileNumber'].value;
    mobile = mobile.replace(/^(\+91|91|0)/, ''); // Normalize the mobile number
    this.GenerateOtpForm.controls['MobileNumber'].setValue(mobile); // Set normalized value back
  }

  async PayAndResisterHandle(){

    await this.transferData()
    await this.PayAndResister()
    
    // this.userService.getDataFunction2('users/CheckUserRegistration', this.GenerateOtpForm.value).subscribe( async (res: any) =>{
    //   console.log("GenerateOtpForm ",res.data)
    //   if(res.ResponseCode == 800 && res.isRegistered == true){

    //     Swal.fire({ icon: 'success', text: "User Already Registered", timer: 3000 });

    //     this.router.navigate(['/home']);
        
    //   }
    //   else{
    //     await this.transferData()
    //     await this.PayAndResister()
    //   }
    // })

  }



  PasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/i)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/i)]]
  })


  async VerifyOtp() {
    this.isLoading = true;
    if (this.mobileOtp.length == 4) {
      this.GenerateOtpForm.patchValue({
        
        mobileOtp: this.mobileOtp,
        emailOtp: this.emailOtp,
        OtpId: this.OtpId
      })

      console.log("GenerateOtpForm giving to VerifyOtp",this.GenerateOtpForm.value)
      this.userService.verifyOtpFunction('users/VerifyOtp', this.GenerateOtpForm.value).subscribe((res: any) => {
        console.log("VerifyOtp response: ", res);
        if (res.ResponseCode == 800) {
          this.verified = true;

          setTimeout( async ()=>{
            await this.PayAndResister()
          }, 1000);


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


  OtpId: number = 0;
  generateOTP() { //Generate OTP
    this.isLoading = true;
    if (!this.GenerateOtpForm.valid) {
      return;
    } 

    console.log("GenerateOtpFormmm ",this.GenerateOtpForm)

    this.userService.sendOtpFunction('users/GenerateOtp', this.GenerateOtpForm.value).subscribe((res: any) => {
      console.log("Otp res", res)
      if (res.ResponseCode == 800) {
        this.OtpId = res.OtpId;
        this.RegisterBox = false;
        this.isLoading = false;
        // this.OtpInputBox = true;
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

 // Call this method after initiating the payment
 startPolling(txnid: string) {
  const pollInterval = setInterval(() => {
    this.http.get<any>(`https://n2lacademy.in/api/appApi/getResponse?transactionid=${txnid}`)
      .subscribe(response => {
        console.log('Polling response:', response);

        // Check if response and data exist
        if (response && response.data && response.data.length > 0) {
          const paymentStatus = response.data[0].status; // Assuming response.data[0] contains the order record

          if (paymentStatus === 'Paid') {
            console.log("Payment Paid", response);

            this.OtpInputBox = false;
            this.RegisterBox = false;
            this.PasswordBox = true;
           
            clearInterval(pollInterval); // Stop polling once the payment is successful
            // Redirect to the register page
            this.router.navigate(['/register']);

            console.log("GenerateOtpForm after payment done: ",this.GenerateOtpForm)
          

          } else if (paymentStatus === 'Pending') {
            console.log("Payment is still pending");
            // Continue polling since the payment is not yet done
          }
        } else {
          console.log("No valid response, continue polling...");
        }
      }, error => {
        console.error('Error during polling:', error);
        // Optionally, clear the interval if you want to stop polling on error
        clearInterval(pollInterval);
      });
  }, 5000); // Poll every 5 seconds (adjust interval as needed)
}



  PayAndResister() {

    console.log("PayAndResister called",);
    console.log("paymentDataForm from PayAndResister ",this.paymentDataForm.value)

    this.isLoading = true;

    this.userService.registerFunction('appApi/create-order', this.paymentDataForm.value).subscribe(
      async (res: any) => {

        console.log("Response data with hash", res.data);

        this.isLoading = false;

        const form = await document.createElement('form'); 
        form.method = await 'POST';
        form.action = await 'https://sucure.payu.in/_payment'; // PayU Production URL, use https://test.payu.in/_payment for testing

        // Add form fields with the necessary payment details
        await form.appendChild(this.createHiddenField('key', res.data.key));
        await form.appendChild(this.createHiddenField('hash', res.data.hash));
        await form.appendChild(this.createHiddenField('txnid', res.data.txnid));
        await form.appendChild(this.createHiddenField('amount', res.data.amount));
        await form.appendChild(this.createHiddenField('firstname', res.data.firstname));
        await form.appendChild(this.createHiddenField('email', res.data.email));
        await form.appendChild(this.createHiddenField('productinfo', res.data.productinfo));
        await form.appendChild(this.createHiddenField('udf1', res.data.udf1));
        await form.appendChild(this.createHiddenField('udf2', res.data.udf2));
        await form.appendChild(this.createHiddenField('udf3', res.data.udf3));
        await form.appendChild(this.createHiddenField('udf4', res.data.udf4));
        await form.appendChild(this.createHiddenField('udf5', res.data.udf5));
        await form.appendChild(this.createHiddenField('surl', `https://n2lacademy.in/api/appApi/success?transactionid=${res.data.txnid}&amount=${res.data.amount}&name=${res.data.firstname}&phone=${res.data.phone}&email=${res.data.email}`)); // Success URL
        await form.appendChild(this.createHiddenField('furl', 'https://n2lacademy.in/api/appApi/failure')); // Failure URL

        await document.body.appendChild(form);
        await form.submit();

      },
      (error: any) => {
        // Handle network or server errors
        console.error('API error occurred:', error.message);
        // Optionally show a generic error message to the user
      }
    );
  }


  

  createHiddenField(name: string, value: string) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
  }
  

  
  //OTP varification End

  //Password Validation Check
  PassValidation: boolean = false;
  checkPassword() {
    if (this.PasswordForm.valid) {

      if (this.PasswordForm.value.password == this.PasswordForm.value.confirmPassword) {
        
        this.verifyAndRegister(); //Register Method Call here
      } else {
        this.PassValidation = true;
      }
    } else {
      console.log("Please Enter Valid Password")
    }
  }

  async verifyAndRegister() {

    await this.GenerateOtpForm.patchValue({
      ...this.GenerateOtpForm.value,
      confirmPassword: this.PasswordForm.value.confirmPassword,
      password: this.PasswordForm.value.password
      
    })
    console.log("PasswordForm from verifyAndRegister: ",this.GenerateOtpForm.value)
    
    this.userService.registerFunction('users/Register', this.GenerateOtpForm.value).subscribe( (res: any) => {
      console.log("response from server: ",res);
      if (res.ResponseCode == 800) {
        
        this.RegisterBox = false;
        this.PasswordBox = false;
        this.PassValidation = false;
        this.GenerateOtpForm.reset();
        this.PasswordForm.reset();

        Swal.fire({ icon: 'success', text: res.ResponseMsg, timer: 3000 })

        setTimeout(async () => {
          await Swal.fire({
            icon: 'success', // Icon type
            title: 'Redirecting to home page.', // Title of the alert
            timer: 3000 // Auto close after 3 seconds
          });
          this.router.navigate(['/home']);
        }, 1000);
        
      } else if(res.ResponseCode == 300 ){
        console.log("verifyAndRegister else if part called: ",res);
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
        this.RegisterBox = true;
        this.PasswordBox = false;
        this.GenerateOtpForm.reset();
        this.PasswordForm.reset(); 
      }
      else {
        console.log("verifyAndRegister else part called: ",res);
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
        this.RegisterBox = true;
        this.PasswordBox = false;
        this.GenerateOtpForm.reset();
        this.PasswordForm.reset();
      }
    })

  }


  

}