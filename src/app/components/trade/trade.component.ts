import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent {
  ticker = '';
  quantity: number | null = null;
  tradeType = 'buy';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Basic validation
    if (!this.ticker.trim()) {
      this.errorMessage = 'Please enter a ticker symbol';
      return;
    }

    if (!this.quantity || this.quantity <= 0) {
      this.errorMessage = 'Please enter a valid quantity';
      return;
    }

    // Mock trade submission
    console.log('Trade submitted:', {
      ticker: this.ticker.toUpperCase(),
      quantity: this.quantity,
      type: this.tradeType,
      timestamp: new Date()
    });

    this.successMessage = `${this.tradeType.toUpperCase()} order for ${this.quantity} shares of ${this.ticker.toUpperCase()} submitted successfully!`;

    // Reset form after successful submission
    setTimeout(() => {
      this.ticker = '';
      this.quantity = null;
      this.successMessage = '';
    }, 3000);
  }

  logout(): void {
    this.authService.logout();
  }
}
