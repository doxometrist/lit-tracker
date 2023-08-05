# July plan - tbf most of the 'advanced features' are not disrupted by the changes

- [ ] tag system - [ ] add locations in the kv store - by tag and by book - [ ]
      search feature - only through tags

### API stuff

Open Library API: This is another great resource for book data.
https://github.com/internetarchive/openlibrary

issues with similarity https://openlibrary.org/help/faq/reading-log

quite helpful https://openlibrary.org/help/faq/reading-log#lists

ok, description needs to be always about why in this list

and list tranking and time as main features

full docs https://openlibrary.org/swagger/docs

search API https://openlibrary.org/dev/docs/api/search

- [ ] featured lists on the landing page - algorithmically? would need to track?
      just hard code for now? - a global featured field, or just by ID
- [ ] a field for checking many books on a list and removing them - would need
      an island with static internal component and a reference to a post request

- [ ] reading time prediction - chat described, with tensorflow
      https://chat.openai.com/share/7e01b909-e36d-4f09-a417-51329516e1e6
  - [ ] kv: 'reads/userid/bookid/profile' where % read and status of it
  - [ ] tags 'tagname/bookIds'
        https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/

could also get page numbers https://openlibrary.org/works/OL45804W.json
https://developers.google.com/books/docs/v1/reference/volumes

thumbnail and all is there

https://openlibrary.org/works/OL45804W/Fantastic_Mr_Fox
https://opendata.stackexchange.com/questions/1904/is-there-a-database-that-provides-lengths-of-books

things that I added

- some copmonents in islands
- many views post and get stuff
- some utils
- data - very important changes
- reading list type needs changing in full

they already did a chart, so that would be easier with a fork

will also need to refresh in a similar way the cultkit repo - make it a
federated?

### other stuff

- [ ] refactor new book index form and the [id] variant form
- [ ] add a modal confirmation for every delete action
- [ ] add middleware for all 401 actions
- [ ] edit books and lists - maybe simply through a POST request will be the
      simplest?! as parsing the body doesn't seem too easy
- [ ] do a course and module system, tracking must be a thing! as a precursor to
      the university thing

also covers are available https://openlibrary.org/dev/docs/api/covers

# the wait step

- [ ] wait for release v1.0
- [ ] reset this repo to avoid the synching effort.
- [ ] then add onto the working and more stable my stuff
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
- [ ] ads maybe?j

### Books api links
https://openlibrary.org/developers/api
https://openlibrary.org/dev/docs/api/books
https://openlibrary.org/books/OL7353617M/Fantastic_Mr._Fox
https://openlibrary.org/books/OL7353617M.json
https://openlibrary.org/works/OL45804W/Fantastic_Mr_Fox
https://openlibrary.org/works/OL45804W.json
https://developers.google.com/books/docs/v1/reference/volumes
https://opendata.stackexchange.com/questions/1904/is-there-a-database-that-provides-lengths-of-books
https://openlibrary.org/works/OL45804W.json

