import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  updated: boolean = false;
  credential: string = "";
  key ="";
  url : any = this.profileService.getProfile().imgurl;

  shortLink: string =`../../../../assets/favicon.png`;
  loading: boolean = false; // Flag variable
  file: File | any = null;


  ngOnInit(): void {
      console.log(this.profileService.getProfile())
  }


  constructor(private profileService: ProfileService , private httpClient : HttpClient ) { }

 get profile(){
    let sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
     return JSON.parse(sessionProfile);
    }
  }


  onChange(event : any) {
    this.file = event.target.files[0];
}






changeFile(file: any) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
}


/*
@autor update image team

*/

onSelectFile(event : any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    const imageFormData = new FormData();
    imageFormData.append('image',event.target.files[0] , "marouane");

      const file = event.target.files[0];
      this.changeFile(file).then((base64: any): any => {
        this.profileService.setImhg(base64)
        console.log(this.profileService.getProfile());
        console.log(base64);

        this.profileService.updateProfile(this.profileService.getProfile()).subscribe(d=> console.log(d))


      });





    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (e:any) => { // called once readAsDataURL is completed
      console.log(e.target.result)
      this.url = e.target.result;
    }
  }

}

public delete(){
  this.url = null;
}







}
