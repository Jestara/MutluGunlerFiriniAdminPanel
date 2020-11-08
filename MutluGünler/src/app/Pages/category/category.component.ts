import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category = [
    {
      id: 1,
      name: 'Çorbalar',
      description: 'Sulu yemekler',
      imageUrl: 'corba.png'
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    /* this.service.getExercises().subscribe((data)=>{
       this.exercise = data;
     });

     */

  }

  added(c) {
    this.router.navigate(['category-detail',c]);
  }

}
