import {Component} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {CardComponent} from '../card/card.component';
import {Game} from '../game';

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
    game: Game = {
        players: [
            {
                name: 'Hasan',
                picture: 'Hasan',
                scores: [
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                ],
                sum: 500
            },
            {
                name: 'Naze',
                picture: 'Naze',
                scores: [
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                ],
                sum: 1000
            },
            {
                name: 'Rabea',
                picture: 'Rabea',
                scores: [
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                ],
                sum: 1000
            },
            {
                name: 'Tobi',
                picture: 'Tobi',
                scores: [
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                ],
                sum: 1000
            },
            {
                name: 'Kolle',
                picture: 'Kolle',
                scores: [
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                    0, 350, 400, 500,
                ],
                sum: 1000
            }
        ]
    };
}
