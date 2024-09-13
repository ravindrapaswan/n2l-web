import { Component,Renderer2 } from '@angular/core';
import { ShareService } from './Services/share.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ELearning_Web';

  isLogin = false;

  constructor(private shareService: ShareService, private renderer: Renderer2,public router: Router) {
    // if (this.shareService.isLogin$) {
    //    this.LoginState();
    // }
  }

  ngOnInit(){
    this.shareService.isLogin$.subscribe((value) => {
      this.isLogin = value;
      this.callJS();
    });
 }

  // LoginState() {
  //   this.shareService.isLogin$.subscribe((isLogin) => {
  //     this.isLogin = isLogin;
  //   });
  // }

 
  callJS(){ //for side bar dropdown

    if(this.isLogin == true){

      $(document).ready(function () {
        $("#vertical-menu-btn").click(function () {
          $("body").toggleClass("sidebar-enable");
          var currentSize = $("body").attr("data-sidebar-size");
          var newSize = (currentSize === "sm") ? "lg" : "sm";
          $("body").attr("data-sidebar-size", newSize);
      
          // from body active div fade background
          $('.over-active').toggleClass('mob-over-active');
        });
      });
      
      // left side Dropdown menu
      $(document).ready(function () {
        // Handle click events on menu items
        $('.menu-item').click(function () {
          // Toggle the submenu for the clicked item
          $(this).find('.submenu').slideToggle();
      
          // Hide other open submenus
          $('.menu-item').not(this).find('.submenu').slideUp();
        });
      });      
    }
  }
}
