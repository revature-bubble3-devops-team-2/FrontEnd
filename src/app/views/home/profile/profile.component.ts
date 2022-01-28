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

//   onUpload() {
//     this.loading = !this.loading;
//     console.log('=================================================')
//     console.log(this.file);
//     console.log('=================================================')
//     this.profileService.upload(this.file).subscribe(
//         (event: any) => {
//             if (typeof (event) === 'object') {

//                this.shortLink = event.link;
//                console.log(this.shortLink )
//                 this.key = event.key;
//                 this.shortLink = `https://www.file.io/download/${this.key}`;

//                 this.loading = false; // Flag variable
//             }
//         }
//     );
// }



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
      const type = file.type;
      this.changeFile(file).then((base64: any): any => {
        this.profileService.setImhg(base64)
        console.log(this.profileService.getProfile());
        console.log(base64);

        this.profileService.updateProfile(this.profileService.getProfile()).subscribe(d=> console.log(d))


      });


    // this.httpClient.post('http://localhost:8082/image/add', imageFormData, { observe: 'response' })
    // .subscribe((response : any) => {

    //   console.log(response)

    // }



    // );


    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event :any) => { // called once readAsDataURL is completed
      console.log(event.target.result)
      this.url = event.target.result;
    }
  }

}

public delete(){
  this.url = null;
}







}
