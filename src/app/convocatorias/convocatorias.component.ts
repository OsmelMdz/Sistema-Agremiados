import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
