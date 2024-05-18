import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterProviderComponent } from './core/toaster/toaster-provider/toaster-provider.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './core/authentication/service/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToasterProviderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent {
  title = 're_front';
  AuthenticationService = inject(AuthenticationService);
}
