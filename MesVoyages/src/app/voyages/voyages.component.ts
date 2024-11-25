import { voyage } from './../model/voyage.model';
import { Component, OnInit } from '@angular/core';

import { voyageService } from '../services/voyage.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';
import { Router } from '@angular/router';

 @Component({
   selector: 'app-voyages',
   templateUrl: './voyages.component.html'
 })
 export class voyagesComponent implements OnInit {
   voyages!: voyage[]; 
apiurl: string = 'http://localhost:8091/voyages/api';

constructor(
  private voyageService: voyageService,
  private router: Router,
  public authService: AuthService
) {}
   ngOnInit(): void {
     this.chargervoyages();
  }
/*

@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html'
})
export class voyagesComponent implements OnInit {
  voyages!: voyage[]; 

  apiurl: string = 'http://localhost:8091/voyages/api';

  constructor(
    private voyageService: voyageService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargervoyages();
  }


*/




// chargervoyages() {
//   this.voyageService.listevoyage().subscribe((voys) => {
//     this.voyages = voys;
//   });
// }
    

// chargervoyages(){
//   this.voyageService.listevoyage().subscribe((avios) => {
//     this.voyages = avios;

//     });
//   }

// chargervoyages(){
//   this.voyageService.listevoyage().subscribe(prods => {
//   //  console.log(prods);
//     this.voyages = prods;

//     this.voyages.forEach((prod) => {
//       prod.imageStr = 'data:' + prod.images[0].type + ';base64,' +  prod.images[0].image;
//       });

//     });
//   }

chargervoyages() {
  this.voyageService.listevoyage().subscribe(prods => {
    this.voyages = prods;

    this.voyages.forEach((prod) => {
      // Assuming prod.images is an array and you want the first image
      if (prod.images && prod.images.length > 0) {
        prod.imageStr = 'data:' + prod.images[0].type + ';base64,' + prod.images[0].image;
      }
    });
  });
}

        
      

supprimervoyage(a: voyage) {
  let conf = confirm('Etes-vous sûr ?');
  if (conf) {
    this.voyageService.supprimervoyage(a.idvoyage).subscribe(() => {
      console.log('voyage supprimé');
      this.chargervoyages();
    });
  }

}
}

