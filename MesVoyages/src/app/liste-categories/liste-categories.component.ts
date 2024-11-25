import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { voyageService } from '../services/voyage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: []
})
export class ListeCategoriesComponent implements OnInit {

  categories: Categorie[] = []; // Initialisation du tableau de catégories
  ajout: boolean = true;
  updatedCat: Categorie = new Categorie();
  constructor(private voyageService: voyageService ,public authService: AuthService) { }

  ngOnInit(): void {
    this.chargerCategories();
  }


  chargerCategories() {
    this.voyageService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
      console.log(cats);
});
  }

  categorieUpdated(cat: Categorie) {
    console.log('Catégorie mise à jour :', cat);
    this.voyageService.ajouterCategorie(cat).subscribe(() => this.chargerCategories());
  }

  updateCat(cat: Categorie) {
    this.updatedCat = cat;
    this.ajout = false;
  }
}
