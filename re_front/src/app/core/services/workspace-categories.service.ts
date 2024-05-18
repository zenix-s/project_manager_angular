import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from '@env/interface.env';
import { backendUrl, port } from '@env/back.env';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceCategoriesService {
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
          this.ToasterService.success('Categoría añadida');
        },
        error: (error) => {
          this.ToasterService.error(error.error.message);
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
          this.ToasterService.success('Categoría eliminada');
        },
        error: (error) => {
          this.ToasterService.error(error.error.message);
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
          this.ToasterService.success('Categoría actualizada');
        },
        error: (error) => {
          this.ToasterService.error(error.error.message);
        },
      })
  }

  clearCategories() {
    this._categories.next([]);
  }
}
