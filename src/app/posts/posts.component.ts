import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllPosts().then((data) => {
      this.posts = data;
    });
  }

}
