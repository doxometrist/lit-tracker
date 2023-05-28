
# database prep
- [x] clarity user - persona link. does it work between cults? probably it should
- [x] think of the structure for nesting and double keys
- [x] figure out which need IDs
- [x] make default ranks

# steps
it's usually best to start with the foundational elements, then build upwards
towards more specific functionalities. Here's a potential order:

- [x] Landing Page: This is your user's first point of contact with your
      product. It doesn't need to be fully fleshed out initially, but you'll
      want a placeholder at least. 
      - [ ] landing page for a cult with number of
      followers

- [x] user different identities feature - more after paying me $
// could be many, infinite own profiles. no identity confirmation

- [ ] Groups Functionalities: Set up the basic group functionality. This
      includes creating a group, joining a group, leaving a group, etc.
      - [ ] delete personas
      - [ ] need some double key for storign person x cult relation
      - [ ] see someone's persona profile and see all the cults they're in

- [ ] Group Admin Panel for Managing Access: You need to establish who has the
      power to add/remove users, change settings, etc. CRUD over ranks, CRUD
      over resources, actions manage landing page

## aesthetics moment
name generator http://www.fantasynamegenerators.com/cult-names.php
- [ ] deal with imeages - for user, gor group
- [ ] get own logo
- [ ] change the tailwind styles to be fittig the purpose

- [ ] Group Membership Zero Knowledge Verification Handshake and QR Code: This
      is essential for security and user identity verification. It seems to be a
      core part of your service, so developing this early is key.

- [ ] Resources Shared by Group Admins to Users: Develop the system to share
      resources within the group.

- [ ] Writing Space Inside Groups: Similar to sharing resources, this is a
      primary feature of the group interaction, allowing for discussion and
      - [ ] quill writing space - there you define areas that each person can see
      collaboration.

- [ ] Group History Page: This will let users view the past activity within the
      group. This could be built out after the fundamental group interaction
      features are in place.

- [ ] Group Announcements Page: This feature, while important, is less essential
      than the foundational group functionality.

- [ ] Group Admin Panel for Meetings: This can come after most of the basic
      group features. Since meetings will likely incorporate a lot of the
      previously established functionality (e.g., resource sharing, writing
      space), it's better to develop this later.

- [ ] create db update functions for all the files

# here mvp and deployment

- [ ] Audio Chat Functionality: Having built the group functionalities and
      meeting panel, adding the audio chat would be the next logical step.

- [ ] Group Design Customization with Design Tokens: As this is more of an
      aesthetic feature, it can come towards the end. Your main goal initially
      should be getting the functionality of your service working correctly.

https://m3.material.io/foundations/design-tokens/overview
https://www.lightningdesignsystem.com/design-tokens/

- [ ] Group Landing Page: Finally, the Group Landing Page can be designed once
      all group-related functionalities are in place and stable. This page will
      serve as a summary and entry point to all the features you've developed.

- [ ] search over personas and descriptions, and public ranks.

Remember that software development is iterative, so you might find yourself
coming back to refine features after they're initially built. Also, user testing
should be conducted throughout the process to ensure the product meets user
needs and expectations. Lastly, remember to account for non-functional tasks
like setting up version control, deployment, continuous integration/continuous
deployment (CI/CD), etc.

# DMs with images

# main landing page

ask for landing page here https://durable.co/ number of cults number of users
https://css-tricks.com/animating-number-counters/

list of cults signup button pricing page with different tiers make your own cult

and participate in them!

add these good things for hero, features list
https://fresh.deno.dev/components#

# changes for sstripe

- [ ] create the facade for payment options - starting with alchemy crypto (need
      to set prices) stripe-webhooks utils/payments utisl/db
      rountes/account/upgrade

## stretch goals

- vouching system
- access only with a secret password, one time use

- recommendation for rank promotion?
- could allow anyone to use GPT to talk with?

## more activities
- meditation
- discussion fora
- chanting / signing
- shared memeory palace
- group studies, digital copies of texts
- own emojis
- rituals
- fasting support groups

# votes reference

dashboard https://quadraticvote.co/event?id=32ada6c6-2e58-4990-a42a-d0428d9d241a

Original recommendation

- ZK snacks for proving a degree without identity irl - 9, 49
- time restrictions: 6, 17
- voice only chat- 5, 11 https://github.com/feross/simple-peer
- https://github.com/peers/peerjs
- visibility in activities? 2, 11
- sell physical merch integration - 4, 6
- quizzes and mantras - need to repeat in voice for a recording to review - 4, 6


- pdf creation https://pdf-lib.js.org/


core, frequent fliers, and passive participants
https://twitter.com/forthrighter/status/1652995887331778563