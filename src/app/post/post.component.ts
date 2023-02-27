import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  form!: FormGroup;
  postId: string = '';
  post: any;
  isView = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    if(this.isView) {
      this.postId = this.route.snapshot.paramMap.get('id') as string;
      this.dataService.getPost(this.postId).then((data) => {
        this.post = data;
      });
    }
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      userId: [1, [Validators.required]],
      title: ['', [Validators.required,Validators.minLength(2)]],
      body: ['', [Validators.required,Validators.minLength(2)]],
    })
  }

  toggleUI() {
    this.isView = !this.isView;
  }

  createPost() {
    this.dataService.createPost(this.form.value).then((response) => {
      console.log(response);
      this.router.navigate(['posts']);
    });
  }

  deletePost() {
    this.dataService.deletePost(this.postId).then((response) => {
      console.log(response);
      this.router.navigate(['posts']);
    });;
  }
}
