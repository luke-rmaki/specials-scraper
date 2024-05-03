import { fetcher } from "./lib/fetcher.ts";
import { parser } from "./lib/parser.ts";
import { save } from "./lib/save.ts";
import type { Item } from "./types.ts";

async function main() {
  let output: Item[] = [];
  let run = true;
  let i = 1;
  do {
    const html = await fetcher("https://www.coles.com.au/on-special", i);
    const parsed = parser(html, "coles");
    if (parsed.length === 0) {
      console.log("no items found");
      run = false;
    }
    // } else if (i === 10) {
    //   run = false;
    // }
    else {
      output = [...output, ...parsed];
      i += 1;
    }
  } while (run);

  save(output);
}

main();
