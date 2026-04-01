# Links Store Reference

All potential links you can add to `links_store.ts`. Copy any entry and append it to the array with the next available `id`.

---

## Professional / Dev Platforms

| Platform       | URL Pattern                                       | brandColor | category     |
| -------------- | ------------------------------------------------- | ---------- | ------------ |
| LinkedIn       | `https://linkedin.com/in/{username}`              | `#0A66C2`  | professional |
| GitHub         | `https://github.com/{username}`                   | `#24292f`  | professional |
| GitLab         | `https://gitlab.com/{username}`                   | `#FC6D26`  | professional |
| Stack Overflow | `https://stackoverflow.com/users/{id}/{username}` | `#F58025`  | professional |
| HackerRank     | `https://hackerrank.com/profile/{username}`       | `#00EA64`  | professional |
| LeetCode       | `https://leetcode.com/{username}`                 | `#FFA116`  | professional |
| CodePen        | `https://codepen.io/{username}`                   | `#000000`  | professional |
| CodeSandbox    | `https://codesandbox.io/u/{username}`             | `#151515`  | professional |
| Replit         | `https://replit.com/@{username}`                  | `#F26207`  | professional |
| Exercism       | `https://exercism.org/profiles/{username}`        | `#009CAB`  | professional |
| Codeforces     | `https://codeforces.com/profile/{username}`       | `#1F8ACB`  | professional |
| HackerEarth    | `https://hackerearth.com/@{username}`             | `#323754`  | professional |
| GeeksForGeeks  | `https://geeksforgeeks.org/user/{username}`       | `#2F8D46`  | professional |
| Kaggle         | `https://kaggle.com/{username}`                   | `#20BEFF`  | professional |

---

## Packages / Open Source

| Platform  | URL Pattern                                | brandColor | category     |
| --------- | ------------------------------------------ | ---------- | ------------ |
| npm       | `https://npmjs.com/~{username}`            | `#CB3837`  | professional |
| RubyGems  | `https://rubygems.org/profiles/{username}` | `#E9573F`  | professional |
| PyPI      | `https://pypi.org/user/{username}`         | `#3775A9`  | professional |
| Packagist | `https://packagist.org/users/{username}`   | `#F28D1A`  | professional |
| crates.io | `https://crates.io/users/{username}`       | `#CE422B`  | professional |

---

## Content / Blogging

| Platform | URL Pattern                       | brandColor | category |
| -------- | --------------------------------- | ---------- | -------- |
| Medium   | `https://medium.com/@{username}`  | `#00ab6c`  | content  |
| Dev.to   | `https://dev.to/{username}`       | `#3b49df`  | content  |
| HashNode | `https://{username}.hashnode.dev` | `#2962FF`  | content  |
| Substack | `https://{username}.substack.com` | `#FF6719`  | content  |
| Ghost    | `https://{username}.ghost.io`     | `#15171A`  | content  |
| YouTube  | `https://youtube.com/@{username}` | `#FF0000`  | content  |
| Twitch   | `https://twitch.tv/{username}`    | `#9146FF`  | content  |

---

## Social

| Platform    | URL Pattern                           | brandColor | category |
| ----------- | ------------------------------------- | ---------- | -------- |
| X / Twitter | `https://x.com/{username}`            | `#000000`  | social   |
| Instagram   | `https://instagram.com/{username}`    | `#E1306C`  | social   |
| Threads     | `https://threads.net/@{username}`     | `#000000`  | social   |
| Mastodon    | `https://mastodon.social/@{username}` | `#6364FF`  | social   |
| Bluesky     | `https://bsky.app/profile/{username}` | `#0085FF`  | social   |
| Discord     | `https://discord.gg/{invite}`         | `#5865F2`  | social   |
| Telegram    | `https://t.me/{username}`             | `#26A5E4`  | social   |

---

## Scheduling / Mentoring

| Platform     | URL Pattern                                  | brandColor | category     |
| ------------ | -------------------------------------------- | ---------- | ------------ |
| Calendly     | `https://calendly.com/{username}`            | `#006BFF`  | professional |
| Topmate      | `https://topmate.io/{username}`              | `#1DBF73`  | professional |
| Sessionize   | `https://sessionize.com/{username}`          | `#1AB394`  | professional |
| Mentorcruise | `https://mentorcruise.com/mentor/{username}` | `#0057FF`  | professional |
| ADPList      | `https://adplist.org/mentors/{username}`     | `#00C389`  | professional |
| Unstop       | `https://unstop.com/mentor/{username}`       | `#FF6B35`  | professional |

---

## Community

| Platform      | URL Pattern                             | brandColor | category     |
| ------------- | --------------------------------------- | ---------- | ------------ |
| Commudle      | `https://commudle.com/users/{username}` | `#6366F1`  | professional |
| Showwcase     | `https://showwcase.com/{username}`      | `#6C63FF`  | professional |
| Polywork      | `https://polywork.com/{username}`       | `#6B4FBB`  | professional |
| Product Hunt  | `https://producthunt.com/@{username}`   | `#DA552F`  | professional |
| Indie Hackers | `https://indiehackers.com/{username}`   | `#0E2150`  | professional |

---

## Support / Donations

| Platform        | URL Pattern                              | brandColor | category |
| --------------- | ---------------------------------------- | ---------- | -------- |
| Buy Me a Coffee | `https://buymeacoffee.com/{username}`    | `#FFDD00`  | other    |
| Ko-fi           | `https://ko-fi.com/{username}`           | `#FF5E5B`  | other    |
| GitHub Sponsors | `https://github.com/sponsors/{username}` | `#EA4AAA`  | other    |
| Patreon         | `https://patreon.com/{username}`         | `#FF424D`  | other    |

---

## Other

| Platform     | URL Pattern             | brandColor | category |
| ------------ | ----------------------- | ---------- | -------- |
| Portfolio    | `https://{yourdomain}`  | `#FF7955`  | other    |
| Resume (PDF) | direct PDF URL          | `#FF7955`  | other    |
| Email        | `mailto:{email}`        | `#EA4335`  | other    |
| WhatsApp     | `https://wa.me/{phone}` | `#25D366`  | other    |

---

## Store Entry Template

```ts
{
  id: 20,                          // next available id
  title: 'Platform Name',
  url: 'https://platform.com/yourprofile',
  icon: 'https://www.google.com/s2/favicons?domain=platform.com&sz=128',
  iconType: 'image',
  brandColor: '#HEXCODE',
  category: 'professional',        // professional | content | social | other
  description: 'Short description',
  show: true,                      // false to hide without deleting
},
```
