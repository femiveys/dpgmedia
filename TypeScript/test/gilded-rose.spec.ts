import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // this conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

describe("Gilded Rose golden master translation", function () {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20), //
    new Item("Aged Brie", 2, 0), //
    new Item("Elixir of the Mongoose", 5, 7), //
    new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    // this conjured item does not work properly yet
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const gildedRose = new GildedRose(items);

  const days = 2;

  for (let i = 0; i < days; i++) {
    // it();

    gildedRose.updateQuality();
  }
});

describe("Gilded Rose", function () {
  it("A normal item should decrement quality and sellIn", function () {
    const gildedRose = new GildedRose([
      new Item("A normal item", 5, 7),
      new Item("A normal item", 10, 17),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(6);
    expect(items[1].sellIn).to.equal(9);
    expect(items[1].quality).to.equal(16);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function () {
    const gildedRose = new GildedRose([
      new Item("A normal item", 0, 6),
      new Item("A normal item", -2, 5),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
    expect(items[1].quality).to.equal(3);
  });

  it("The Quality of an item is never negative", function () {
    const gildedRose = new GildedRose([
      new Item("A normal item", 10, 0),
      new Item("A normal item", 0, 0),
      new Item("A normal item", -1, 0),
      new Item("A normal item", -1, 1),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
    expect(items[2].quality).to.equal(0);
    expect(items[3].quality).to.equal(0);
  });

  it('"Aged Brie" actually increases in Quality the older it gets', function () {
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 20, 10),
      new Item("Aged Brie", 2, 10),
      new Item("Aged Brie", 1, 10),
      new Item("Aged Brie", 0, 10),
      new Item("Aged Brie", -1, 10),
      new Item("Aged Brie", -10, 10),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    expect(items[1].quality).to.equal(11);
    expect(items[2].quality).to.equal(11);
    expect(items[3].quality).to.equal(12);
    expect(items[4].quality).to.equal(12);
    expect(items[5].quality).to.equal(12);
  });

  it("The Quality of an item is never more than 50", function () {
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 20, 49),
      new Item("Aged Brie", 2, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
    expect(items[3].quality).to.equal(50);
  });

  it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', function () {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
    expect(items[1].sellIn).to.equal(-1);
    expect(items[1].quality).to.equal(80);
  });

  it("Backstage passes increase faster tot date, then drop", function () {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
    expect(items[1].quality).to.equal(22);
    expect(items[2].quality).to.equal(22);
    expect(items[3].quality).to.equal(22);
    expect(items[4].quality).to.equal(23);
    expect(items[5].quality).to.equal(23);
    expect(items[6].quality).to.equal(23);
    expect(items[7].quality).to.equal(0);
    expect(items[8].quality).to.equal(0);
  });
});
