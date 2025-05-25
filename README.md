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

- The buttons of the tokenbank don't disapear when you're still using the token selector after your time is up.
    - You can trigger this by opening the tokenbank selector, and wait until the timer is up (grab a snack while you wait)
    - The reason why we didn't fix this, is because we found only implemented the timer a day before the deadline, and didn't have enough time to fix this problem.

- We didn't prevent users from using a username with invalid characters in it, so when you set your username with an invalid character in it, you get an error when trying to join/create a game
    - The reason why we didn't fix this, is because we found out too late, and decided to focus on the more important stuff.
    
