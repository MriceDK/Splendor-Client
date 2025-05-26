# Programming project web project group [XX]

## Instructions for local CI testing
You can **run** the validator and Sonar with CSS and JS rules **locally.** There is no need to push to the server to check if you are compliant with our rules. In the interest of sparing the server, please result to local testing as often as possible.

If everyone will push to test, the remote server will not last.

Please consult the Sonar guide [here](https://gitlab.ti.howest.be/ti/2024-2025/s2/programming-project/documentation/splendor-documentation/-/blob/main/sonar-guide/Sonar%20guide.md?ref_type=heads)

## Client
In order to help you along with planning, we've provided a client roadmap [https://gitlab.ti.howest.be/ti/2024-2025/s2/programming-project/documentation/splendor-documentation/-/blob/main/roadmaps/client-roadmap.md](https://gitlab.ti.howest.be/ti/2024-2025/s2/programming-project/documentation/splendor-documentation/-/blob/main/roadmaps/client-roadmap.md?ref_type=heads)

## File structure
All files should be placed in the `src` directory.

**Do not** change the file structure of the folders outside of that directory. Within, you may do as you please.

## API URL
[https://project-1.ti.howest.be/2024-2025/splendor/api/](https://project-1.ti.howest.be/2024-2025/splendor/api/)

## Default files

### CSS
The `reset.css` has aleady been supplied, but it's up to you and your team to add the rest of the styles. Please feel free to split those up in multiple files. We'll handle efficient delivery for products in production in later semesters.

### JavaScript
A demonstration for connecting with the API has already been set up. We urge you to separate your JS files as **atomically as possible**. Add folders as you please. Make use of javascript modules (as seen in the Web Development Essentials classes).

## Extra tips for CSS Grid
In case you get stuck or confused
https://learncssgrid.com/

And for your convenience, yet use with caution
https://grid.layoutit.com/ 

## Bugs client

No known bugs

## Token scheme

For the playerTokens we used JWT (Json Web Token)
- The tokens are encoded with the `HMAC SHA256` algorithm.
- The token is signed with a `256 byte` long secret key that is securely randomly generated each time the server starts.
- The tokens each have a `jti` (JWT ID) claim that is a unique identifier for the token.
- The tokens also have a `iat` (issued at) claim that is the time when the token was issued.
- The reason we added these 2 'claims' is to ensure that any JWT we generate will be completely unique.
- We also store the playerName and the gameId in this token, so that we can use it to identify the player in the game.
- Because we use JWT we can verify that the token wasn't tampered with, and that it was issued by the server. This is the biggest advantage of using JWT.