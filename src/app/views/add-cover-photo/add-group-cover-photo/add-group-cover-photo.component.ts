import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'app/models/group';
import { Profile } from 'app/models/profile';
import { GroupService } from '../../../services/group.service';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-add-group-cover-photo',
  templateUrl: './add-group-cover-photo.component.html',
  styleUrls: ['./add-group-cover-photo.component.css']
})
export class AddGroupCoverPhotoComponent implements OnInit {
  group: Group = {};
  profile: Profile = {};
  imgurl?: string; //cover photo url
  faImage = faImage; //place holder img
  faCheckCircle = faCheckCircle; //place holder img
  uploadDesired = false;

  @Input() show: boolean = false;


  constructor(
    public imageService: ImageService,
    private modalService: NgbModal,
    private router: Router,
    private groupService: GroupService
  ) { }
  
  async ngOnInit(): Promise<void> {
    let sessionProfile = sessionStorage.getItem('profile');
    if (sessionProfile != null) {
      let tempProf = JSON.parse(sessionProfile);
    }

  }

  ngOnDestroy(): void {
    window.location.href = '/home';
  }

  //trying to use similar idea to the functional createPost(post:Post) inside post.service that's able to create a post with an image upload involved
  public createImageAddition(image: url) {
    const requestOptions = {
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem("Authorization")}`
      })
    };
    this.httpClient
      .post<Post>(environment.url + '/post', post, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        const currentValue = this.postsSubject.value;
        const updatedValue = [...currentValue, data];
        this.postsSubject.next(updatedValue);
      });
  }

  addPhoto() {
      this.group = this.groupService.currentGroup
      this.imageService.imageUploadAction();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
    
    }

  }

  closeModal() {
    this.modalService.dismissAll();
  }


  changeFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {

      let file = event.target.files[0];
      this.changeFile(file).then((e: any) => { this.addPost.imgURL = e })
    }
    this.uploadDesired = true;
  }


}
