import { Injectable, signal } from "@angular/core";
import { Game } from "./game";

@Injectable({
    providedIn: "root"
})
export class GameService {
    private readonly STORAGE_KEY = "zehntausend_game_state";

    game = signal<Game | undefined>(undefined);

    startGame(game: Partial<Game>) {
        this.game.set({
            round: 0,
            currentPlayerIndex: 0,
            players: game.players!.map((player) => ({
                name: player.name,
                picture: player.picture,
                sum: 0,
                scores: []
            })),
            ...game
        });
    }

    saveGameToStorage(game?: Game) {
        if (game) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(game));
        }
    }

    loadGameFromStorage() {
        const savedGame = localStorage.getItem(this.STORAGE_KEY);
        if (savedGame) {
            try {
                const game = JSON.parse(savedGame) as Game;
                this.game.set(game);
            } catch (error) {
                console.error("Failed to parse saved game:", error);
                localStorage.removeItem(this.STORAGE_KEY);
            }
        }
    }

    clearSavedGame() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.game.set(undefined);
    }
}