### full edit window feature

- [ ] edit lists ah it's about the islands that accept a callback! maybe all as
      1 island? wait none of them
- [ ] make the POST requests use JSON not query parameters. remember about
      params for action
- [ ] edit books
- [ ] need to structure it with a dialog element
- [ ] must add the JSON api also for creation
- [ ] one page with structured table, can preseed with pdf OR with csv

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

### IPFS

- [ ] save to ipfs
  - [ ] save
  - [ ] read from save
  - [ ] update

### Export

export stuff

- [ ] export as markdown? or as html? markdown would be easier and with jamstack
      equally easy to deploy
- [ ] integrate this library https://github.com/denoland/deno-gfm

const markdown = `

# Hello, world!

| Type | Value |
| ---- | ----- |
| x    | 42    |

\`\`\`js console.log("Hello, world!"); \`\`\` `;

const markd = render(markdown, { baseUrl: "https://example.com", });

### QoL features

- [ ] tag system
- [ ] upload from goodreads
- [ ] search feature
- [ ] throttling does not seem to quite work
- [ ] also download CSV
- [ ] feature lists on the landing page
