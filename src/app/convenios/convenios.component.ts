import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent {

    constructor(private router: Router,) { }

    ngOnInit(): void {
    }

    logout() {
      this.router.navigate(['/login']);
    }

}
