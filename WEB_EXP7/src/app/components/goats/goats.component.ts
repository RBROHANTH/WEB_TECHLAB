import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goats.component.html',
  styleUrl: './goats.component.css'
})
export class GoatsComponent {
  logoPath: string = 'assets/logo2.png';
}
