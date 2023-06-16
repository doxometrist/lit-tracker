### portability ctn'd

DISCARDED - tbf a dedicated gateway would be required anyway. couldn't open it
just plainly, and chrome browser is the most important

- [ ] save to ipfs
  - [ ] save
  - [ ] read from save
  - [ ] update

- [ ] solve the passage of props issue
- [ ] pdf upload to get names - - [ ] possibly only as pre-seeding for the
      structured
- [ ] structured table that is saveable - [ ] join on the same page as upload

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
  - [ ] edit lists
  - [ ] make the POST requests use JSON not query parameters. remember about params for action
  - [ ] edit books

### faster data IO

- [x] upload csv -
  - [x] solve the `\n` signs causing errors and reviews containing that are
        corrupted
- [ ] one page with structured table, can preseed with pdf OR with csv
- [ ] export as markdown? or as html? markdown would be easier and with
      jamstack equally easy to deploy

# deploy

- [ ] add environment variables

# MVP, uploaded

- [ ] blog post about the MVP features
- [ ] blog post about the future features

- [ ] write on twitter about it

### refactorings

- [ ] refactor new book index form and the [id] variant form
- [ ] add a modal confirmation for every delete action
- [ ] add middleware for all 401 actions

### advanced uses

- [ ] transfer ownership functionality?
- [ ] reading time prediction - chat described, with tensorflow
- [ ] algorithm for discover taking into account the tags user likes
- [ ] kv: 'reads/userid/bookid/profile' where % read and status of it
- [ ] tags 'tagname/bookIds'
- [ ] add row reset button for uploads

### QoL features

- [ ] tag system
- [ ] upload from goodreads
- [ ] search feature
- [ ] throttling does not seem to quite work
- [ ] also download CSV
- [ ] feature lists on the landing page
