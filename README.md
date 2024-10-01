# Installation Instructions
Make sure to have Node installed on your computer. Clone this repo, and then run `npm install && npm run start` and Tuple should pop up when done installing.

# Strategies and Tradeoffs

The basic flow is that the user sets their settings and presses start, at which point the app will set a solution word. The solution word is fed into TupleGrid. TupleGrid takes the word and adds N + 1 rows, and then feeds the word into TupleRow. TupleRow maps the word into blocks, feeding mapped letter into the block as well as the index for the correct guess letter. When the user types, the guess is set on the row and then fed into the block. The color logic for the blocks is handled purely in TupleBlock from the information fed in. 

To start and reset the game, I make use of the fact that replacing a key in a React component will cause a new instance of the component to render, thereby resetting the internal game state.

The main game loop is in row. Here, I registered the key handler. The tradeoffs involved in this is that technically there are now n hooks (where n is the number of rows), however because there was a hard limit of 8, I chose to take the trade off because I felt the row managing it's own key handler was more readable and extensible, though if there was a hard limit of 10000 I would have pulled the key handler up to TupleGrid.

The state is managed by composition. I think if there had even been one more level of state, or if TupleBlock had a useState hook, I might have just refactored it with context, but I think the traditional React way is fine in this case. 

I did not use any libraries save for React-use for the useKey hook, mainly
so I could quickly iterate on the business logic without writing a key handler. Other than that, I followed the example that authentic uses and kept everything as close to pure React and TypeScript as possible. 

Looking forward to speaking about the solution!