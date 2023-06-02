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

- [ ] wrap this all in the shared handler in the api folder
- [ ] edit lists
- [ ] edit books

### styling
- [ ] book card - a horizontal bar with photo and buttons
- [ ] make the styles as Chat suggested!
  - [ ] purge unfitting styles
  - [ ] primary colors 
  - [ ] buttons with roundedness
  - [ ] coffee button https://www.buymeacoffee.com/button-and-graphics
  - [ ] custom scrollbar

- [ ] fix the layout - hide the navigation better

### advanced uses
- [ ] save to ipfs
  - [ ] investigate infura
  - [ ] credentials and keys for the project
  - [ ] save
  - [ ] read from save
  - [ ] see link for export and third party usage
  - [ ] update
- [ ] reading time prediction - chat described, with tensorflow
- [ ] algorithm for discover taking into account the tags user likes
- [ ] upload from goodreads
- [ ] estimated length of reading stuff

### QoL features

- [ ] back image to a readinglist
- [ ] throttling
- [ ] use datagrid for creation and edition faster than a form - data window
      does not seem to quite work

# add lists

- [ ] from pol
      https://www.google.com/search?q=pol+reading+list&sxsrf=APwXEde4TFb8OKWrQEvkmZeR3XnsaY55Uw:1685392401241&source=lnms&tbm=isch&sa=X&ved=2ahUKEwik94f7r5v_AhUZhFwKHVWTBRwQ_AUoAXoECAEQAw&biw=1536&bih=792&dpr=1.25
- [ ] from pol 2015, split into parts
      https://www.goodreads.com/list/show/89892._pol_recommended_reading
- [ ] verso books one
      https://www.versobooks.com/en-gb/blogs/news/4000-10-books-every-student-should-read
- [ ] curated blog

### outline of upload variant

const express = require('express'); const bodyParser = require('body-parser');
const level = require('level'); const multer = require('multer'); const fs =
require('fs');

// Set up express app const app = express(); app.use(bodyParser.json());

// Set up multer for file handling const upload = multer({ dest: 'uploads/' });

// Create or open the database const db = level('./mydb');

// Endpoint to upload image app.post('/upload', upload.single('image'), (req,
res) => { // Read the image file, convert it to base64, then save it to the
database fs.readFile(req.file.path, (err, data) => { if (err) throw err;

    // convert image file to base64
    const imgBase64 = data.toString('base64');

    // Generate a key. Here it's the filename, but it could be anything
    const key = req.file.originalname;

    db.put(key, imgBase64, function(err) {
      if (err) return console.log('Error storing data', err);
    });

    res.json({ message: 'Image uploaded successfully' });

}); });

// Endpoint to get an image app.get('/image/:key', async (req, res) => { // Use
the key to get the base64 string from the database const imageBase64 = await
db.get(req.params.key);

// Convert the base64 string back to a Buffer const imageBuffer =
Buffer.from(imageBase64, 'base64');

// Send the image back to the client res.send(imageBuffer); });

// Start the server app.listen(3000, () => { console.log('Server is up and
running on port 3000'); });
