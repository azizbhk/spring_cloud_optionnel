import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { voyage } from '../model/voyage.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/CategorieWrapped';
import { Image } from '../model/image.model'; 
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root',
})
export class voyageService {
 
  private apiURL: string = 'http://localhost:8091/voyages/api';
  private apiURLCat: string = 'http://localhost:8091/voyages/cat';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Create headers with JWT
  // private createHttpHeaders(): HttpHeaders {
  //   const jwt = `Bearer ${this.authService.getToken()}`;
  //   return new HttpHeaders({ Authorization: jwt, 'Content-Type': 'application/json' });
  // }

  // Get all voyages
  listevoyage(): Observable<voyage[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<voyage[]>(this.apiURL+"/all",{headers:httpHeaders});
    }

  // Add a new voyage
 // ajoutervoyage(voyage: voyage): Observable<voyage> {
   // return this.http.post<voyage>(`${this.apiURL}/addvoyage`, voyage, { headers: this.createHttpHeaders() });
 // }
 
 ajoutervoyage( avio:voyage):Observable<voyage>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.post<voyage>(this.apiURL+"/addvoyage", avio, {headers:httpHeaders});
  }


  // Delete a voyage by ID
  // supprimervoyage(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiURL}/deletevoyage/${id}`, { headers: this.createHttpHeaders() });
  // }

  supprimervoyage(id : number) {
    const url = `${this.apiURL}/deletevoyage/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
    }

  // // Upload an image
  // uploadImage(file: File, filename: string): Observable<Image> {
  //   const imageFormData = new FormData();
  //   imageFormData.append('image', file, filename);
  //   return this.http.post<Image>(`${this.apiURL}/image/upload`, imageFormData, { headers: this.createHttpHeaders() });
  // }

  uploadImage(file: File, filename: string): Observable<Image>{ 
    const imageFormData = new FormData(); 
    imageFormData.append('image', file, filename); 
    const url = `${this.apiURL + '/image/upload'}`; 
    return this.http.post<Image>(url, imageFormData); 
 } 

 uploadImageVoyage(file: File, filename: string, idAvio:number): Observable<any>{ 
  const imageFormData = new FormData(); 
  imageFormData.append('image', file, filename); 
  const url = `${this.apiURL + '/image/uplaodImagevoy'}/${idAvio}`;
  return this.http.post(url, imageFormData); 
} 


  // Load an image
  loadImage(id: number): Observable<Image> { 
    const url = `${this.apiURL + '/image/get/info'}/${id}`; 
    return this.http.get<Image>(url); 
  } 

  // Get a specific voyage by ID
  // consultervoyage(id: number): Observable<voyage> {
  //   return this.http.get<voyage>(`${this.apiURL}/${id}`, { headers: this.createHttpHeaders() });
  // }

  consultervoyage(id: number): Observable<voyage> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<voyage>(url,{headers:httpHeaders});
    }

  // Update a voyage
  // updatevoyage(voyage: voyage): Observable<voyage> {
  //   return this.http.put<voyage>(`${this.apiURL}/updatevoyage`, voyage, { headers: this.createHttpHeaders() });
  // }

  updatevoyage(prod :voyage) : Observable<voyage> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<voyage>(this.apiURL+"/updatevoyage", prod, {headers:httpHeaders});
    }

  // Get list of categories
  /*listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<>(this.apiURLCat, { headers: this.createHttpHeaders() });
  }*/
  
  listeCategories():Observable<CategorieWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;CategorieWrapper
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<CategorieWrapper>(this.apiURLCat,{headers:httpHeaders}
    );
    }

    

  // Search voyages by category ID
 
  rechercherParCategorie(idCat: number): Observable<voyage[]> {
    const url = `${this.apiURL}/voyageCat/${idCat}`;
    return this.http.get<voyage[]>(url);
    }
    

  // Search voyages by name
 
  rechercherParNom(nom: string):Observable< voyage[]> {
    const url = `${this.apiURL}/voysByName/${nom}`;
    return this.http.get<voyage[]>(url);
    }

  // Add a new category

  ajouterCategorie( cat: Categorie):Observable<Categorie>{
    //return this.http.post<TypeAv>(this.apiURLTyp, av, httpOptions);
    return this.http.post<Categorie>(this.apiURLCat, cat);
    }

    supprimercategorie(id: number) {
    
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt});
      return this.http.delete(`${this.apiURLCat}/${id}`, { headers: httpHeaders });
    }
    updatecategorie(cat: Categorie): Observable<Categorie> {
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt });
      const url = `${this.apiURLCat}/${cat.idvoyage}`; // Update by ID

      return this.http.put<Categorie>(url, cat, { headers: httpHeaders });
  }
   


  supprimerImage(id : number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
    }
  uploadImageFS(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }



    


  // // Upload an image for a voyage
  // uploadImagevoyage(uploadedImage: File, name: string, idvoyage: number): Observable<any> {
  //   const imageFormData = new FormData();
  //   imageFormData.append('image', uploadedImage, name);
  //   return this.http.post(`${this.apiURL}/image/uplaodImagevoy/${idvoyage}`, imageFormData, { headers: this.createHttpHeaders() });
  // }
}
