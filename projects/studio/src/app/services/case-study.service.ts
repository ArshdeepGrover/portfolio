import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICaseStudy } from '../models/case-study.model';

@Injectable({ providedIn: 'root' })
export class CaseStudyService {
  private client = createClient({
    projectId:  'ga7xrwxs',
    dataset:    'production',
    useCdn:     true,
    apiVersion: '2024-04-05',
  });

  getAll(): Observable<ICaseStudy[]> {
    const query = `*[_type == "caseStudy" && status == "published"] | order(publishedAt desc) {
      "id":          _id,
      title,
      "slug":        slug.current,
      status, featured,
      clientName, clientRole, clientCompany, industry,
      duration, liveUrl, services, techStack,
      "coverImage":  coverImage.asset->url,
      summary, publishedAt
    }`;
    return from(this.client.fetch<ICaseStudy[]>(query)).pipe(catchError(() => of([])));
  }

  getBySlug(slug: string): Observable<ICaseStudy | null> {
    const query = `*[_type == "caseStudy" && slug.current == $slug][0] {
      "id":          _id,
      title,
      "slug":        slug.current,
      status, featured,
      clientName, clientRole, clientCompany, industry,
      duration, liveUrl, services, techStack,
      "coverImage":  coverImage.asset->url,
      "gallery":     gallery[].asset->url,
      summary, challenge, solution, results,
      testimonialQuote, testimonialAuthor, publishedAt
    }`;
    return from(this.client.fetch<ICaseStudy>(query, { slug })).pipe(catchError(() => of(null)));
  }

  getFeatured(): Observable<ICaseStudy[]> {
    const query = `*[_type == "caseStudy" && status == "published" && featured == true] | order(publishedAt desc)[0...3] {
      "id": _id, title, "slug": slug.current,
      clientName, clientCompany, services,
      "coverImage": coverImage.asset->url, summary
    }`;
    return from(this.client.fetch<ICaseStudy[]>(query)).pipe(catchError(() => of([])));
  }
}
