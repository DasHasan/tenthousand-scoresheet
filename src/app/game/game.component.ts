import { Component, inject, OnInit, OnDestroy } from "@angular/core";
import { NgTemplateOutlet, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CardComponent } from "../card/card.component";
import { Game } from "../game";
import { GameService } from "../game.service";

@Component({
    selector: "app-game",
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, FormsModule, CardComponent],
    templateUrl: "./game.component.html",
    styles: ``
})
export class GameComponent implements OnInit, OnDestroy {
    game?: Game;
    currentScore: number = 0;
    currentPlayerIndex: number = 0;
    private gameSubscription?: Subscription;

    gameService = inject(GameService);
    router = inject(Router);

    ngOnInit() {
        this.gameSubscription = this.gameService.game$.subscribe((value) => {
            if (value) {
                this.game = value;
            } else {
                // No game loaded, redirect to setup or show a "Start New Game" screen
                this.router.navigate(['/setup']);
            }
        });
    }

    ngOnDestroy() {
        this.gameSubscription?.unsubscribe();
    }

    addScore() {
        if (this.game && this.currentScore !== 0) {
            const updatedGame = { ...this.game };
            // @ts-ignore
            updatedGame.players[this.currentPlayerIndex].scores.push(this.currentScore);
            updatedGame.players[this.currentPlayerIndex].sum += this.currentScore;
            this.gameService.updateGame(updatedGame);
            this.currentScore = 0;
            this.selectNextPlayer();
        }
    }

    selectPreviousPlayer() {
        if (this.game) {
            this.currentPlayerIndex = (this.currentPlayerIndex - 1 + this.game.players.length) % this.game.players.length;
        }
    }

    selectNextPlayer() {
        if (this.game) {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.game.players.length;
        }
    }

    endGame() {
        this.gameService.clearSavedGame();
        this.router.navigate(['/']);
    }
}