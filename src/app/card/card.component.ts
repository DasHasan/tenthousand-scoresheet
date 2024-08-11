import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Player} from '../player';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './card.component.html',
    styles: ``
})
export class CardComponent {
    player = input.required<Player>();
    protected readonly Date = Date;
}
