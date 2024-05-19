import { Component } from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FormsModule,
    RouterLink,
    CardComponent
  ],
  templateUrl: './setup.component.html',
  styles: ``
})
export class SetupComponent {

}
