export class EmailModel {

    email?:string;
    url?:string;
    passkey?: string


    constructor(email:string, url:string, passkey:string){

        this.email = email;
        this.url = url;
        this.passkey = passkey;
       
    }
}