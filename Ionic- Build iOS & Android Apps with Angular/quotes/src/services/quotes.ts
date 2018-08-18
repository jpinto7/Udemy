import { Quote } from './../data/quote.interface';

export class QuotesService {
  private favoriteQuotes: Quote[] = [];

  addQuoteToFavorites(quote: Quote) {
    this.favoriteQuotes.push(quote);
  }

  removeQuoteFromFavorites(quote: Quote) {
    const quotePosition = this.favoriteQuotes.findIndex(({ id = null }) => id == quote.id);
    this.favoriteQuotes.splice(quotePosition, 1);
  }

  getFavoriteQuotes(): Quote[] {
    return [...this.favoriteQuotes];
  }

  isQuoteFavorite(quote: Quote): boolean {
    return this.favoriteQuotes.some((quoteEl: Quote) => quoteEl.id === quote.id);
  }
}