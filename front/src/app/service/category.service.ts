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
      .subscribe({
        next: (categories) => {
          this._categories.next(categories);
        },
        error: (error) => {
          // console.error(error);
          // alert('Error al cargar las categorías');
          alert(error.error.message)
        },
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
      .subscribe({
        next: (category) => {
          this._categories.next([...this._categories.getValue(), category]);
        },
        error: (error) => {
          // console.error(error);
          // alert('Error al crear la categoría');
          alert(error.error.message)
        },
      })
  }

  deleteCategory(idCategory: number) {
    this._http
      .delete<number>(`${backendUrl}:${port}/category/${idCategory}`, {
        headers: {
          Authorization: `${this.authenticationSerice.userToken}`,
        },
      })
      .subscribe({
        next: (deletedIdCategory) => {
          this._categories.next(
            this._categories
              .getValue()
              .filter((category) => category.id !== deletedIdCategory)
          );
        },
        error: (error) => {
          // console.error(error);
          // alert('Error al borrar la categoría');
          alert(error.error.message)
        },
      })
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
      .subscribe({
        next: (updatedCategory) => {
          this._categories.next(
            this._categories
              .getValue()
              .map((category) =>
                category.id === updatedCategory.id ? updatedCategory : category
              )
          );
        },
        error: (error) => {
          // console.error(error);
          // alert('Error al actualizar la categoría');
          alert(error.error.message)
        },
      })
  }

  cleanCategories() {
    this._categories.next([]);
  }
}
