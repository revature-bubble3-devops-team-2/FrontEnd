import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {



  constructor(private httpClient: HttpClient) { }

  uploadedImage: File | any;
  dbImage: any;
  postResponse: any;
  successResponse: string | any;
  image: any;

  public onImageUpload(event : any) {
    this.uploadedImage = event.target.files[0];
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post(`${environment.url}/image/add`, imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log(response)
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );

    }


    viewImage() {
      this.httpClient.get(`${environment.url}/get/image/info/` + this.image)
        .subscribe(
          res => {
            this.postResponse = res;
            this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          }
        );
    }




}
