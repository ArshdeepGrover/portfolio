import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Post, Category, Author } from '@models/post.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly baseUrl = `https://${environment.sanityProjectId}.api.sanity.io/v${environment.sanityApiVersion}/data/query/${environment.sanityDataset}`;

  // URL for Sanity image assets
  imageUrl(ref: string, width = 800): string {
    if (!ref) return '';
    // ref format: image-{id}-{dims}-{ext}
    const [, id, dims, ext] = ref.split('-');
    return `https://cdn.sanity.io/images/${environment.sanityProjectId}/${environment.sanityDataset}/${id}-${dims}.${ext}?w=${width}&auto=format`;
  }

  constructor(private http: HttpClient) {}

  private query<T>(groq: string): Observable<T> {
    const url = `${this.baseUrl}?query=${encodeURIComponent(groq)}`;
    return this.http.get<{ result: T }>(url).pipe(
      map((res) => res.result),
      catchError(() => of([] as unknown as T)),
    );
  }

  // ── Posts ──────────────────────────────────────────
  getPosts(): Observable<Post[]> {
    return this.query<Post[]>(`
      *[_type == "post"] | order(publishedAt desc) {
        _id, title, slug, excerpt, publishedAt, readTime, featured, coverImage,
        categories[]->{ _id, title, slug, color },
        author->{ _id, name, slug, image }
      }
    `);
  }

  getFeaturedPost(): Observable<Post | null> {
    return this.query<Post[]>(`
      *[_type == "post" && featured == true] | order(publishedAt desc)[0..0] {
        _id, title, slug, excerpt, publishedAt, readTime, coverImage,
        categories[]->{ _id, title, slug, color },
        author->{ _id, name, slug }
      }
    `).pipe(map((posts) => posts[0] ?? null));
  }

  getPostBySlug(slug: string): Observable<Post | null> {
    return this.query<Post[]>(`
      *[_type == "post" && slug.current == "${slug}"] {
        _id, title, slug, excerpt, publishedAt, updatedAt, readTime, featured, coverImage, body,
        categories[]->{ _id, title, slug, color },
        author->{ _id, name, slug, image, bio }
      }
    `).pipe(map((posts) => posts[0] ?? null));
  }

  getPostsByCategory(slug: string): Observable<Post[]> {
    return this.query<Post[]>(`
      *[_type == "post" && "${slug}" in categories[]->slug.current] | order(publishedAt desc) {
        _id, title, slug, excerpt, publishedAt, readTime, coverImage,
        categories[]->{ _id, title, slug, color },
        author->{ _id, name, slug }
      }
    `);
  }

  // ── Categories ────────────────────────────────────
  getCategories(): Observable<Category[]> {
    return this.query<Category[]>(`*[_type == "category"] | order(title asc) { _id, title, slug, color }`);
  }
}
