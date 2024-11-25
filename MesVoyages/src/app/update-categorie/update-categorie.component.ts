import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Categorie } from '../model/categorie.model';
import { voyageService } from '../services/voyage.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: [
  ]
})
export class UpdateCategorieComponent implements OnInit {
  categories: Categorie[] = []; // Initialize as an empty array


  @Input()
  categorie! : Categorie;

  @Input()
  ajout!:boolean;

  @Output() 
  categorieUpdated = new EventEmitter<Categorie>();



  constructor(private voyageService: voyageService, private Router:Router) {}


  ngOnInit(): void {
    this.voyageService.listeCategories().subscribe(
      (typs) => {
        console.log('Types data:', typs);
        this.categories = typs._embedded?.categories || []; 
      },
      (error) => {
        console.error('Error fetching types', error);
      }
    );
  }
  saveCategorie(){
    this.categorieUpdated.emit({...this.categorie});
  }



}