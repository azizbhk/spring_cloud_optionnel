import { Component, OnInit } from '@angular/core';
import { voyage } from '../model/voyage.model';
import { Categorie } from '../model/categorie.model';
import { voyageService } from '../services/voyage.service';
import { Router } from '@angular/router';
import { CategorieWrapper } from '../model/CategorieWrapped';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
})
export class RechercheParCategorieComponent implements OnInit {
  voyages!: voyage[];
  IdCategorie!: number;
  categories!: Categorie[];

  constructor(private voyageService: voyageService) {}

  /*ngOnInit(): void {
    this.voyageService.listeCategories().subscribe(
      (cats) => {
        // Directly assign the cats if it's an array
        if (Array.isArray(cats)) {
          this.categories = cats; // Assign the array directly
        } else {
          console.error('Unexpected response format:', cats);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );*/
  
  
  ngOnInit(): void {
    this.voyageService.listeCategories().subscribe(
      (typs) => {
        console.log('Types data:', typs);
        this.categories = typs._embedded?.categories || []; // Use typeAvs here
      },
      (error) => {
        console.error('Error fetching types', error);
      }
    );
  }

  onChange() {
    this.voyageService.rechercherParCategorie(this.IdCategorie).
      subscribe(voys =>{this.voyages=voys});
    
    }
  }

