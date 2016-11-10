package io.jpinto.connect3.model;

import java.util.Arrays;

/**
 * Created by Juan Pablo on 09/11/2016.
 */

public class Board {

    private Player[] mState;
    private Player mActivePlayer;
    private Player mWinner;
    private int[][] winningPositions = {
            {0, 1, 2},
            {3, 4, 5},
            {6, 7, 8},
            {0, 3, 6},
            {1, 4, 7},
            {2, 5, 8},
            {0, 4, 8},
            {2, 4, 6}
    };

    public Board(int numberOfCells) {
        mState = new Player[numberOfCells];
        restart();
    }

    public boolean isCellAvailable(int cellNumber) {
        return mState[cellNumber] == Player.None;
    }

    private Player getPlayerAtCell(int cellNumber) {
        return mState[cellNumber];
    }

    public Player getActivePlayer() {
        return mActivePlayer;
    }

    public void setActivePlayer(Player player) {
        mActivePlayer = player;
    }

    public void setPlayerAtCell(int cellNumber, Player player) {
        mState[cellNumber] = player;
    }

    public void checkForWinner() {
        for (int[] positions : winningPositions) {
            if (getPlayerAtCell(positions[0]) == getPlayerAtCell(positions[1]) && getPlayerAtCell(positions[1]) == getPlayerAtCell(positions[2]) && getPlayerAtCell(positions[0]) != Player.None) {
                mWinner = getPlayerAtCell(positions[0]);
                break;
            }
        }
    }

    public boolean hasWinner() {
        return mWinner != Player.None;
    }

    public Player getWinner() {
        return mWinner;
    }

    public void restart() {
        mActivePlayer = Player.One;
        mWinner = Player.None;
        Arrays.fill(mState, Player.None);
    }

    public boolean hasAvailableCells() {
        return Arrays.asList(mState).contains(Player.None);
    }

}
