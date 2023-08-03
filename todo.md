# July plan - tbf most of the 'advanced features' are not disrupted by the changes

### QoL features

- [ ] tag system
- [ ] upload from goodreads
- [ ] search feature
- [ ] featured lists on the landing page
- [ ] a field for checking many books on a list and removing them - would need
      an island with static internal component and a reference to a post request
- [ ] add row reset button for uploads

- [ ] reading time prediction - chat described, with tensorflow
- [ ] kv: 'reads/userid/bookid/profile' where % read and status of it
- [ ] tags 'tagname/bookIds'

#### refactorings

- [ ] refactor new book index form and the [id] variant form
- [ ] add a modal confirmation for every delete action
- [ ] add middleware for all 401 actions
- [ ] edit books and lists - maybe simply through a POST request will be the
      simplest?! as parsing the body doesn't seem too easy
- [ ] make edit work for the backup branch

do a course and module system, tracking must be a thing!
as a precursor to the university thing

# August plan

### the wait step

- [ ] wait for release v1.0
- [ ] then add onto the working and more stable my stuff
- [ ] possibly work on the json portability as well
- [ ] add environment variables in Deno deploy
- [ ] deploy

# Features After MVP

## once MVP, uploaded --> promotion

- [ ] complete features listed on the landing page
- [ ] blog post about the MVP features
- [ ] blog post about the future features

- [ ] write on twitter about it
- [ ] add a roadmap page

### Capturing value

- [ ] premium tier with longer reading lists
- [ ] ads maybe?

# Old

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
