import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formatos',
  templateUrl: './formatos.component.html',
  styleUrls: ['./formatos.component.css']
})
export class FormatosComponent {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
