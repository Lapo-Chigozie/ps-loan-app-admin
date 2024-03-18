import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { SigninComponent } from './signin/signin.component';
import { UploadNetpayComponent } from './upload-netpay/upload-netpay.component';
import { AppPasswordchangeComponent } from './app-passwordchange/app-passwordchange.component';
import { AppClientrequestComponent } from './app-clientrequest/app-clientrequest.component';
import { AppClientsComponent } from './app-clients/app-clients.component';
import { AppClientMonthlyNetPaysComponent } from './app-client-monthly-net-pays/app-client-monthly-net-pays.component';
import { AppPasswordchange1Component } from './app-passwordchange1/app-passwordchange1.component';
import { AppPasswordreststatusComponent } from './app-passwordreststatus/app-passwordreststatus.component';
import { AppProfiledComponent } from './app-profiled/app-profiled.component';
import { AppEditprofileComponent } from './app-editprofile/app-editprofile.component';
import { AppMonthlyNetPayComponent } from './appMonthlyNetPay/appMonthlyNetPay.component';
import { AppLoansComponent } from './app-loans/app-loans.component';
import { AppLoanAppReviewComponent } from './app-loan-app-review/app-loan-app-review.component';
import { AppLoanReviewComponent } from './app-loan-review/app-loan-review.component';
import { AppNewloantenureComponent } from './app-newloantenure/app-newloantenure.component';
import { AppLoanTenuresComponent } from './app-loan-tenures/app-loan-tenures.component';
import { AppStaffsComponent } from './app-staffs/app-staffs.component';
import { AppAddnewsfaffComponent } from './app-addnewsfaff/app-addnewsfaff.component';
import { AppPasswordComponent } from './app-password/app-password.component';
import { AppLoandueComponent } from './app-loandue/app-loandue.component';
import { AppStaffspermissionComponent } from './app-staffspermission/app-staffspermission.component';
import { AppLoansettingsComponent } from './app-loansettings/app-loansettings.component';
import { AppPortalnoticesComponent } from './app-portalnotices/app-portalnotices.component';
import { CreateHubTeamComponent } from './CreateHubTeam/CreateHubTeam.component';
import { HubTeamsComponent } from './HubTeams/HubTeams.component';
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

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: DashboardComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'twofactorauth', component: TwoFactorAuthComponent },
  { path: 'signin', component: SigninComponent }, 
  { path: 'uploadnetpay', component: UploadNetpayComponent } ,
  { path: 'forgetpwrd', component: AppPasswordchangeComponent },
  { path: 'forgetpwrd2', component: AppPasswordchange1Component },
  { path: 'appclientrequest', component: AppClientrequestComponent },
  { path: 'appprofile', component: AppProfiledComponent },
  { path: 'apppasswordreststatus', component: AppPasswordreststatusComponent },
  { path: 'appclientmonthlynetpays', component: AppClientMonthlyNetPaysComponent },
  { path: 'appeditprofile', component: AppEditprofileComponent },
  { path: 'appmonthlynetpays', component: AppMonthlyNetPayComponent },
  { path: 'apploandetails', component: AppLoanAppReviewComponent },
  { path: 'apploanprocess', component: AppLoanReviewComponent },
  { path: 'apploantenure', component: AppNewloantenureComponent },
  { path: 'apploantenures', component: AppLoanTenuresComponent },
  { path: 'loanapps', component: AppLoansComponent },
  { path: 'appaddstaff', component: AppAddnewsfaffComponent },
  { path: 'appstaffs', component: AppStaffsComponent },
  { path: 'appdashboardpassword', component: AppPasswordComponent },
  { path: 'appstaffspermission', component: AppStaffspermissionComponent },
  { path: 'apploandue', component: AppLoandueComponent },
  { path: 'appportalnotices', component: AppPortalnoticesComponent },
  { path: 'appsettings', component: AppLoansettingsComponent },
  { path: 'appclients', component: AppClientsComponent },
  { path: 'hubTeams', component: HubTeamsComponent } ,
  { path: 'newHubTeam', component: CreateHubTeamComponent, },
  { path: 'HubTeamMembers', component: HubTeamMembersComponent,  },
  { path: 'CreateHubTeamMember', component: CreateHubTeamMemberComponent ,},
  { path: 'disbursementTeams', component: DisbursementTeamsComponent ,},
  { path: 'teamMembersByGroup', component: TeamMembersByGroupComponent, },
  { path: 'assignLoanToTeamMember', component: AssignLoanToTeamMemberComponent, },
  { path: 'disbursedLoans', component: DisbursedLoanComponent}, 
  { path: 'repaymentloans', component: RepaymentloansComponent},
  { path: 'repayments', component: RepaymentsComponent},
  { path: 'narrations', component: NarrationsComponent},
  { path: 'narrationlist', component: NarrationListComponent},
  { path: 'editteammemberpermission', component: TeamMemberPermissionEditComponent },
  { path: 'myPerissions', component: AppTeamMemberPermissionsComponent },
  { path: 'loanHistory', component: LoanHistoryComponent} , 
  {path: 'appcustomerprofile', component: AppcustomerprofileComponent}];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
