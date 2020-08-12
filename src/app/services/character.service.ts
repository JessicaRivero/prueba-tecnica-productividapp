import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from "../models/character";
import { Global } from "./global"
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    public url: string;
    public characters: Character[];

    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    getAllCharacters(): Observable<any> {
        return this._http.get(this.url + 'character')
    }

    getAllCharactersByPage(page: string): Observable<any> {
        return this._http.get(this.url + 'character/?page=' + page)
    }

}