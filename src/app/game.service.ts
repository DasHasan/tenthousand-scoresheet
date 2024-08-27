import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Game } from "./game";

@Injectable({
    providedIn: "root",
})
export class GameService {
    private readonly STORAGE_KEY = 'zehntausend_game_state';
    game$ = new BehaviorSubject<Game | null>(null);

    constructor() {
        this.loadGameFromStorage();
    }

    startGame(game: Game) {
        const newGame: Game = {
            players: game.players.map((player) => ({
                name: player.name,
                picture: player.picture,
                sum: 0,
                scores: [],
            })),
        };
        this.game$.next(newGame);
        this.saveGameToStorage(newGame);
    }

    updateGame(game: Game) {
        this.game$.next(game);
        this.saveGameToStorage(game);
    }

    private saveGameToStorage(game: Game) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(game));
    }

    private loadGameFromStorage() {
        const savedGame = localStorage.getItem(this.STORAGE_KEY);
        if (savedGame) {
            try {
                const game = JSON.parse(savedGame) as Game;
                this.game$.next(game);
            } catch (error) {
                console.error('Failed to parse saved game:', error);
                localStorage.removeItem(this.STORAGE_KEY);
            }
        }
    }

    clearSavedGame() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.game$.next(null);
    }
}