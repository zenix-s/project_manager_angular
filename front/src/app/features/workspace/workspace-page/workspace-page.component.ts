import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

type _section = 'tasks' | 'users' | 'categories' | 'options';
@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styles: `:host { display: block; width: 100%; }`,
})
export class WorkspacePageComponent implements OnInit {
  constructor(private ActivatedRoute: ActivatedRoute, private router: Router) {}
  private _section: _section = 'tasks';
  private _idWorkspace: number = 0;

  set section(section: _section) {
    this._section = section;
  }

  get section() {
    return this._section;
  }

  get idWorkspace() {
    return this._idWorkspace;
  }

  ngOnInit(): void {
    if (!this.ActivatedRoute.snapshot.paramMap.has('idWorkspace'))
      this.router.navigate(['/']);
    const idWorkspace = parseInt(
      this.ActivatedRoute.snapshot.paramMap.get('idWorkspace') as any
    );
    if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
      this.router.navigate(['/']);
    }

    this._idWorkspace = idWorkspace;
  }
}
