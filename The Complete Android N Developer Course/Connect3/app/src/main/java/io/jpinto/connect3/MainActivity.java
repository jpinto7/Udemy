package io.jpinto.connect3;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import io.jpinto.connect3.model.Board;
import io.jpinto.connect3.model.Player;

public class MainActivity extends AppCompatActivity  {

    private Board mBoard;
    private TextView mGameMessage;
    private LinearLayout mAlert;
    private boolean mIsGameFinished = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mBoard = new Board(9);
        mIsGameFinished = false;
        mAlert = (LinearLayout) findViewById(R.id.alert);
        mAlert.setVisibility(View.INVISIBLE);
        mGameMessage = (TextView) findViewById(R.id.message);
    }

    public void dropIn(View view) {
        if (!mIsGameFinished) {
            ImageView counter = (ImageView) view;
            int counterCell = Integer.parseInt(counter.getTag().toString());
            if (mBoard.isCellAvailable(counterCell)) {
                counter.setTranslationY(-1000f);
                switch (mBoard.getActivePlayer()) {
                    case One:
                        counter.setImageResource(R.drawable.yellow);
                        mBoard.setPlayerAtCell(counterCell, Player.One);
                        mBoard.setActivePlayer(Player.Two);
                        break;
                    case Two:
                        counter.setImageResource(R.drawable.red);
                        mBoard.setPlayerAtCell(counterCell, Player.Two);
                        mBoard.setActivePlayer(Player.One);
                        break;
                }
                counter.animate().translationYBy(1000f).setDuration(300);
                mBoard.checkForWinner();
                if (mBoard.hasWinner()) {
                    mGameMessage.setText(String.format("%s has won", mBoard.getWinner()));
                    mAlert.setVisibility(View.VISIBLE);
                    mIsGameFinished = true;
                }

                if (!mBoard.hasAvailableCells()) {
                    mGameMessage.setText(R.string.tie_message_text);
                    mAlert.setVisibility(View.VISIBLE);
                    mIsGameFinished = true;
                }
            }
        }
    }

    public void restartGame(View view) {
        mBoard.restart();
        GridLayout board = (GridLayout) findViewById(R.id.board);
        for (int i = 0; i < board.getChildCount(); i++) {
            ImageView counterImage = (ImageView) board.getChildAt(i);
            counterImage.setImageResource(0);
        }
        mAlert.setVisibility(View.INVISIBLE);
        mIsGameFinished = false;
    }
}
