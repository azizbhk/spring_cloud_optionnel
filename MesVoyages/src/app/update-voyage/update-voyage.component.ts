import { voyageService } from './../services/voyage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { voyage } from '../model/voyage.model';
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-voyage',
  templateUrl: './update-voyage.component.html',
  styles: [],
})
export class UpdateVoyageComponent implements OnInit {
  currentVoyage = new voyage();
  categories: Categorie[] = [];
  updatedCatId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private voyageService: voyageService
  ) {}

  ngOnInit(): void {
    this.voyageService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
    });
    this.voyageService.consultervoyage(this.activatedRoute.snapshot.params['id'])
    .subscribe( prod =>{ this.currentVoyage = prod;
    this.updatedCatId = prod.categorie.idCat;
    } ) ;
    }

 /* updatevoyage() {
    this.currentVoyage.categorie = this.categories.find(cat => cat.idCat ==
    this.updatedCatId)!;
    //tester si l'image du voyage a été modifiée
    if (this.isImageUpdated)
    {
    this.voyageService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.currentVoyage.image = img;
    this.voyageService
    .updatevoyage(this.currentVoyage)
    .subscribe((prod) => {
    this.router.navigate(['voyages']);
    });
    });
    }
    else{
    this.voyageService
    .updatevoyage(this.currentVoyage)
    .subscribe((prod) => {
    this.router.navigate(['voyages']);
    });
    }
    }*/

    updatevoyage() {
      this.currentVoyage.categorie = this.categories.find(cat => cat.idCat ==
      this.updatedCatId)!;
      this.voyageService
      .updatevoyage(this.currentVoyage)
      .subscribe((prod) => {
      this.router.navigate(['voyages']);
      });
      }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  // onAddImageVoyage() {
  //   this.voyageService
  //     .uploadImageVoyage(this.uploadedImage, this.uploadedImage.name, this.currentVoyage.idvoyage)
  //     .subscribe((img: Image) => {
  //       this.currentVoyage.images.push(img);
  //     });
  // }



  onAddImageVoyage() { 
    this.voyageService 
    .uploadImageVoyage(this.uploadedImage, 
    this.uploadedImage.name, this.currentVoyage.idvoyage) 
    .subscribe( (img : Image)  => { 
            this.currentVoyage.images.push(img); 
            }); 
   }
  

  supprimerImage(img: Image) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.voyageService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentVoyage.images.indexOf(img, 0);
        if (index > -1) {
          this.currentVoyage.images.splice(index, 1);
        }
      });
  }
}
