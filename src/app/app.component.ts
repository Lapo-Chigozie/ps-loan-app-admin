import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { StaticData } from './StaticData';
import { Location } from '@angular/common';
import { SpinnerService } from './spinner.service';
import { AdminserviceService } from './adminservice.service';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from './local-storage.service';
import {  Inject, InjectionToken } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
    public title = 'LapoLoan Clients';
    public href: string = "";
    public ShowRouteLet: boolean = false;
    public ShowAdminRouteLet: boolean = false;
    private AppId:any;
    private SessionResult:any;

    @ViewChild('mainScreen') elementView: ElementRef | undefined;
      viewHeight: number | undefined;
   
    constructor(@Inject('Window') private window: Window, private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) { }
  
   public ngAfterContentInit(): void {
      //Called after ngOnInit when the component's or directive's content has been initialized.
      //Add 'implements AfterContentInit' to the class.
      
    }

    public  ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      
    }

    private showUp(): void 
    {
      // this.contentPage2?.nativeElement.scrollTo( -0, -0 );
        // this.contentPage?.nativeElement.scrollIntoView();
        window.scroll(0,0);
     }
    
    public  heightScren:any = this.window.innerHeight;
    
    ngOnInit() 
    {

          this.heightScren = this. window.innerHeight + 200;

          // console.log(this.route.snapshot); 

          // this.route.url.subscribe(([url]) => {
          //   const { path, parameters } = url;
          //   console.log(path); // e.g. /products
          //   console.log(parameters); // e.g. { id: 'x8klP0' }
          // });

          this.showUp();
          this.router.events.forEach((event) => {

          let event1 = event as NavigationStart

          // console.log(event1.url); 
        
          if (event instanceof NavigationStart || event instanceof NavigationEnd) 
          {
                console.log(event.url); 
                if(event.url.includes("/signin") || event.url.includes("/apppasswordreststatus") || event.url.includes("/forgetpwrd1") || event.url.includes("/forgetpwrd") || event.url.includes("/twofactorauth"))
                {
                    this.showUp();
                    this.ShowRouteLet = true;
                    this.ShowAdminRouteLet = false;
                    return;
                }
                else  if(event.url.includes('/dashboard') || event.url.includes("/") || event.url.includes(""))
                {
                    this.showUp();
                    this.ShowRouteLet = false;
                    this.ShowAdminRouteLet = true;
                    this.SessionChecker();
                    return;
                }
          }
      });

        //  console.log(this.route.snapshot); // ActivatedRouteSnapshot
        // console.log(this.route.snapshot.url); // UrlSegment[]
        // console.log(this.route.snapshot.url[0]); // UrlSegment
        // console.log(this.route.snapshot.url[0].path); // e.g. /products
        // console.log(this.route.snapshot.url[0].parameters); // e.g. { id: 'x8klP0' }

        // this.router.events.subscribe((val) => {
        //   if(location.path() != ''){
        //     this.route = location.path();
        //   } else {
        //     this.route = 'Home'
        //   }
        // });

          //  this.href = this.router.url;
          // console.log(this.router.url);

          // if( this.href=="/twofactorauth" || this.href== "/signin"){
          //    this.ShowRouteLet = true;
          // }
          //  else{
          //    this.ShowRouteLet = false;
          //  }
    }

    public onSignOut(event:any)
    {
        this.onNaviagateBack('/signin');
        return;
    }

    private onNaviagateBack(page:string)
    {
        this.router.navigate([page]);
        return;
    }

    public SessionChecker():void 
    {
            this.SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
            // console.log("Session Result " + this.SessionResult);
            try
            {   
                if(this.SessionResult  == "" || this.SessionResult  == undefined || this.SessionResult  == null || this.SessionResult  == StaticData.LoginKeySession)
                {
                    this.onSignOut(null);
                    return;
                }
            }
            catch(e)
            {
                //console.log('Display: ' + e);
                this.onSignOut(null);
                return;
            }
    }
}
