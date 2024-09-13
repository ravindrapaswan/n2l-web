import { Component, HostListener } from '@angular/core';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   if ((event.target as Window).innerWidth <= 767) {
  //     console.log("In");
  //     $(".menu-item").click(function () {
  //       $("body").toggleClass("sidebar-enable");
  //       // $("body").toggleClass("menu-sidebar-enable");
  //       var currentSize = $("body").attr("data-sidebar-size");
  //       var newSize = (currentSize === "sm") ? "lg" : "sm";
  //       $("body").attr("data-sidebar-size", newSize);

  //       // from body active div fade background
  //       $('.over-active').toggleClass('mob-over-active');
  //     });

  //   }
  // }

  ngAfterViewInit(): void {
    if (window.innerWidth <= 767) {

      console.log("After In");

      $(".signle-menues").click(function () {
        $("body").toggleClass("sidebar-enable");
        // $("body").toggleClass("menu-sidebar-enable");
        var currentSize = $("body").attr("data-sidebar-size");
        var newSize = (currentSize === "sm") ? "lg" : "sm";
        $("body").attr("data-sidebar-size", newSize);

        // from body active div fade background
        $('.over-active').toggleClass('mob-over-active');
      });

    }
  }

  UserState: number = 0;

  constructor(private shareService: ShareService) {
    if (this.shareService.isLogin$) {
      this.UserState = this.shareService.currentUser.teacher_student //getted decoded token
    }


  }

  ngOnInit() {
    // this.sidebarEnableDisable();
  }


  sidebarEnableDisable() {

    $(document).ready(function () {
      $(".menu-item").click(function () {
        $("body").toggleClass("sidebar-enable");
        // $("body").toggleClass("menu-sidebar-enable");
        var currentSize = $("body").attr("data-sidebar-size");
        var newSize = (currentSize === "sm") ? "lg" : "sm";
        $("body").attr("data-sidebar-size", newSize);

        // from body active div fade background
        $('.over-active').toggleClass('mob-over-active');
      });
    });


    // $(window).on('resize', function () {
    //   var win = $(this);
    //   if ((win as any).width() <= 420) {

    //     console.log("Clicked")

    //   }
    // });

  }

}

