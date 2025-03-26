import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  private URL = 'http://localhost:9050';

  constructor(private http: HttpClient) { }
}
