import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export interface Holding {
  ticker: string;
  quantity: number;
  sector: string;
  performance: number;
  currentPrice: number;
  totalValue: number;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  holdings: Holding[] = [
    { ticker: 'AAPL', quantity: 50, sector: 'Technology', performance: 12.5, currentPrice: 150.25, totalValue: 7512.50 },
    { ticker: 'GOOGL', quantity: 25, sector: 'Technology', performance: 18.2, currentPrice: 2750.80, totalValue: 68770.00 },
    { ticker: 'MSFT', quantity: 75, sector: 'Technology', performance: 22.1, currentPrice: 335.50, totalValue: 25162.50 },
    { ticker: 'TSLA', quantity: 30, sector: 'Automotive', performance: -5.3, currentPrice: 185.60, totalValue: 5568.00 },
    { ticker: 'JPM', quantity: 40, sector: 'Finance', performance: 8.7, currentPrice: 145.30, totalValue: 5812.00 },
    { ticker: 'JNJ', quantity: 60, sector: 'Healthcare', performance: 6.2, currentPrice: 162.75, totalValue: 9765.00 },
    { ticker: 'V', quantity: 35, sector: 'Finance', performance: 15.8, currentPrice: 235.90, totalValue: 8256.50 },
    { ticker: 'WMT', quantity: 45, sector: 'Retail', performance: 4.1, currentPrice: 158.20, totalValue: 7119.00 }
  ];

  filteredHoldings: Holding[] = [];
  filterText = '';
  sortColumn = '';
  sortDirection = 'asc';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.filteredHoldings = [...this.holdings];
  }

  onFilterChange(): void {
    if (!this.filterText.trim()) {
      this.filteredHoldings = [...this.holdings];
    } else {
      const filter = this.filterText.toLowerCase().trim();
      this.filteredHoldings = this.holdings.filter(holding =>
        holding.ticker.toLowerCase().includes(filter) ||
        holding.sector.toLowerCase().includes(filter)
      );
    }
  }

  sortBy(column: keyof Holding): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredHoldings.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  logout(): void {
    this.authService.logout();
  }

  getTotalPortfolioValue(): number {
    return this.holdings.reduce((total, holding) => total + holding.totalValue, 0);
  }
}
