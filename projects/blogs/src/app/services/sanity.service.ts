import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IBlog } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class SanityService {
  private client = createClient({
    projectId: 'ga7xrwxs',
    dataset:   'production',
    useCdn:    true,
    apiVersion: '2024-04-05',
  });

  getBlogs(): Observable<IBlog[]> {
    const query = `*[_type == "post" && (status == "published" || !defined(status))] | order(publishedAt desc) {
      "id":       _id,
      title,
      "slug":     slug.current,
      excerpt,
      "image":    mainImage.asset->url,
      "date":     publishedAt,
      readTime,
      "tags":     tags[]->{name, "slug": slug.current},
      "category": category->{name, "slug": slug.current, icon, color},
      "series":   series->{name, "slug": slug.current},
      seriesPart,
      status
    }`;
    return from(this.client.fetch<IBlog[]>(query)).pipe(
      map(posts => posts.filter(p => p.slug)),
      catchError(() => of([]))
    );
  }

  getBlogBySlug(slug: string): Observable<IBlog | null> {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      "id":             _id,
      title,
      "slug":           slug.current,
      excerpt,
      "image":          mainImage.asset->url,
      "date":           publishedAt,
      readTime,
      "tags":           tags[]->{name, "slug": slug.current},
      "category":       category->{name, "slug": slug.current, icon, color},
      "series":         series->{name, "slug": slug.current, description},
      seriesPart,
      status,
      markdownContent,
      externalUrl
    }`;
    return from(this.client.fetch<IBlog>(query, { slug })).pipe(
      catchError(() => of(null))
    );
  }

  // Fetch all tags (for filter UI)
  getTags(): Observable<{name: string; slug: string}[]> {
    return from(this.client.fetch(`*[_type == "tag"] | order(name asc) {name, "slug": slug.current}`)).pipe(
      catchError(() => of([]))
    );
  }

  // Fetch all categories
  getCategories(): Observable<{name: string; slug: string; icon?: string; color?: string}[]> {
    return from(this.client.fetch(`*[_type == "category"] | order(name asc) {name, "slug": slug.current, icon, color}`)).pipe(
      catchError(() => of([]))
    );
  }

  // Fetch all series
  getSeries(): Observable<{name: string; slug: string}[]> {
    return from(this.client.fetch(`*[_type == "series"] | order(name asc) {name, "slug": slug.current}`)).pipe(
      catchError(() => of([]))
    );
  }
}
