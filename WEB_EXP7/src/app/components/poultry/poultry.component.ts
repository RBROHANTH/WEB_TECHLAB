import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poultry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poultry.component.html',
  styleUrl: './poultry.component.css'
})
export class PoultryComponent {
  logoPath: string = 'assets/poultry_logo.png';
}
