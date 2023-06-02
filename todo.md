# done

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
- [ ] get the data going alright
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

### portability
- [ ] save to ipfs
  - [ ] investigate infura
  - [ ] credentials and keys for the project
  - [ ] save
  - [ ] read from save
  - [ ] see link for export and third party usage
  - [ ] update


### smooth use

- [ ] blog post about the features
- [ ] why don't the books show alright if someone is a visitor?
- [ ] wrap delete calls to change in books status into a shared handler in the api folder
  - [ ] edit lists
  - [ ] edit books
- [ ] book card - a horizontal bar with photo and buttons
- [ ] fix the layout - hide the navigation better
- [ ] background image to a readinglist

### advanced uses
- [ ] reading time prediction - chat described, with tensorflow
- [ ] algorithm for discover taking into account the tags user likes
- [ ] upload from goodreads
- [ ] upload csv

### QoL features
- [ ] throttling
      does not seem to quite work

# add lists
- [ ] from pol
      https://www.google.com/search?q=pol+reading+list&sxsrf=APwXEde4TFb8OKWrQEvkmZeR3XnsaY55Uw:1685392401241&source=lnms&tbm=isch&sa=X&ved=2ahUKEwik94f7r5v_AhUZhFwKHVWTBRwQ_AUoAXoECAEQAw&biw=1536&bih=792&dpr=1.25
- [ ] from pol 2015, split into parts
      https://www.goodreads.com/list/show/89892._pol_recommended_reading
- [ ] verso books one
      https://www.versobooks.com/en-gb/blogs/news/4000-10-books-every-student-should-read
- [ ] curated blog

### cancelled
- [ ] use datagrid for creation and edition faster than a form - data window