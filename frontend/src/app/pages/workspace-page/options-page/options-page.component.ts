import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserWorkspacesService } from '@app/core/services/user-workspaces.service';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { SectionComponent } from '@app/shared/components/section/section.component';

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [SectionComponent, ButtonComponent],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.css'
})
export class OptionsPageComponent implements OnInit{
  ActivatedRoute = inject(ActivatedRoute)
  workspaceService = inject(UserWorkspacesService)
  router = inject(Router)

  idWorkspace: number = 0

  DeleteWorkspace() {
    this.workspaceService.deleteWorkspace(this.idWorkspace)
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
    let idWorkspace: number
    this.ActivatedRoute.parent!.paramMap.subscribe((params) => {
      console.log('idWorkspace', params.get('idWorkspace'))
      if (!params.has('idWorkspace')) {
        this.router.navigate(['/'])
      }
      idWorkspace = parseInt(params.get('idWorkspace') as any)
      if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
        this.router.navigate(['/'])
      }

      this.idWorkspace = idWorkspace
    })
  }

}
