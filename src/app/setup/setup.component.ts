import {Component, inject} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CardComponent} from '../card/card.component';
import {Game} from '../game';

@Component({
    selector: 'app-setup',
    standalone: true,
    imports: [
        NgTemplateOutlet,
        FormsModule,
        RouterLink,
        CardComponent,
        ReactiveFormsModule
    ],
    templateUrl: './setup.component.html',
    styles: ``
})
export class SetupComponent {
    fb = inject(FormBuilder);
    playerForm = this.fb.group({
        name: ['', Validators.required],
    })

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
    }

    addPlayer() {
        if (this.playerForm.valid) {
            const name = this.playerForm.get('name')?.value!
            this.game.players.push({
                name,
                picture: name + Date.now(),
                scores: [],
                sum: 0,
            })
            this.playerForm.reset();
        }

    }

}
