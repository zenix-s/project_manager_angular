import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { backendUrl, port } from '@env';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _http = inject(HttpClient);
  private ToasterService = inject(ToasterService);
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
          // alert(error.error.message)
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
          this.ToasterService.addToast('Añadir categoría', 'Nueva categoría agregada', 'success');
        },
        error: (error) => {
          // console.error(error);
          // alert('Error al crear la categoría');
          // alert(error.error.message)
          this.ToasterService.addToast('Añadir categoría', error.error.message, 'error');
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
          this.ToasterService.addToast('Eliminar categoría', 'Categoría eliminada', 'success');
        },
        error: (error) => {
          this.ToasterService.addToast('Eliminar categoría', error.error.message, 'error');
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
          this.ToasterService.addToast('Actualizar categoría', 'Categoría actualizada', 'success');
        },
        error: (error) => {
          this.ToasterService.addToast('Actualizar categoría', error.error.message, 'error');
        },
      })
  }

  cleanCategories() {
    this._categories.next([]);
  }
}
