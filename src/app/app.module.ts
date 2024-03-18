import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTopComponent } from './admin-top/admin-top.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerLoadingComponent } from './spinner-loading/spinner-loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin/signin.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { UploadNetpayComponent } from './upload-netpay/upload-netpay.component';
import { AppClientsComponent } from './app-clients/app-clients.component';
import { AppPasswordchangeComponent } from './app-passwordchange/app-passwordchange.component';
import { AppClientrequestComponent } from './app-clientrequest/app-clientrequest.component';
import { AppClientMonthlyNetPaysComponent } from './app-client-monthly-net-pays/app-client-monthly-net-pays.component';
import { AppPasswordreststatusComponent } from './app-passwordreststatus/app-passwordreststatus.component';
import { AppPasswordchange1Component } from './app-passwordchange1/app-passwordchange1.component';
import { AppProfiledComponent } from './app-profiled/app-profiled.component';
import { AppEditprofileComponent } from './app-editprofile/app-editprofile.component';
import { AppLoanAppReviewComponent } from './app-loan-app-review/app-loan-app-review.component';
import { AppLoanReviewComponent } from './app-loan-review/app-loan-review.component';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { AppMonthlyNetPayComponent } from './appMonthlyNetPay/appMonthlyNetPay.component';
import { AppLoansComponent } from './app-loans/app-loans.component';
import { AppNewloantenureComponent } from './app-newloantenure/app-newloantenure.component';
import { AppLoanTenuresComponent } from './app-loan-tenures/app-loan-tenures.component';
import { AppAddnewsfaffComponent } from './app-addnewsfaff/app-addnewsfaff.component';
import { AppStaffsComponent } from './app-staffs/app-staffs.component';
import { AppPasswordComponent } from './app-password/app-password.component';
import { AppLoandueComponent } from './app-loandue/app-loandue.component';
import { AppLoaninterestComponent } from './app-loaninterest/app-loaninterest.component';
import { AppBasedComponent } from './app-based/app-based.component';
import { AppLoansettingsComponent } from './app-loansettings/app-loansettings.component';
import { AppRouterService } from './AppRouter.service';
import { AppPortalnoticesComponent } from './app-portalnotices/app-portalnotices.component';
import { AppStaffspermissionComponent } from './app-staffspermission/app-staffspermission.component';
/// import { AppStaffsPermissionsDtComponent } from './AppStaffsPermissionsDt/AppStaffsPermissionsDt.component';

import { HubTeamsComponent } from './HubTeams/HubTeams.component';
import { CreateHubTeamComponent } from './CreateHubTeam/CreateHubTeam.component';
import { HubTeamMembersComponent } from './HubTeamMembers/HubTeamMembers.component';
import { CreateHubTeamMemberComponent } from './CreateHubTeamMember/CreateHubTeamMember.component';
import { TeamMembersByGroupComponent } from './TeamMembersByGroup/TeamMembersByGroup.component';
import { DisbursementTeamsComponent } from './disbursementTeams/disbursementTeams.component';
import { AssignLoanToTeamMemberComponent } from './AssignLoanToTeamMember/AssignLoanToTeamMember.component';
import { DisbursedLoanComponent } from './DisbursedLoan/DisbursedLoan.component';
import { RepaymentloansComponent } from './repaymentloans/repaymentloans.component';
import { RepaymentsComponent } from './repayments/repayments.component';
import { NarrationsComponent } from './Narrations/Narrations.component';
import { NarrationListComponent } from './NarrationList/NarrationList.component';
import { TeamMemberPermissionEditComponent } from './TeamMemberPermissionEdit/TeamMemberPermissionEdit.component';
import { LoanHistoryComponent } from './loanHistory/loanHistory.component';
import { AppTeamMemberPermissionsComponent } from './app-TeamMemberPermissions/app-TeamMemberPermissions.component';
import { AppcustomerprofileComponent } from './appcustomerprofile/appcustomerprofile.component';

@NgModule({
  declarations: [	
    AppComponent,
    AdminTopComponent,
    AdminMenuComponent,
    DashboardComponent,
    SpinnerLoadingComponent,
    SigninComponent,
    TwoFactorAuthComponent,
    AppcustomerprofileComponent,
    UploadNetpayComponent,
    AppClientsComponent,
    AppPasswordchangeComponent,
    AppClientrequestComponent,
    AppClientMonthlyNetPaysComponent,
    AppPasswordreststatusComponent,
    AppPasswordchange1Component,
    AppProfiledComponent,
    AppEditprofileComponent,
    AppLoanAppReviewComponent,
    AppLoanReviewComponent,
    AppMonthlyNetPayComponent,
    AppLoansComponent,
    AppNewloantenureComponent,
    AppLoanTenuresComponent,
    AppAddnewsfaffComponent,
    AppStaffsComponent,
    AppPasswordComponent,
    AppLoandueComponent,
    AppStaffspermissionComponent,
    AppLoaninterestComponent,
    AppBasedComponent,
    AppLoansettingsComponent,
    AppPortalnoticesComponent,
   
    HubTeamsComponent,
    CreateHubTeamComponent,
    HubTeamMembersComponent,
    CreateHubTeamMemberComponent,
    TeamMembersByGroupComponent,
    DisbursementTeamsComponent,
    AssignLoanToTeamMemberComponent,
    DisbursedLoanComponent,
    RepaymentloansComponent,
    RepaymentsComponent,
    NarrationsComponent,
    NarrationListComponent,
    TeamMemberPermissionEditComponent,
    LoanHistoryComponent,
    AppTeamMemberPermissionsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(), AppRouterService, { provide: 'Window', useValue: Window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
