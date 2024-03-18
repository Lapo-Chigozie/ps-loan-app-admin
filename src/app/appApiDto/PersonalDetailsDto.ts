import { AccountDetailsDto } from "./AccountInfoDto";
import { BvnAuthDto } from "./BvnAuthDto";
import { BvnRespondsDto } from "./BvnRespondsDto";

export class PersonalDetailsDto 
{
    fullname:string | undefined ;
    PFNumber:string | undefined ;
    DateOfBirth:string | undefined ;
    PhoneNumber:string | undefined;
    AltPhoneNumber:string | undefined ;
    ResidentialAddress:string | undefined ;
    retDate:any | undefined;
    MaritalStatus:string | undefined ;
    nokname:string | undefined ;
    nokphone:string | undefined ;
    nokaddress:string | undefined ;

    bvnAuth!: BvnAuthDto 
    acctDetails !:AccountDetailsDto;
    BvnResponds !:BvnRespondsDto;

}
