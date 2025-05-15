import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './shared/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/cows">RBR Farms</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/cows" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                Cows & Bulls
              </a>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <span class="badge bg-light text-dark me-2" *ngIf="cartItemCount > 0">
              {{ cartItemCount }} items in cart
            </span>
          </div>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>

    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2024 RBR Farms. All rights reserved.</span>
      </div>
    </footer>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .navbar-brand {
      font-weight: bold;
    }
    .nav-link {
      font-weight: 500;
    }
    .nav-link.active {
      font-weight: 600;
    }
    .badge {
      font-size: 0.9rem;
      padding: 0.5em 0.8em;
    }
    .footer {
      position: relative;
      bottom: 0;
      width: 100%;
      background-color: #f8f9fa;
      padding: 1rem 0;
      margin-top: 2rem;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCart().subscribe(items => {
      this.cartItemCount = this.cartService.getTotalItems();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
