export class Profile {

    pid?:number;
    firstName?:string;
    lastName?:string;
    passkey?:string;
    email?:string;
    username?:string;
    imgurl?: string;
    verification?: boolean;


    constructor(pid:number, firstName:string, lastName:string, passkey:string, email:string, username:string, verification: boolean){

        this.pid = pid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passkey = passkey;
        this.email = email;
        this.username = username;
        this.verification = verification;

    }
}
