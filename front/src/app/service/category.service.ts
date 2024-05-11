import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { backendUrl, port } from '@env';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _http = inject(HttpClient);
  authenticationSerice = inject(AuthenticationService);

  private _categories = new BehaviorSubject<Category[]>([]);

  categories$ = this._categories.asObservable();

  getWorkspaceCategories(idWorkspace: number) {
    this._http
      .get<Category[]>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/categories`,
        {
          headers: {
            Authorization: `${this.authenticationSerice.userToken}`,
          },
        }
      )
      .subscribe((categories) => {
        this._categories.next(categories);
      });
  }

  postCategory(idWorkspace: number, category: Category) {
    this._http
      .post<Category>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/categories`,
        category,
        {
          headers: {
            Authorization: `${this.authenticationSerice.userToken}`,
          },
        }
      )
      .subscribe((category) => {
        this._categories.next([...this._categories.getValue(), category]);
      });
  }

  deleteCategory(idCategory: number) {
    this._http
      .delete<number>(`${backendUrl}:${port}/category/${idCategory}`, {
        headers: {
          Authorization: `${this.authenticationSerice.userToken}`,
        },
      })
      .subscribe((deletedIdCategory) => {
        this._categories.next(
          this._categories
            .getValue()
            .filter((category) => category.id !== deletedIdCategory)
        );
      });
  }

  putCategory(category: Category) {
    this._http
      .put<Category>(
        `${backendUrl}:${port}/category/${category.id}`,
        category,
        {
          headers: {
            Authorization: `${this.authenticationSerice.userToken}`,
          },
        }
      )
      .subscribe((updatedCategory) => {
        this._categories.next(
          this._categories
            .getValue()
            .map((category) =>
              category.id === updatedCategory.id ? updatedCategory : category
            )
        );
      });
  }

  cleanCategories() {
    this._categories.next([]);
  }
}
