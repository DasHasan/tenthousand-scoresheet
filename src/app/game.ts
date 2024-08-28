import {Player} from './player';

export interface Game {
    round: number;
    currentPlayerIndex: number;
    players: Player[];
}