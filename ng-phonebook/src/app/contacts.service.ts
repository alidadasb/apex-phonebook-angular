import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Contact} from "./contacts/contact";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) {
  }
  serverUrl = 'http://localhost:8080/api/contact/';

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  addContact(contact: {}) {
    return this.http.post<Contact>(this.serverUrl, contact, httpOptions)
      .pipe(catchError(ContactService.handleError));
  }

  loadAll() {
    return this.http.get<Contact[]>(this.serverUrl, httpOptions)
      .pipe(catchError(ContactService.handleError));
  }

}
