import { ICategory } from './../models/category.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<ICategory[]> {
      return this.http.get<ICategory[]>(`${AppSettings.apiHost}/Category`);
    }
}
