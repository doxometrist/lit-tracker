---
title: Future features
published_at: 2022-06-09
summary: How the future of this might look like.
---


1. Tag system for easier discoverty
1. Connetion to existing book spaces like Goodreads
1. Search feature
1. Download as CSV
1. Personalized time tracking and prediction how long will take it for you to read something


```js
import blog from "https://deno.land/x/blog/blog.tsx";

blog({
  author: "Dino",
  title: "My Blog",
  description: "The blog description.",
  avatar: "https://deno-avatar.deno.dev/avatar/blog.svg",
  avatarClass: "rounded-full",
  links: [
    { title: "Email", url: "mailto:bot@deno.com" },
    { title: "GitHub", url: "https://github.com/denobot" },
    { title: "Twitter", url: "https://twitter.com/denobot" },
  ],
});
```
