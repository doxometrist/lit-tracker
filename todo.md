### portability ctn'd

- [ ] save to ipfs
  - [ ] save
  - [ ] read from save
  - [ ] update

### smooth use

- [x] sortout the carousel stuff
- [x] add default image - must download it and use the asset function from
      deno - in the end just linking
- [ ] wrap delete calls to change in books status into a shared handler in the
      api folder
  - [ ] edit lists
  - [ ] edit books

### faster data addition

- [x] buttons to upload - from the lists index page

- [ ] pdf upload to get names
- [ ] structured table that is saveable
- [ ] upload csv
- [ ] consider a list description

- [ ] fix the twitter follow button

- [ ] blog post about the features
- [ ] blog post about the changing it into an open protocol

# deploy
- [ ] consider forking from saaskit directly

- [ ] add environment variables

# add lists

- [ ] prepare all these into csv format first
- [ ] from pol
      https://www.google.com/search?q=pol+reading+list&sxsrf=APwXEde4TFb8OKWrQEvkmZeR3XnsaY55Uw:1685392401241&source=lnms&tbm=isch&sa=X&ved=2ahUKEwik94f7r5v_AhUZhFwKHVWTBRwQ_AUoAXoECAEQAw&biw=1536&bih=792&dpr=1.25
- [ ] from pol 2015, split into parts
      https://www.goodreads.com/list/show/89892._pol_recommended_reading
- [ ] verso books one
      https://www.versobooks.com/en-gb/blogs/news/4000-10-books-every-student-should-read
- [ ] curated blog

# MVP, uploaded

- [ ] write on twitter about it

### advanced uses

- [ ] reading time prediction - chat described, with tensorflow
- [ ] algorithm for discover taking into account the tags user likes

### QoL features

- [ ] upload from goodreads
- [ ] search feature
- [ ] throttling does not seem to quite work
- [ ] also download CSV


# old rust variant
caches implementation from here
https://matklad.github.io/2022/06/11/caches-in-rust.html

1 functionality 1 screen, later fancy tricks can be done later
- add link 
- import links en masse
- full text search over local stuff
- read as vault, add tags - mapping of name to.

- create a project or  

# extra features
- bookclub? it is a curated list after all why not shareable?
- automatic tracking the reading of each?
- reading list?
- read number of pages


# strategy
## MVP description

- I can add links
- I can import links from some bookmarks
- full text search over the data
- in-memory database

- reads a given directory as a vault of sorts and adds tags on top of it
- multiple levels view, not like the usual one
- can have 1 flat directory and just structure here

### read paths in a given location

Rust filesysttem API
https://doc.rust-lang.org/std/fs/



# dev ntoes

## db choice
db could be skipped for now and all contained in a local json file
I also could grab data from js and then pass it to Rust

here some agree, or sqlite

https://www.reddit.com/r/dotnetcore/comments/g2xsc5/whats_the_best_and_smallest_database_i_use_for/


this sounds good
https://memgraph.com/pricing

this too, especially with the types
https://www.edgedb.com/showcase/data-modeling
https://docs.rs/edgedb-tokio/latest/edgedb_tokio/