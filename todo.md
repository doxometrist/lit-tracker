routes
-[x] about
-[x] books
-[x]discover
-[ ] lists
-[ ] my-lists
-[ ] new-book
- [ ] new-list
- [ ] tracking
- [ ] uploaded-by-me
- [  ] uploads

routes
- [x]  415 Aug  9 08:48 _404.tsx_
- [x]  561 Aug  9 08:48 _500.tsx_
84 Aug  9 08:48 account
50 Aug  9 08:48 api
 638 Aug  9 08:48 _app.tsx_
38 Aug  9 08:48 blog
1.7K Aug  9 08:48 callback.ts
82 Aug  9 08:48 dashboard
1.4K Aug  9 08:48 feed.ts - weird, xml shows up there
5.1K Aug  9 12:43 index.tsx
16 Aug  9 08:48 item
1.5K Aug  9 08:48 _middleware.ts_
60 Aug  9 08:48 notifications
6.1K Aug  9 08:48 pricing.tsx
 771 Aug  9 08:48 signin.ts
 495 Aug  9 08:48 signout.ts
4.3K Aug  9 08:48 submit.tsx
22 Aug  9 08:48 user

need functions for reading length prediction 
best if in a tight loop, so maybe rebase the project now?
theoretically there should be only small fixes from that. but should that be continuous?
I am just adding routes and unless these collide, it should be fine
### adapt to the saaskit way
- [x] reset this repo to avoid the synching effort - add onto the working and more stable my stuff
- [x] add the new remote
- [ ] add components etc
- [x] change app tsx
- [ ] slowly work through routes
- [ ] make sure all utils are used

#### that key page about the list edition

- [ ] edit books and lists - maybe simply through a POST request will be the - always do post by default, if need repeating change into api form
there must be one page for working on and adding stuff, it must be an island nested in the bigger thing
- [ ] a field for checking many books on a list and removing them - would need
      an island with static internal component and a reference to a post request
      simplest?! as parsing the body doesn't seem too easy
- [ ] display covers hot loaded on runtime https://openlibrary.org/dev/docs/api/covers
- [ ] reading time prediction - chat described, with tensorflow
      https://chat.openai.com/share/7e01b909-e36d-4f09-a417-51329516e1e6
  - [ ] kv: 'reads/userid/bookid/profile' where % read and status of it
  - [ ] tags 'tagname/bookIds'
        https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/

- [ ] no one big form, many small sections - that would mean an api approach, not a POST one, as many things changed from one route. neato

- [ ] wait for release v1.0 - not waiting for this
- [ ] chart using stuff from the regular releases

- [ ] special guests making up to 10 reading lists, all other accounts up to 5 only
- [ ] admin panel with a password hidden in env that you could activate and change stuff

# Features After MVP

## once MVP, uploaded --> promotion

- [ ] complete features listed on the landing page
- [ ] blog post about the MVP features
- [ ] one week later blog post about the future features
- [ ] write on twitter about it
- [ ] invite partners with special codes
- [ ] add a roadmap page - chat confirmed that comes after mvp

## roadmap - need emojis for each of these
- [ ] tone - a mascot that is either cute or wise but cannot be 'sowwy', bad tone
- [ ] ensuring mobile friendly css
- [ ] download full csv data
- [ ] tag system 
  - [ ] add locations in the kv store - by tag and by list
  - [ ] search feature - only through tags
      nevermind, there is a tag system in the stuffs - so could filter by tag that way using the API
      no need for user-added tags, unless for the whole reading list

      https://openlibrary.org/dev/docs/api/lists#create-list
      might backup lists here, but as optional
      they should be primarily as a nomoat object
- [ ] featured lists on the landing page - algorithmically? would need to track?
      just hard code for now? - a global featured field, or just by ID
- [ ] do a course and module system, tracking must be a thing! as a precursor to
      the university thing

### Capturing value

- [ ] premium tier with longer reading lists
- [ ] ads maybe?j

### irrelevant when doing from scratch
- [ ] refactor new book index form and the [id] variant form
July plan - tbf most of the 'advanced features' are not disrupted by the changes

- [x] omit head and meta
- [x] extract specific things from layout
- [x] bookcard, featrues and hero are needed tbh

static
- [x] delete github mark, change logo

islands
- [x] moved 2.6K Aug  9 12:42 Carousel.tsx
- [x] not useful  130 Aug  9 08:48 Chart.tsx
already there 543 Aug  9 08:48 PageInput.tsx
also already there 1.2K Aug  9 08:48 VoteButton.tsx

utils that are out there
1.5K Aug  9 08:48 constants.ts - done
many others are alread yhere

ipfs facade does not stay here, as that for nomoat lib
search.ts is not used anywhere

csv stuff joined together, the same for tracking and AGI


- [x] add middleware for all 401 actions - to not check for session everytime - just add one function
- [x] just got version v0.6
- [x] add environment variables in Deno deploy
- [x] deploy
- [x] add a modal confirmation for every delete action - tbh only list delete action will be out there given the book api. deletion of book from api not meriting a confitmation

