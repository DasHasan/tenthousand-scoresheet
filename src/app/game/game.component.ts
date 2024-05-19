import { Component } from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CardComponent
  ],
  templateUrl: './game.component.html',
  styles: ``
})
export class GameComponent {

}
