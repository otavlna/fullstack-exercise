# Solution notes

## General

- TypeScript target for both frontend and backend is set to ES2021 since this app is only going to be used in modern environments and targetting newer versions makes output JS code shorter and easier to debug. In a real production app, it would be worth it to target lower versions for production builds.

## Backend

- Comments are only implemented with REST API, but voting is real-time using WebSockets. I found out that comments should be real-time too just after I implemented them with REST API, but since the implementation would be almost the same as in votes, I will leave it as it is.s.
- I only added some examples of unit and e2e tests, because I simply don't have the time to test everything. In a real production app, I would consider TDD approach.
- I only implemented REST API, because GraphQL wouldn't bring many benefits with an API of this small size. If I were to implement GraphQL as well, I would configure @nestjs/graphql with @nestjs/apollo driver and use code the first approach, as defined in Nest.js docs. For larger apps that often need data pagination/filtering/sorting, I would use the Nestjs-query library which does just that.
- Voting system implementation is very lazy. For a small blog it would be ok, but with more traffic it would need to be optimized to only send vote updates over websockets when user sees comments where those specific updates are happening. Also I only save IP for each vote, so there is no way to know whether user has already voted on a comment, which means colors on upvote/downvote buttons don't persist. 

## Frontend

- Delete selected articles function in admin list view deletes articles by sending one http request per article. In a real app there should be a new endpoint for bulk delete.
- Data is loaded client-side, but on a real blog it would be better to use SSR to improve SEO.