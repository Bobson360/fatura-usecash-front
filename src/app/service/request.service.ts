import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    private http: HttpClient,
    ) {
    }
    api = environment.API
    baseUrl = environment.BASE_URL
    url = `${this.api}${this.baseUrl}`

    headers = new HttpHeaders().set('Access-Control-Allow-Credentials', 'true')
  // api = environment.API

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const params = new HttpParams();

    return this.http.post('/api/file/upload', formData, {
      headers: headers,
      params: params,
      reportProgress: true,
      observe: 'events'
    });
  }

  getRegistries(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Credentials', '*');
    return this.http.get(`${this.url}/registry/registries`, {
      headers: headers,
      observe: 'events'
    });
  }

  generateAll(): Observable<any> {
    return this.http.get('${this.url}/fatura/gerar', {
      observe: 'events'
    });
  }

  generate(id: Number): Observable<any> {
    return this.http.get(`${this.url}/fatura/gerar/${id}`, {
      observe: 'events'
    });
  }
  updateInvoice(id: Number): Observable<any> {
    return this.http.put(`${this.url}/fatura/updade/${id}`, {
      observe: 'events'
    });
  }

  downloadInvoice(id: Number) {
    let url = `${this.url}/fatura/gerar/pdf/${id}`;
  window.open(url, '_blank');
  }

  downloadModelCsv() {
    let url = `${this.url}/file/model`
    console.log(`baixando modelo: /${this.url}/file/model`)
    window.open(url, '_blank');
  }

}

