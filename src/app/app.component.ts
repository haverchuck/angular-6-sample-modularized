import { Component } from '@angular/core';
import { AmplifyService }  from 'aws-amplify-angular';

const template = `
  <div style="text-align:center; color: var(--color-white)">
    <h1>
      Welcome to {{ title }}!
    </h1>
    <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
  </div>
  <section class="authenticator">
    <amplify-authenticator></amplify-authenticator>
  </section>
  <section *ngIf="signedIn" id="wrapper">
    <div id="left">
      <div style="text-align:center;  color: var(--color-white)">
        Amplify Storage
      </div>
      <amplify-photo-picker
        path="pictures"
      ></amplify-photo-picker>

      <amplify-s3-album
          path="pictures">
      </amplify-s3-album>
    </div>
    <div id="right">
      <div style="text-align:center;  color: var(--color-white)">
        Amplify Interactions
      </div>

    </div>
  </section>
`

@Component({
  selector: 'app-root',
  template,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular6 Amplify Sample App';
  signedIn: boolean = false;

  constructor(protected amplifyService: AmplifyService ) {
    console.log(this.signedIn)
    this.amplifyService.auth().currentAuthenticatedUser()
      .then(user => this.signedIn = true)
      .catch(error => this.signedIn = false)

    this.amplifyService.authStateChange$
      .subscribe(authState => (this.signedIn = authState.state === 'signedIn'));
  }

  onBotComplete(event: any) {
    console.log(event)
  }
}
