import { Component, effect, inject } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import { CardComponent } from "../card/card.component";
import { GameService } from "../game.service";

@Component({
    selector: "app-game",
    standalone: true,
    imports: [FormsModule, CardComponent, ReactiveFormsModule],
    templateUrl: "./game.component.html",
    styles: ``
})
export class GameComponent {
    private readonly fb = inject(FormBuilder);
    private readonly gameService = inject(GameService);

    readonly game = this.gameService.game;


    buildScoreValidator = (): AsyncValidatorFn => async (control: AbstractControl<number>): Promise<ValidationErrors | null> => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const hasMinBound = value > 350;
        const isDivisible = value / 5 % 1 === 0;

        const scoreValid = hasMinBound && isDivisible;

        return !scoreValid ? { scoreValid: true } : null;
    };

    scoreForm = this.fb.group({
        score: this.fb.nonNullable.control<number | undefined>(undefined, Validators.required, this.buildScoreValidator())
    });

    constructor() {
        effect(() => {
            this.gameService.saveGameToStorage(this.game());
        });

        if (!this.game()) {
            console.log(`Loading game from storage`);
            this.gameService.loadGameFromStorage();
        }
    }

    addScore() {
        if (!this.scoreForm.valid) {
            return;
        }

        const score = this.scoreForm.get("score")?.value!;

        this.game.update(game => !game ? game : ({
            ...game,
            currentPlayerIndex: (game.currentPlayerIndex + 1) % game.players.length,
            players: game.players.map((player, i) => i !== game.currentPlayerIndex ? player : ({
                ...player,
                scores: [...player.scores, score],
                sum: player.sum + score
            }))
        }));

        this.scoreForm.reset();
    }

}