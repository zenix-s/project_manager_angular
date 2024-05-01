import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { backendUrl, port } from '@env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // constructor(private http: HttpClient) {}
  http = inject(HttpClient);

  private _categories = new BehaviorSubject<Category[]>([]);

  categories$ = this._categories.asObservable();

  // getWorkspaceCategories(idWorkspace: number):Observable<Category[]> {
  //   return this.http.get<Category[]>(
  //     `${backendUrl}:${port}/workspace/${idWorkspace}/categories`
  //   );
  // }

  getWorkspaceCategories(idWorkspace: number) {
    this.http
      .get<Category[]>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/categories`
      )
      .subscribe((categories) => {
        this._categories.next(categories);
        // console.log('categories', categories);
      });
  }

  postCategory(idWorkspace:number, category: Category) {
    this.http
      .post<Category>(`${backendUrl}:${port}/workspace/${idWorkspace}/categories`, category)
      .subscribe((category) => {
        this._categories.next([...this._categories.getValue(), category]);
      });
  }

  deleteCategory(idCategory: number) {
    this.http
      .delete<number>(`${backendUrl}:${port}/category/${idCategory}`)
      .subscribe((deletedIdCategory) => {
        this._categories.next(
          this._categories.getValue().filter((category) => category.id !== deletedIdCategory)
        );
      });
  }

  cleanCategories() {
    this._categories.next([]);
  }
}
