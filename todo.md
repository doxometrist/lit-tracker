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

### portability ctn'd

- [ ] save to ipfs
  - [ ] save
  - [ ] read from save
  - [ ] update

### smooth use

- [x] wrap delete calls to change in books status into a shared handler in the
      api folder
  - [ ] edit lists
  - [ ] edit books
  - [ ] fix the error with forms closing but not submitting
- [ ] uploader id for init book is incoherent wrt how it's handled in the list

### faster data addition

- [ ] pdf upload to get names - possibly only as pre-seeding for the structured
      one
- [ ] structured table that is saveable
- [ ] upload csv - 
  - [ ] solve the `\n` signs causing errors and reviews containing that are corrupted

# deploy

- [ ] add environment variables

# MVP, uploaded

- [ ] blog post about the MVP features
- [ ] blog post about the future features

- [ ] write on twitter about it

### advanced uses

- [ ] transfer ownership functionality?
- [ ] reading time prediction - chat described, with tensorflow
- [ ] algorithm for discover taking into account the tags user likes

### QoL features

- [ ] tag system
- [ ] upload from goodreads
- [ ] search feature
- [ ] throttling does not seem to quite work
- [ ] also download CSV
- [ ] feature lists on the landing page
