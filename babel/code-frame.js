const codeFrame = require("@babel/code-frame");

{
  const rawLines = `class Foo {
    constructor()
  }
  `;

  const location = { start: { line: 2, column: 16 } };

  const result = codeFrame.codeFrameColumns(rawLines, location, {});

  console.log(result);
  /*
    1 | class Foo {
  > 2 |   constructor()
      |                ^
    3 | }
    4 |
  */
}

{
  const rawLines = `class Foo {
    constructor() {
      console.log("hello");
    }
  }`;
  const location = {
    start: { line: 2, column: 17 },
    end: { line: 4, column: 3 },
  };

  const result = codeFrame.codeFrameColumns(rawLines, location, {
    highlightCode: true
  });

  console.log(result);
  /*
    | class Foo {
> 2 |     constructor() {
    |                 ^^^
> 3 |       console.log("hello");
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 4 |     }
    | ^^^
  5 |   }
  */
}
