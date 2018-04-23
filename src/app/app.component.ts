import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userDetails: KeycloakProfile;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    this.userDetails = await this.keycloakService.loadUserProfile();
    var firstName = this.keycloakService.getKeycloakInstance().tokenParsed['given_name'];
    var lastName = this.keycloakService.getKeycloakInstance().tokenParsed['family_name'];
    var userName = this.keycloakService.getKeycloakInstance().tokenParsed['name'];
    var email = this.keycloakService.getKeycloakInstance().tokenParsed['email'];
    var cBaseID = this.keycloakService.getKeycloakInstance().tokenParsed['cbasUserId'];
    console.log(this.userDetails);
    console.log('firstName = ' + firstName);
    console.log('lastName = ' + lastName);
    console.log('userName = ' + userName);
    console.log('email = ' + email);
    console.log('cBaseID = ' + cBaseID);
  }

  async doLogout() {
    await this.keycloakService.logout();
  }
}
