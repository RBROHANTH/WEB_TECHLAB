import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../shared/services/cart.service';
import { Product } from '../../shared/models/product.model';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-cows',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container-fluid mt-4">
            <!-- Cart Section -->
            <div class="row mb-4" *ngIf="cartItems.length > 0">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h3 class="mb-0">Shopping Cart</h3>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Type</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let item of cartItems">
                                            <td>
                                                <img [src]="item.product.imageUrl" [alt]="item.product.name" class="img-thumbnail" style="width: 100px;">
                                                <div>{{ item.product.name }}</div>
                                                <small class="text-muted">{{ item.product.breed }}</small>
                                            </td>
                                            <td>{{ item.product.type }}</td>
                                            <td>₹{{ item.product.price.toLocaleString() }}</td>
                                            <td>
                                                <button class="btn btn-danger btn-sm" (click)="removeItem(item.product.id)">
                                                    <i class="fas fa-trash"></i> Remove
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2" class="text-right"><strong>Total:</strong></td>
                                            <td colspan="2"><strong>₹{{ totalPrice.toLocaleString() }}</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div class="d-flex justify-content-between mt-3">
                                <button class="btn btn-secondary" (click)="clearCart()">Clear Cart</button>
                                <button class="btn btn-primary" (click)="checkout()">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Products Section -->
            <div class="row">
                <div class="col-md-8">
                    <!-- <div class="card card-custom card-custom-green mb-4">
                        <div class="card-body">
                            <h2>About Our Cows & Bulls</h2>
                            <p>The Kangayam breed is renowned for its strength and agility. These medium-sized cattle are perfect for draught purposes and are known for their compact body structure and robust hooves. With a height of 125–140 cm and a weight ranging from 340–525 kg, Kangayam cows are a symbol of endurance and vitality.</p>
                            <p>Our cows are raised in a stress-free environment, ensuring they remain healthy and productive. They are fed a balanced diet, which contributes to their overall well-being and the quality of milk they produce.</p>
                        </div>
                    </div> -->

                    <div class="row">
                        <div class="col-md-6 mb-4" *ngFor="let product of products">
                            <div class="card h-100">
                                <img [src]="product.imageUrl" class="card-img-top" [alt]="product.name" style="height: 200px; object-fit: cover;">
                                <div class="card-body">
                                    <h5 class="card-title">{{ product.name }}</h5>
                                    <p class="card-text">
                                        <strong>Type:</strong> {{ product.type }}<br>
                                        <strong>Breed:</strong> {{ product.breed }}<br>
                                        <strong>Age:</strong> {{ product.age }} months<br>
                                        <strong>Weight:</strong> {{ product.weight }} kg<br>
                                        <strong>Health Status:</strong> {{ product.healthStatus }}<br>
                                        <strong>Vaccination:</strong> {{ product.vaccinationStatus }}
                                    </p>
                                    <p class="card-text">
                                        <small class="text-muted">{{ product.description }}</small>
                                    </p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h4 class="mb-0">₹{{ product.price.toLocaleString() }}</h4>
                                        <button class="btn btn-primary" (click)="addToCart(product)" [disabled]="product.stock === 0">
                                            {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card card-custom card-custom-light sticky-top" style="top: 20px;">
                        <div class="card-body">
                            <img src="assets/cow_logo.png" alt="Logo" class="img-fluid mb-3">
                            <h2>Why Choose Us?</h2>
                            <p>RBR Farms is dedicated to providing high-quality, healthy animals. Our cattle are cared for with the utmost attention, ensuring they live in a clean and comfortable environment.</p>
                            <p>We take pride in our heritage breeds and traditional farming methods, which have been passed down through generations.</p>
                            <div class="alert alert-info">
                                <h5>Quality Assurance</h5>
                                <ul class="mb-0">
                                    <li>All animals are regularly health-checked</li>
                                    <li>Complete vaccination records</li>
                                    <li>Pure breed certification</li>
                                    <li>Free delivery within 50km radius</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .card {
            transition: transform 0.2s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card-img-top {
            border-bottom: 1px solid #eee;
        }
        .btn-primary {
            background-color: #28a745;
            border-color: #28a745;
        }
        .btn-primary:hover {
            background-color: #218838;
            border-color: #1e7e34;
        }
        .table img {
            object-fit: cover;
            height: 100px;
        }
        .btn-danger {
            margin-left: 10px;
        }
        .btn:disabled {
            cursor: not-allowed;
        }
    `]
})
export class CowsComponent implements OnInit, OnDestroy {
    products: Product[] = [
        {
            id: 1,
            name: 'Kangayam Bull',
            category: 'cows',
            type: 'Bull',
            price: 85000,
            age: 24,
            weight: 450,
            description: 'Strong and healthy Kangayam bull, perfect for breeding and farming purposes.',
            imageUrl: 'assets/cow1.png',
            stock: 2,
            breed: 'Kangayam',
            healthStatus: 'Excellent',
            vaccinationStatus: 'Fully Vaccinated'
        },
        {
            id: 2,
            name: 'Kangayam Cow',
            category: 'cows',
            type: 'Cow',
            price: 75000,
            age: 36,
            weight: 380,
            description: 'Healthy milch cow with excellent milk production capacity.',
            imageUrl: 'assets/cow2.png',
            stock: 3,
            breed: 'Kangayam',
            healthStatus: 'Excellent',
            vaccinationStatus: 'Fully Vaccinated'
        },
        {
            id: 3,
            name: 'Young Bull',
            category: 'cows',
            type: 'Bull',
            price: 65000,
            age: 18,
            weight: 350,
            description: 'Young and energetic bull, ideal for farming and breeding.',
            imageUrl: 'assets/cow3.png',
            stock: 1,
            breed: 'Kangayam',
            healthStatus: 'Excellent',
            vaccinationStatus: 'Fully Vaccinated'
        },
        {
            id: 4,
            name: 'Milch Cow',
            category: 'cows',
            type: 'Cow',
            price: 70000,
            age: 30,
            weight: 360,
            description: 'High-yielding milch cow with excellent health records.',
            imageUrl: 'assets/cow4.png',
            stock: 0,
            breed: 'Kangayam',
            healthStatus: 'Excellent',
            vaccinationStatus: 'Fully Vaccinated'
        }
    ];
    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    private cartSubscription: Subscription | undefined;

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.cartSubscription = this.cartService.getCart().subscribe(items => {
            this.cartItems = items;
            this.totalPrice = this.cartService.getTotalPrice();
            this.updateProductStock();
        });
    }

    ngOnDestroy() {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

    private updateProductStock() {
        this.products = this.products.map(product => {
            const cartItem = this.cartItems.find(item => item.product.id === product.id);
            if (cartItem) {
                return {
                    ...product,
                    stock: 0 // Set stock to 0 if item is in cart
                };
            }
            return product;
        });
    }

    private getOriginalStock(productId: number): number {
        const originalProduct = this.products.find(p => p.id === productId);
        return originalProduct ? originalProduct.stock : 0;
    }

    addToCart(product: Product) {
        if (product.stock > 0) {
            try {
                this.cartService.addToCart(product);
                alert(`${product.name} added to cart!`);
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Failed to add item to cart. Please try again.');
            }
        }
    }

    removeItem(productId: number) {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            this.cartService.removeFromCart(productId);
        }
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cartService.clearCart();
        }
    }

    checkout() {
        if (this.cartItems.length > 0) {
            if (confirm('Are you sure you want to proceed with checkout?')) {
                alert('Thank you for your purchase! Your order has been placed.');
                this.cartService.clearCart();
            }
        }
    }
}
