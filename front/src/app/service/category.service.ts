import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { backendUrl, port } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getWorkspaceCategories(idWorkspace: number):Observable<Category[]> {
    return this.http.get<Category[]>(
      `${backendUrl}:${port}/workspace/${idWorkspace}/categories`
    );
  }
}
