import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SanityBlock } from '@models/post.model';

@Pipe({ name: 'portableText', standalone: true })
export class PortableTextPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(blocks: SanityBlock[] | undefined): SafeHtml {
    if (!blocks?.length) return '';
    const html = blocks.map((b) => this.renderBlock(b)).join('\n');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private renderBlock(block: SanityBlock): string {
    // Code block
    if (block._type === 'code') {
      const lang = block.language ?? 'text';
      const code = this.escape(block.code ?? '');
      const file = block.filename ? `<span class="code-filename">${this.escape(block.filename)}</span>` : '';
      return `<div class="code-block">${file}<pre><code class="language-${lang}">${code}</code></pre></div>`;
    }

    // Image block
    if (block._type === 'image' && block.asset?._ref) {
      const alt = this.escape(block.alt ?? '');
      return `<figure class="post-image"><img src="${block.asset._ref}" alt="${alt}" loading="lazy" /></figure>`;
    }

    // Text block
    if (block._type === 'block') {
      const inner = (block.children ?? []).map((span) => {
        let text = this.escape(span.text);
        const marks = span.marks ?? [];
        // Apply inline marks
        if (marks.includes('strong')) text = `<strong>${text}</strong>`;
        if (marks.includes('em')) text = `<em>${text}</em>`;
        if (marks.includes('code')) text = `<code class="inline-code">${text}</code>`;
        if (marks.includes('underline')) text = `<u>${text}</u>`;
        // Links — find markDef
        const linkMark = marks.find((m) => !['strong', 'em', 'code', 'underline', 'strike-through'].includes(m));
        if (linkMark) {
          const def = (block.markDefs ?? []).find((d) => d._key === linkMark);
          if (def?.href) text = `<a href="${def.href}" target="_blank" rel="noopener noreferrer" class="post-link">${text}</a>`;
        }
        if (marks.includes('strike-through')) text = `<s>${text}</s>`;
        return text;
      }).join('');

      const style = block.style ?? 'normal';
      const map: Record<string, string> = {
        h1: `<h1 class="post-h1">${inner}</h1>`,
        h2: `<h2 class="post-h2">${inner}</h2>`,
        h3: `<h3 class="post-h3">${inner}</h3>`,
        h4: `<h4 class="post-h4">${inner}</h4>`,
        blockquote: `<blockquote class="post-quote">${inner}</blockquote>`,
        normal: `<p class="post-p">${inner}</p>`,
      };
      return map[style] ?? `<p class="post-p">${inner}</p>`;
    }

    return '';
  }

  private escape(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}
