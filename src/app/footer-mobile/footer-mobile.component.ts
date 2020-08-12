import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit {

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
