

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
