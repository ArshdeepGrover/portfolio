import { Injectable } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  banner?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  publishedAt: string;
  tags?: string[];
  externalUrl?: string;
}

export interface BlogPostDetail extends BlogPost {
  body: any[];
  markdown?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId: environment.sanity.projectId,
      dataset: environment.sanity.dataset,
      apiVersion: environment.sanity.apiVersion,
      useCdn: environment.sanity.useCdn,
    });
  }

  getPosts(): Observable<BlogPost[]> {
    const query = `*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "banner": banner.asset->url,
      publishedAt,
      tags,
      externalUrl
    }`;
    return from(this.client.fetch<BlogPost[]>(query));
  }

  getPostBySlug(slug: string): Observable<BlogPostDetail> {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      markdown,
      "banner": banner.asset->url,
      publishedAt,
      tags,
      excerpt
    }`;
    return from(this.client.fetch<BlogPostDetail>(query, { slug }));
  }

  getRecentPosts(limit: number = 3): Observable<BlogPost[]> {
    const query = `*[_type == "blog"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      "banner": banner.asset->url,
      publishedAt,
      tags
    }`;
    return from(this.client.fetch<BlogPost[]>(query, { limit }));
  }

  getPostsByTag(tag: string): Observable<BlogPost[]> {
    const query = `*[_type == "blog" && $tag in tags] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "banner": banner.asset->url,
      publishedAt,
      tags
    }`;
    return from(this.client.fetch<BlogPost[]>(query, { tag } as any));
  }
}
