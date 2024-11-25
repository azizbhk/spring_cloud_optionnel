import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { voyage } from '../model/voyage.model';
import { voyageService } from '../services/voyage.service';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html',
})
export class AddVoyageComponent implements OnInit {
  newvoyage = new voyage();
  categories!: Categorie[];
  newIdCat!: number;
  voyages!: voyage[];
  uploadedImage!: File;
  imagePath: any;
  ajouterAvecSucces = false;

  constructor(private voyageservice: voyageService, private router: Router) {}
  ngOnInit(): void {
    this.voyageservice.listeCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }

  /* addvoyage(){ 
  
    this.newvoyage.categorie = this.categories.find(typ => typ.idvoyage == this.voyages)!;
    this.voyageservice 
    .ajoutervoyage(this.newvoyage) 
    .subscribe((voyage) => { 
    this.voyageservice
    this.router.navigate(['voyages']); 
    }); 
    }*/



addvoyage(){ 
  
  this.newvoyage.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
  this.voyageservice 
  .ajoutervoyage(this.newvoyage) 
  .subscribe((avio) => { 
  this.voyageservice 
  .uploadImageFS(this.uploadedImage,
  this.uploadedImage.name,avio.idvoyage) 
  .subscribe((response: any) => {} 
  ); 
  this.router.navigate(['voyages']); 
  }); 
  }
}

  





