#include <stdio.h>

#define PLAYER_ONE_SYMBOL 'X'
#define PLAYER_TWO_SYMBOL 'O'
int winner;
static char board[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
static int winPositions[][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
        {1, 4, 7},
        {2, 5, 8},
        {3, 6, 9},
        {1, 5, 9},
        {3, 5, 7}
};

void drawboard() {
    fflush(stdout);
    printf("\n     |     |      \n");
    printf("  %c  |  %c  |  %c\n", board[1], board[2], board[3]);
    printf("_____|_____|_____\n");
    printf("     |     |      \n");
    printf("  %c  |  %c  |  %c\n", board[4], board[5], board[6]);
    printf("_____|_____|_____\n");
    printf("     |     |      \n");
    printf("  %c  |  %c  |  %c\n", board[7], board[8], board[9]);
    printf("     |     |      \n");
}

int markBoard(int cell, int turn) {
    if ((cell > 0 && cell < 10) && (board[cell] != PLAYER_ONE_SYMBOL && board[cell] != PLAYER_TWO_SYMBOL)) {
        board[cell] = turn ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL;
        return 1;
    } else {
        printf("Invalid selection. Please enter another number.\n");
        return 0;
    }
}

int checkForAvailableCells() {
    for (int x = 1; x < 10; x++) {
        int availableCells = board[x] != PLAYER_ONE_SYMBOL && board[x] != PLAYER_TWO_SYMBOL;
        if (availableCells) {
            return 0;
        }
    }
    return 1;
}

int checkForWin() {
    for (int y = 0; y < 8; y++) {
        int markOne = board[winPositions[y][0]];
        int markTwo = board[winPositions[y][1]];
        int markThree = board[winPositions[y][2]];
        if (markOne == markTwo && markOne == markThree) {
            winner = markOne == PLAYER_ONE_SYMBOL ? 1 : 2;
            return winner;
        }
    }
    return 0;
}

int main() {
    int cell = 0, turn = 0;
    printf("\n\t\tTic Tac Toe\n\n");
    printf("Player 1 (%c)  -  Player 2 (%c)\n", PLAYER_ONE_SYMBOL, PLAYER_TWO_SYMBOL);
    while (!(checkForWin() || checkForAvailableCells())) {
        int validSelection = 0;
        while(!validSelection) {
            drawboard();
            printf("\nPlayer %c, enter a number: ", turn ? '2' : '1');
            scanf(" %d", &cell);
            validSelection = markBoard(cell, turn);
        }
        turn = !turn;
    }

    drawboard();
    winner ? printf("\n==>Player %d wins!", winner) : printf("\nDraw!");
    return 0;
}
