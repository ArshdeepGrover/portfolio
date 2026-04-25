import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { from, Observable } from 'rxjs';
import { IBlog } from '@models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class SanityService {
  private client = createClient({
    projectId: 'ga7xrwxs', // Your arshdeep-blogs project ID
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-04-05',
  });

  private builder = imageUrlBuilder(this.client);

  getBlogs(): Observable<any[]> {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      excerpt,
      "image": mainImage.asset->url,
      "date": publishedAt,
      "readTime": 5,
      tags,
      url,
      "content": body
    }`;
    return from(this.client.fetch(query));
  }

  getBlogById(id: string): Observable<any> {
    const query = `*[_type == "post" && _id == $id][0] {
      "id": _id,
      title,
      excerpt,
      "image": mainImage.asset->url,
      "date": publishedAt,
      "readTime": 5,
      tags,
      url,
      "content": body
    }`;
    return from(this.client.fetch(query, { id }));
  }

  getImageUrl(source: any) {
    return this.builder.image(source);
  }
}
