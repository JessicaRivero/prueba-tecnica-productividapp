import { Component, OnInit, HostListener } from '@angular/core';
import { CharacterService } from '../../app/services/character.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { Character } from '../models/character'
import { Filter } from '../models/Filter'



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {

  public showFilter: boolean;
  public finishPage: number;
  public nextPage: number;
  public showGoUpButton: boolean;
  public showScrollHeight: number;
  public hideScrollHeight: number;
  public urlFiltetParams: string;
  public orderParams: string[];
  public filter: Filter;
  public characterSelected:Character;
  public characters: Character[];

  constructor(private _characterService: CharacterService,public dialog: MatDialog) {
    this.showFilter = false;
    this.showGoUpButton = false;
    this.showScrollHeight = 400;
    this.hideScrollHeight = 200;
    this.urlFiltetParams = "";
    this.orderParams = [];
    this.filter = new Filter("", "", "");
  }

  ngOnInit(): void {
    this._characterService.getAllCharacters().subscribe(
      response => {
        if (response.info.count > 0) {
          this.finishPage = response.info.pages;
          this.nextPage = response.info.prev == null ? 2 : response.info.prev - 1;
          this.characters = response.results;
        }

      },
      error => {
        console.log('Ocurrio un problema inesperado, intente de nuevo si el problema persiste comuniquese con soporte tecnico');
      }
    );
  }

  sowFilter(): void {
    this.showFilter = true;
  }

  hiddenFilter(): void {
    this.showFilter = false;
  }

  onScroll() {
    if (this.nextPage <= this.finishPage) {
      this._characterService.getAllCharactersByPage(this.nextPage.toString() + this.urlFiltetParams).subscribe(
        response => {
          if (response.info.count > 0) {
            for (let i = 0; i < response.results.length; i++) {
              if (!this.characters.some((item) => item.id == response.results[i].id)) {
                this.characters.push(response.results[i]);
              }
            };
            if (this.orderParams.length > 0) {
              this.transform(this.characters, this.orderParams[0], this.orderParams[1] == "true" ? true : false);
            }
          }
          this.nextPage++;
        },

        error => {
          console.log('Ocurrio un problema inesperado, intente de nuevo si el problema persiste comuniquese con soporte tecnico');
        }
      );
    } 
  }

  transform(array: Array<any>, orderField: string, orderType: boolean): Array<string> {
    array.sort((a: any, b: any) => {
      let ae = a[orderField].trim();
      let be = b[orderField].trim();
      if (ae == undefined && be == undefined) return 0;
      if (ae == undefined && be != undefined) return orderType ? 1 : -1;
      if (ae != undefined && be == undefined) return orderType ? -1 : 1;
      if (ae == be) return 0;
      return orderType ? (ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1) : (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
    });
    return array;
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  activeFilter() {
    this.characters = [];
    if (this.filter.gender != "") {
      this.urlFiltetParams = "&gender=" + this.filter.gender;
    }
    if (this.filter.status != "") {
      this.urlFiltetParams = this.urlFiltetParams + "&status=" + this.filter.status;

    }
    if (this.filter.searchCriteriader != "") {
      this.orderParams = this.filter.searchCriteriader.split(",");
    } else {
      this.orderParams = [];
      this.nextPage = 1;
      this.hiddenFilter();
    }
    if (this.urlFiltetParams != "" || this.filter.searchCriteriader != "") {
      this.nextPage = 1;
      this.hiddenFilter();
    }
    this._characterService.getAllCharactersByPage(this.nextPage.toString() + this.urlFiltetParams).subscribe(
      response => {
        if (response.info.count > 0) {
          for (let i = 0; i < response.results.length; i++) {
            if (!this.characters.some((item) => item.id == response.results[i].id)) {
              this.characters.push(response.results[i]);
            }
          };
          if (this.orderParams.length > 0) {
            this.transform(this.characters, this.orderParams[0], this.orderParams[1] == "true" ? true : false);
          }
        }
        this.nextPage++;
      },

      error => {
        console.log('Ocurrio un problema inesperado, intente de nuevo si el problema persiste comuniquese con soporte tecnico');
      }
    );
  }

  openDialog(index:number): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '70%',
      data: { character: this.characters[index]}
    });
  }

}
