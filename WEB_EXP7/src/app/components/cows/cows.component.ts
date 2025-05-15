import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cows.component.html',
  styleUrl: './cows.component.css'
})
export class CowsComponent {
  logoPath: string = 'assets/logo2.png';
}
