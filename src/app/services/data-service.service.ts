import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor() { }

  getAllPosts = async () => {
    let response = await fetch(this.postsUrl);
    let data = await response.json();
    return data;
  }

  getPost = async (id: string) => {
    let response = await fetch(this.postsUrl+'/'+id);
    let data = await response.json();
    return data;
  }

  createPost = async (post: any) => {
    const requestOptions = {
        method: 'POST',        
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    };
    try {
        const fetchResponse = await fetch(this.postsUrl, requestOptions);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }    
  }

  updatePost = async (post: any) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title: post.title, body: post.body})
    };
    const response = await fetch(this.postsUrl+'/'+post.id, requestOptions);
    const data = await response.json();
    return data;
  }

  deletePost = async (postId: any) => {
    await fetch(this.postsUrl+'/'+postId, { method: 'DELETE' });
  }
}
