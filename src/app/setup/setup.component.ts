import { Component, inject } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CardComponent } from "../card/card.component";
import { Game } from "../game";
import { GameService } from "../game.service";

@Component({
    selector: "app-setup",
    standalone: true,
    imports: [
        NgTemplateOutlet,
        FormsModule,
        RouterLink,
        CardComponent,
        ReactiveFormsModule
    ],
    templateUrl: "./setup.component.html",
    styles: ``
})
export class SetupComponent {
    fb = inject(FormBuilder);
    playerForm = this.fb.group({
        name: ["", Validators.required]
    });

    game: Game = {
        players: []
    };

    addPlayer() {
        if (this.playerForm.valid) {
            const name = this.playerForm.get("name")?.value!;
            this.game.players.push({
                name,
                picture: name + Date.now(),
                scores: [],
                sum: 0
            });
            this.playerForm.reset();
        }
    }

    removePlayer(index: number) {
        this.game.players.splice(index, 1);
    }

    gameService = inject(GameService);

    router = inject(Router);

    startGame() {
        if (!this.game.players.length) {
            return;
        }
        this.gameService.startGame(this.game);
        this.router.navigate(["/game"]);
    }
}
