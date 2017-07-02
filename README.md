# Angular Arcade
This repo contains some adventures in recreating classic games with Angular 4.

The lion's share of the relevant code is located in /src/app/

Snake is an exercise in refactoring and learning so I leaned on [ng2snake](https://github.com/ShuhratBek/ng2snake)

Block Breaker is fairly simple, there are no levels and there is no variance in block breaking difficulty.
The ball also does not handle bouncing off the sides of things differently from how it handles bouncing off of the top or
bottom of things, which I think takes away from the user experience.

In the future I may add a simplified RPG using one of the many game development frameworks that exist out there for HTML5 and
Javascript.


#To Launch App:
- Clone repo to local machine
- In repo's directory in terminal do ```npm run start```

#Known Bugs:
- In Block Breaker ball gets stuck in paddle and sometimes in walls.
- In Block Breaker, after gameover ball is rendered twice but offset a little bit.
- Play/stop button doesn't toggle icon in Snake module

#TODO:
- Add styling and images (including getting LESS in place).
- Get automated testing in place.
- Get linter working
- Get logging for high score initials in place for leader board.
- Address bugs.
- Align Snake game field in the center of the page.
- Find solution to arrow keys causing page to scroll while playing Snake.