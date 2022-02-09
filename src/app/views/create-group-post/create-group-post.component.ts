import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'app/models/post';
import { Profile } from 'app/models/profile';
import { PostService } from 'app/services/post.service';
import { faImage} from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Group } from 'app/models/group';

@Component({
  selector: 'app-create-group-post',
  templateUrl: './create-group-post.component.html',
  styleUrls: ['./create-group-post.component.css']
})
export class CreateGroupPostComponent implements OnInit {
  group:Group = {};
  profile: Profile = {};
  addPost: Post = {
    creator: {},
    body: '',
    datePosted: new Date(),
    imgURL: '',
    group: {}
  };
  faImage = faImage;
  faCheckCircle = faCheckCircle;
  uploadDesired = false;

  @Input() show: boolean = false;

  constructor(
    public postService: PostService,
    private modalService: NgbModal,
    private router: Router
    ) {}

  ngOnInit(): void {
    let sessionProfile = sessionStorage.getItem('profile');
    if(sessionProfile!=null){
      let tempProf = JSON.parse(sessionProfile);
      this.addPost.creator = new Profile(tempProf.pid, tempProf.firstName, tempProf.lastName,'',tempProf.email,tempProf.username,tempProf.verification,tempProf.groups)    }
    let group: any = sessionStorage.getItem('group');
    group = JSON.parse(group);
    this.addPost.group = new Group(group.groupId, group.groupName, group.owner, group.members)

  }

  ngOnDestroy(): void {
    window.location.href = '/home';
  }

  createPost() {
    if (this.addPost.body!=='') {
      this.postService.createPost(this.addPost);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
    } else {
      this.show=true;
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


  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {

      let file = event.target.files[0] ;
      this.changeFile(file).then((e : any)=>{ this.addPost.imgURL = e}) }
      this.uploadDesired = true;
    }


  }




