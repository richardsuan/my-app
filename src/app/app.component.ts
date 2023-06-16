import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000';
  username: string = '';
  password: string = '';
  token: string = '';

  sendLogin() {
    this.http.post(this.url + '/login', {
      username: this.username,
      password: this.password
    }).subscribe((response: any) => {      
      this.token = response.token;
      console.log(this.token);
      this.getPrivateZone();
    }, (error) => {
      alert("no autorizado");
      console.log(error);
    });
  }

  getPrivateZone() {
    const headers = new HttpHeaders({
      auth: this.token
    });
    this.http.get(this.url + '/protected', { headers: headers }).subscribe((response: any) => {
      alert("Zona privada usuario: " + response.user.username);
      console.log(response);
    }, (error) => {
      alert(error);
    });
  }
}
