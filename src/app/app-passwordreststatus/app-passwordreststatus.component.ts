import { Component, OnInit } from '@angular/core';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-app-passwordreststatus',
  templateUrl: './app-passwordreststatus.component.html',
  styleUrls: ['./app-passwordreststatus.component.css']
})

export class AppPasswordreststatusComponent implements OnInit
{
  identification:string="";
  statusTitle:string ="";
  statusMessge:string ="";
  imageName:string = "";
  LoginLink:string = "";
  success:boolean = false;
  ResponseData: RespondMessageDto | undefined;
  showLink:boolean = false;

  constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) { }
  
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }
  
  ngOnInit(): void  
  {
       try{

        
        this.statusTitle = this.route.snapshot.queryParams["messageTitle"];
        this.statusMessge = this.route.snapshot.queryParams["statusMessge"];
        this.imageName = this.route.snapshot.queryParams["imageName"];
        this.LoginLink = this.route.snapshot.queryParams["SiginLink"];

        // console.log("statusTitle" + this.LoginLink);
        if(this.statusTitle === "" || this.statusMessge === "" || this.imageName === "")
        {
            this.onNaviagateBack('/forgetpwrd');
            return;
        }

        this.success = true;
        
        if(this.LoginLink == "" || this.LoginLink == null)
        {
            this.showLink = false;
            return;
        }
        else
        {
            this.showLink = true;
            return;
        }

        this.success = true;
        return;
    }
    catch(e)
    {
         //console.log('Display: ' + e);
         this.onNaviagateBack('/forgetpwrd');
         return;
    }
    
  }

  private onNaviagateBack(page:string): void
  {
     this.router.navigate([page]);
     return;
  }
}
