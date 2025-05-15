import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
    product: Product;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    private isBrowser: boolean;
    private readonly CART_STORAGE_KEY = 'farm_cart';

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.initializeCart();
    }

    private initializeCart(): void {
        if (this.isBrowser) {
            try {
                const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
                if (savedCart) {
                    this.cartItems = JSON.parse(savedCart);
                    this.cartSubject.next(this.cartItems);
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
                this.cartItems = [];
                this.cartSubject.next(this.cartItems);
            }
        }
    }

    getCart(): Observable<CartItem[]> {
        return this.cartSubject.asObservable();
    }

    addToCart(product: Product): void {
        if (!this.isBrowser) return;

        try {
            const existingItem = this.cartItems.find(item => item.product.id === product.id);
            
            if (!existingItem) {
                this.cartItems.push({ product });
                this.updateCart();
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    removeFromCart(productId: number): void {
        if (!this.isBrowser) return;

        try {
            this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
            this.updateCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    }

    clearCart(): void {
        if (!this.isBrowser) return;

        try {
            this.cartItems = [];
            this.updateCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    getTotalItems(): number {
        return this.cartItems.length;
    }

    getTotalPrice(): number {
        return this.cartItems.reduce((total, item) => total + item.product.price, 0);
    }

    private updateCart(): void {
        if (!this.isBrowser) return;

        try {
            this.cartSubject.next([...this.cartItems]);
            localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems));
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    }
} 