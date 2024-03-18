import { AccountDetailsDto } from "./appApiDto/AccountInfoDto";
import { BvnRespondsDto } from "./appApiDto/BvnRespondsDto";
import { PersonalDetailsDto } from "./appApiDto/PersonalDetailsDto";

export class StaticData 
{
    public static  properties : boolean = false;
    public static  BvnDetail: BvnRespondsDto;
    public static  AcctDetail: AccountDetailsDto;

    public  static  PersonalDetails:PersonalDetailsDto;
    public  static  IsRoutingPage:boolean = false;

    
    public  static  DateLoginKeySession:string = "DateLoginKeySession";
    public  static  TimeLoginKeySession:string = "TimeLoginKeySession";

    public  static  LoginKeySession:string = "AdminLoginKeySession1Admin";
    public  static  AdminTwoLoginKeySession:string = "AdminTwoLoginKeySession1Admin";
    public  static  LoginAcctDetailsKeySession:string = "LoginAcctDetailsKeySession1Admin";

    public static SpriningListStype =  [ "ball-8bits",
    "ball-atom" ,
     "ball-beat" ,
     "ball-circus" ,
    "ball-climbing-dot",
     "ball-clip-rotate",
       "ball-clip-rotate-multiple" ,
      "ball-clip-rotate-pulse" ,
      "ball-elastic-dots" ,
      "ball-fall" ,
      "ball-fussion",
      "ball-grid-beat",
      "ball-grid-pulse",
      "ball-newton-cradle",
      "ball-pulse" ,
      "ball-pulse-rise" ,
      "ball-pulse-sync" ,
      "ball-rotate" ,
      "ball-running-dots" ,
      "ball-scale" ,
      "ball-scale-multiple",
      "ball-scale-pulse" ,
      "ball-scale-ripple" ,
      "ball-scale-ripple-multiple",
      "ball-spin" ,
      "ball-spin-clockwise",
      "ball-spin-clockwise-fade" ,
      "ball-spin-clockwise-fade-rotating" ,
      "ball-spin-fade" ,
      "ball-spin-fade-rotating",
      "ball-spin-rotate" ,
      "ball-square-clockwise-spin" ,
      "ball-square-spin" ,
      "ball-triangle-path" ,
      "ball-zig-zag" ,
      "ball-zig-zag-deflect" ,
      "cog" ,
     "cube-transition" ,
      "fire" ,
     "line-scale",
      "line-scale-party" ,
      "line-scale-pulse-out" ,
      "line-scale-pulse-out-rapid",
      "line-spin-clockwise-fade" ,
      "line-spin-clockwise-fade-rotating" ,
      "line-spin-fade",
      "line-spin-fade-rotating" ,
      "pacman" ,
    "square-jelly-box" ,
      "square-loader" ,
      "square-spin" ,
      "timer",
     "triangle-skew-spin" ];



    
    public  static  FileSize:string = "19194 KB";
    public  static  FileMaxSize  = 19194;
    public static FileExtension = "xlsx";
    public  static  SiginLink = "http://localhost:51166/signin";

   

     public static GetRouteNames():any{
      var RouteNameList:any[] = [
          { Name:'dashboard', Description:'Mustermann'},
          { Name:'appprofile', Description:'Mustermann'},
          { Name:'appclients', Description:'Mustermann'},
          { Name:'appeditprofile', Description:'Mustermann'},
          { Name:'appclientrequest', Description:'Mustermann'},
          { Name:'appclientmonthlynetpays', Description:'Mustermann'}
      ];
        
      return RouteNameList;
    }
}
