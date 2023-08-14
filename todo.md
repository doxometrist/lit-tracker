### that key page for list edition

- [ ] edit books and lists - maybe simply through a POST request will be the -
      always do post by default, if need repeating change into api form there
      must be one page for working on and adding stuff, it must be an island
      nested in the bigger thing
- [ ] a field for checking many books on a list and removing them - would need
      an island with static internal component and a reference to a post request
      simplest?! as parsing the body doesn't seem too easy
- [ ] display covers hot loaded on runtime
      https://openlibrary.org/dev/docs/api/covers
- [ ] reading time prediction - chat described, with tensorflow
      https://chat.openai.com/share/7e01b909-e36d-4f09-a417-51329516e1e6
  - [ ] kv: 'reads/userid/bookid/profile' where % read and status of it
  - [ ] tags 'tagname/bookIds'
        https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/

- [ ] no one big form, many small sections - that would mean an api approach,
      not a POST one, as many things changed from one route. neato

- [ ] wait for release v1.0 - not waiting for this
- [ ] chart using stuff from the regular releases

- [ ] special guests making up to 10 reading lists, all other accounts up to 5
      only
- [ ] admin panel with a password hidden in env that you could activate and
      change stuff

# Features After MVP

## once MVP, uploaded --> promotion

- [ ] complete features listed on the landing page
- [ ] blog post about the MVP features
- [ ] one week later blog post about the future features
- [ ] write on twitter about it
- [ ] invite partners with special codes
- [ ] add a roadmap page - chat confirmed that comes after mvp

## roadmap - need emojis for each of these - or maybe none of this

- [ ] tone - a mascot that is either cute or wise but cannot be 'sowwy', bad
      tone
- [ ] ensuring mobile friendly css
- [ ] download full csv data - in nomoat
- [ ] tag system
  - [ ] add locations in the kv store - by tag and by list
  - [ ] search feature - only through tags nevermind, there is a tag system in
        the stuffs - so could filter by tag that way using the API no need for
        user-added tags, unless for the whole reading list

    https://openlibrary.org/dev/docs/api/lists#create-list might backup lists
    here, but as optional they should be primarily as a nomoat object
- [ ] featured lists on the landing page - algorithmically? would need to track?
      just hard code for now? - a global featured field, or just by ID
- [ ] do a course and module system, tracking must be a thing! as a precursor to
      the university thing
