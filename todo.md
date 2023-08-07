
- [ ] display covers hot loaded on runtime https://openlibrary.org/dev/docs/api/covers
- [ ] reading time prediction - chat described, with tensorflow
      https://chat.openai.com/share/7e01b909-e36d-4f09-a417-51329516e1e6
  - [ ] kv: 'reads/userid/bookid/profile' where % read and status of it
  - [ ] tags 'tagname/bookIds'
        https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/

### architectural decisions
- [ ] add a modal confirmation for every delete action - tbh only list delete action will be out there given the book api. deletion of book from api not meriting a confitmation
- [ ] add middleware for all 401 actions - to not check for session everytime

#### that key page about the list edition
- [ ] edit books and lists - maybe simply through a POST request will be the - always do post by default, if need repeating change into api form
there must be one page for working on and adding stuff, it must be an island nested in the bigger thing
- [ ] a field for checking many books on a list and removing them - would need
      an island with static internal component and a reference to a post request
      simplest?! as parsing the body doesn't seem too easy

- [ ] admin panel with a password hidden in env that you could activate and change stuff

# the wait step

- [ ] just got version v0.6
- [ ] wait for release v1.0
- [ ] chart using stuff from the regular releases
- [ ] reset this repo to avoid the synching effort - add onto the working and more stable my stuff
- [ ] add environment variables in Deno deploy
- [ ] deploy

# Features After MVP

## once MVP, uploaded --> promotion

- [ ] complete features listed on the landing page
- [ ] blog post about the MVP features
- [ ] one week later blog post about the future features

- [ ] write on twitter about it
- [ ] add a roadmap page - chat confirmed that comes after mvp


## roadmap
- [ ] download full csv data
- [ ] tag system - [ ] add locations in the kv store - by tag and by book - [ ]
      search feature - only through tags
      nevermind, there is a tag system in the stuffs - so could filter by tag that way using the API
      no need for user-added tags, unless for the whole reading list

      https://openlibrary.org/dev/docs/api/lists#create-list
      might backup lists here, but as optional
      they should be primarily as a nomoat object
- [ ] do a course and module system, tracking must be a thing! as a precursor to
      the university thing
- [ ] featured lists on the landing page - algorithmically? would need to track?
      just hard code for now? - a global featured field, or just by ID
### Capturing value

- [ ] premium tier with longer reading lists
- [ ] ads maybe?j

### irrelevant when doing from scratch
- [ ] refactor new book index form and the [id] variant form
July plan - tbf most of the 'advanced features' are not disrupted by the changes

