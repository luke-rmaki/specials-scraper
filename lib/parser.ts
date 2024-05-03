import { DOMParser, HTMLDivElement, HTMLElement } from "../deps.ts";
import { Item } from "../types.ts";

export function parser(html: string, which: "coles" | "woolies" | "aldi") {
  // if (which === "coles") {
  const document = new DOMParser().parseFromString(html, "text/html");
  const list: HTMLDivElement = document.querySelector(
    '[data-testid="specials-product-tiles"]'
  );
  const tiles = Array.from(
    list.querySelectorAll('[data-testid="product-tile"]')
  );
  // tiles.forEach((tile: HTMLElement) => {
  const parsed: Item[] = tiles.map((tile: HTMLElement) => {
    const title = tile.querySelector("h2");
    const price = tile.querySelector(".price .price__value");
    if (title && price) {
      return {
        name: title.innerText,
        price: parseFloat(price.innerText.replace("$", "")),
      };
    } else {
      return {
        name: "",
        price: 0,
      };
    }
  });
  return parsed;
  // }
}
