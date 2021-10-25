# svelte-dice

A simple d6 and table implementation for Svelte.

## Breaking Change

There is a breaking change between Beta 3 and Beta 4 as the code was converted to TypeScript and it was determined that some things didn't make sense nameds as they were.

## Consuming the component

If you are using Svelte, and your build is setup correctly, you should be using the native Svelte files when you import things into your app.

Otherwise you will consume either the ES module or the UMD module depending on your needs. You will also need to import `svelte-dice/dist/dice.css` into your app as well.
