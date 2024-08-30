import { Component, effect, inject } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors
} from "@angular/forms";
import { CardComponent } from "../card/card.component";
import { GameService } from "../game.service";
import { NgClass } from "@angular/common";

@Component({
    selector: "app-game",
    standalone: true,
    imports: [FormsModule, CardComponent, ReactiveFormsModule, NgClass],
    templateUrl: "./game.component.html",
    styles: ``
})
export class GameComponent {
    private readonly fb = inject(FormBuilder);
    scoreForm = this.fb.group({
        score: new FormControl<number | undefined>(undefined, {
            nonNullable: true,
            validators: ({ value }) => (
                value >= 350
                &&
                value / 5 % 1 === 0
            ) ? null : { score: true }
        })
    });
    private readonly gameService = inject(GameService);

    readonly game = this.gameService.game;

    constructor() {
        effect(() => {
            this.gameService.saveGameToStorage(this.game());
        });

        if (!this.game()) {
            console.log(`Loading game from storage`);
            this.gameService.loadGameFromStorage();
        }
    }

    get scoreField(): AbstractControl<number | undefined, number | undefined> | null {
        return this.scoreForm.get("score");
    }

    addScore() {
        // Force trigger validation
        this.scoreField?.markAsTouched()

        if (!this.scoreForm.valid) {
            return;
        }

        this.game.update(game => !game ? game : ({
            ...game,
            currentPlayerIndex: (game.currentPlayerIndex + 1) % game.players.length,
            players: game.players.map((player, i) => i !== game.currentPlayerIndex ? player : ({
                ...player,
                scores: [...player.scores, this.scoreField?.value!],
                sum: player.sum + this.scoreField?.value!
            }))
        }));

        this.scoreForm.reset();
    }

}