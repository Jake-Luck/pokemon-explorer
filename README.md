# Pokémon Explorer
*Disclaimer: Project setup has only been tested on a windows system.*

## 1. Project Setup & Running
1. Ensure you have an up to date Node.js installation
2. Clone or download this repository
3. To install required Next.js dependencies, navigate to your local repository and run the following command in a cmd console.<br>
    `npm i next@latest react@latest react-dom@latest`
4. To start the application, run the following command:<br>
    `npm run dev`
5. You should now be able to access the application in your browser at [localhost:3000]('localhost:3000')

## 2. Design and Component Decisions
Apart from having the landing page and details page in separate components (app/ and app/details), I also created components where there was repetition across pages (app/footer) and for complex sections to improve readability (pokemon-list). Early in the project I separated code into more components (such as hero, body, etc.) but later felt these unnecessary.

As for shadcn/ui, I used their badge, button, card, input, progress and spinner components. I also used their akar-icons-arrow-left, akar-icons-arrow-right, and svg-spinners-eclipse icons. I chose these components where they closely matched the figma design, sometimes needing a bit of styling to get closer.

I'm unsure if this is a deviation from the design or how it was intended to be read, but instead of having rows of four pokemon on the landing page, the number of columns are calculated by how many can fit on one row, so on a standard monitor it might fit 5, and on a mobile only 1.

## 3. State Management Approach
For the landing page, I stored the pokemon list information (an array of custom type PokemonCard), as well as the api calls needed for pagination using `useState`. This list information was passed as a prop to the PokemonList component, so when this state was set, the PokemonList would re-render according to new information. Setting this state was done following the completion of an api call, before which it would be null and PokemonList would display a loading spinner. The pagination buttons were given an action that would call the api and update state based the current next and previous page calls.

The details page would use would store the results of various api calls with `useState`, rendering a loading spinner before the state was set and the relevant information afterwards.

I chose `useState` for handling this information for its simplicity. I didn't feel  anything more complex was needed for this project.

Search parameters were also used for tracking searches as well as when navigating to the details page. This allows the user to navigate back between searches or details pages, and also allows them to return to specific details pages (perhaps they'd want to bookmark their favourite pokemon).

## 4. API Interaction Strategy
To fetch data from the api I performed asynchronous calls using `fetch('apiString')`, then would use await or Promise.all() to sync up calls when their results were needed, e.g., returning data.

I created functions for different api calls, such as searching, getting a list of pokemon or getting it's details. These would return a promise of data which would be used to update state once the call was finished.

I found this more than sufficient, without the need for a library or custom hooks.

## 5. Challenges Encountered and Solutions
I found getting the correct data from the api somewhat challenging. A lot of the data required in the spec is spread out, needing multiple api calls. For example, the details page uses calls to the 'pokemon', 'pokemon-species', 'item-category/standard-balls', 'items', 'ability' and 'type' endpoints. It was tough collating all the information and accessing it correctly. I tackled this challenge with the help of vs code's debugger, which I used to analyse the responses from the api such that I could access the returned object correctly.



## 6. Bonus Feature Implementation
I chose to implement all bonus features.

The simplest of the three was displaying pokemon sprites. This was just a matter of accessing the sprite url when calling the pokeAPI for items or pokemon, storing that url as part of the state and using it in an Image tag.

I implemented loading states by having the pokemonDetails or pokemonList states be nullable. Before an api call, and on page load, these states were set to null. Then, there is a check to see if these are null and if so, render a loading spinner, otherwise render the content with the provided information.

Search was implemented using a Next.js form with shadcn components. When use hits enter while typing in the search, or presses the search button, the form is submitted and the entered text is used to make an api call using that text. If a pokemon with that name is found, it is displayed, otherwise the MissingNo pokemon is displayed instead. If the search is submitted with no text, it will return to the default view of the pokemon list.

## 7. Self-Reflection & Potential Improvements
Having little web-development experience, I found this project especially educational. It was particularly enjoyable learning how to use these different technologies such as React, Node.js, tailwindcss, component libraries, etc. It's hard to choose a specific feature I'm most proud of, instead I'm appreciative of what I've learned over the past few days; I feel as though I could complete a similar project far quicker now than this one has taken me.

If I had more time, I would like to look into implementing a better search. I had an idea of fetching all pokemon names from the api on application launch, then you could use the search to filter through these names and call the api for the matches. Currently the search feature requires an exact match, and only works on submission which doesn't feel great.

I would also look into next.js's loading.tsx and streaming features, as I believe they may be a better method of providing loading states.