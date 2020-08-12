import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public activateCharacter:boolean;
  public activateEpisodes:boolean;

  constructor() { 
    this.callActivateCharacter();
  }

  ngOnInit(): void {
  }

  callActivateCharacter():void{
    this.activateCharacter = true;
    this.activateEpisodes = false;
  }

  callActivateEpisodes():void{
    this.activateCharacter = false;
    this.activateEpisodes = true;
  }
}
