const BRIE = "Aged Brie";
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "Conjured Mana Cake";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  shouldHaveBeenSold = () => this.sellIn < 0;

  incrementQuality = () => {
    // The Quality of an item is never more than 50
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
  };

  decrementQuality = () => {
    // The Quality of an item is never negative
    if (this.quality > 0) {
      this.quality = this.quality - 1;
    }
  };

  resetQuality = () => {
    this.quality = 0;
  };

  decrementSellIn = () => {
    this.sellIn = this.sellIn - 1;
  };
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  calculateNextDay = () => {
    this.items
      .filter((item) => item.name !== SULFURAS)
      .forEach((item) => {
        GildedRose.updateItemSellIn(item);
        GildedRose.updateItemQuality(item);
      });

    return this.items;
  };

  static updateItemSellIn = (item: Item) => {
    item.decrementSellIn();
  };

  static updateItemQuality = (item: Item) => {
    switch (item.name) {
      case BRIE:
        GildedRose.updateBrieQuality(item);
        break;

      case BACKSTAGE:
        GildedRose.updateBackstageQuality(item);
        break;

      case CONJURED:
        GildedRose.updateConjuredQuality(item);
        break;

      default:
        GildedRose.updateDefaultQuality(item);
    }
  };

  static updateBrieQuality = (item: Item) => {
    item.incrementQuality();
    if (item.shouldHaveBeenSold()) {
      item.incrementQuality();
    }
  };

  static updateBackstageQuality = (item: Item) => {
    item.incrementQuality();
    if (item.sellIn < 10) {
      item.incrementQuality();
    }
    if (item.sellIn < 5) {
      item.incrementQuality();
    }
    if (item.shouldHaveBeenSold()) {
      item.resetQuality();
    }
  };

  static updateConjuredQuality = (item: Item) => {
    GildedRose.updateDefaultQuality(item);
    GildedRose.updateDefaultQuality(item);
  };

  static updateDefaultQuality = (item: Item) => {
    item.decrementQuality();
    if (item.shouldHaveBeenSold()) {
      item.decrementQuality();
    }
  };

  // For backward compatibility
  updateQuality = this.calculateNextDay;
}
