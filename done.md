

# Old


### Capturing value
- [ ] premium tier with longer reading lists - also does not make sense
- [ ] ads maybe?j - nah making it free as goth600 said

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
- [x] change app tsx
- [x] add components etc
- [x] slowly work through routes
- [x] make sure all utils are used


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


### weird and rejected

- [ ] throttling does not seem to quite work
- [ ] transfer ownership functionality?
### when stuck - old
- [ ] merge unrelated histories based on the other remote
- [ ] reconcile name changes
- [ ] extract stuff that changes from mine that changes - layout items for
      instance should be imported

### full edit window feature

- [x] edit lists ah it's about the islands that accept a callback! maybe all as
      1 island? wait none of them (it was a bout a wrong import)
- [x] one page with structured table, can preseed with pdf OR with csv
- [x] make the POST requests use JSON not query parameters. remember about
      params for action
- [x] must add the JSON api also for creation

### quick fixes

- [x] ensure pages prepopulation works
- [x] delete list - button with a dialog
- [x] bookcard display author
- [x] display of list - photo should be to the side wrt description
- [x] display book cards as a grid
- [x] add advanced Typescript features (Omit type) - there is already extends
- [x] add liked projects page?

## rejected book APIs
Goodreads API: It used to be an excellent source of book information; however,
as of December 2020, it is no longer available for public use.

Google Books API: This allows you to search their extensive book database.
probably not open source
ISBNdb API: This database has more than 24 million unique ISBNs with a vast
array of metadata.

really bad formatting and mainly for php
https://isbndb.com/apidocs/v2


## routes

browse lists

- like lists add author field? show list my lists create new list - form add new
  element - choose to which list - form also a default list all stuff lands on
- [x] do read stuff with mock data and raw html
  - [x] my lists
  - [x] all lists
- [x] do create stuff
  - [x] new book
  - [x] new reading list

### main landing page

add these good things for hero, features list https://fresh.deno.dev/components#

# needs doing

## shared components

- [x] setup the auth on local with github
- [x] fill in the landing page so that it's not just the defaults icons from
      here https://tabler-icons-tsx.deno.dev/
- [x] get the data going alright
  - [x] see all books
  - [x] list of lists
  - [x] books - view individual ones
  - [x] list of books
- [x] upload photos - just urls now

# correlation working

- [x] fix the routes mess
- [x] selected books work
- [x] addition of a book to list on creation does not work quite alright
- [x] put that mapping into a new key

### Completeness

- [x] delete lists
- [x] delete books

### styling

- [x] make the styles as Chat suggested!
  - [x] purge unfitting styles
  - [x] primary colors
  - [x] buttons with roundedness
  - [x] coffee button https://www.buymeacoffee.com/button-and-graphics
  - [ ] custom scrollbar - CANCELLED


### bug fixes 1

- [x] why don't the books show alright if someone is a visitor?
- [x] book card - a horizontal bar with photo and buttons
- [x] fix the layout - hide the navigation better
- [x] background image to a readinglist

### portability

- [x] investigate infura
- [x] credentials and keys for the project
- [x] see link for export and third party usage

### cancelled

- [ ] use datagrid for creation and edition faster than a form - data window - hard to use that package and no compatilibty with Deno it seems

# add lists

- [x] prepare all these into csv format first
- [x] from pol
      https://www.google.com/search?q=pol+reading+list&sxsrf=APwXEde4TFb8OKWrQEvkmZeR3XnsaY55Uw:1685392401241&source=lnms&tbm=isch&sa=X&ved=2ahUKEwik94f7r5v_AhUZhFwKHVWTBRwQ_AUoAXoECAEQAw&biw=1536&bih=792&dpr=1.25
- [x] from pol 2015, split into parts
      https://www.goodreads.com/list/show/89892._pol_recommended_reading
- [x] verso books one
      https://www.versobooks.com/en-gb/blogs/news/4000-10-books-every-student-should-read

### Small changes

- [x] buttons to upload - from the lists index page
- [x] list description field
- [x] add the space for link for image
- [x] consider forking from saaskit directly - nevermind, it got generated
- [x] pull stuff into cultspace first
- [x] sortout the carousel stuff
- [x] add default image - must download it and use the asset function from
      deno - in the end just linking
- [x] fix the twitter follow button

### smooth use

- [x] uploader id for init book is incoherent wrt how it's handled in the list
- [x] wrap delete calls to change in books status into a shared handler in the
      api folder
  - [x] fix the error with forms closing but not submitting

### faster data IO
- [x] upload csv -
  - [x] solve the `\n` signs causing errors and reviews containing that are
        corrupted
