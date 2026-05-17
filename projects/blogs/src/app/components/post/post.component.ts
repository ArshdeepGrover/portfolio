import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Post } from '@models/post.model';
import { SanityService } from '@services/sanity.service';
import { PortableTextPipe } from '../../pipes/portable-text.pipe';
import { MOCK_POSTS } from '../../services/mock-posts';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink, PortableTextPipe],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post | null = null;
  loading = true;
  notFound = false;

  constructor(private route: ActivatedRoute, private sanity: SanityService) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const isMock = environment.sanityProjectId === 'YOUR_PROJECT_ID';

    if (isMock) {
      const found = MOCK_POSTS.find((p) => p.slug.current === slug);
      this.post = found ?? null;
      this.notFound = !found;
      this.loading = false;
    } else {
      this.sanity.getPostBySlug(slug).subscribe((post) => {
        this.post = post;
        this.notFound = !post;
        this.loading = false;
      });
    }
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  share() {
    if (navigator.share) {
      navigator.share({ title: this.post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }
}
