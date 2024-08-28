import { Component, effect, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CardComponent } from "../card/card.component";
import { GameService } from "../game.service";

@Component({
    selector: "app-game",
    standalone: true,
    imports: [FormsModule, CardComponent],
    templateUrl: "./game.component.html",
    styles: ``
})
export class GameComponent {
    currentScore?: number;

    gameService = inject(GameService);

    game = this.gameService.game;

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
        this.game.update(game => !game ? game : ({
            ...game,
            currentPlayerIndex: (game.currentPlayerIndex + 1) % game.players.length,
            players: game.players.map((player, i) => i !== game.currentPlayerIndex ? player : ({
                ...player,
                scores: [...player.scores, this.currentScore!],
                sum: player.sum + this.currentScore!
            }))
        }));

        this.currentScore = undefined;
    }

}