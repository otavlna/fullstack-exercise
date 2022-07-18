# Solution notes

- TypeScript target for both frontend and backend is set to ES2021, since this app is only going to be used in modern environments and targetting newer versions makes output JS code shorter and easier to debug. In a real production app it would be worth it to target lower versions for production builds.
- Comments are only implemented with REST API, but voting is real-time using websockets. I found out that comments should be real-time too just after I implemented them with REST API, but since the implementation would be almost the same as in votes, I will leave it as it is.