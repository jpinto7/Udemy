package io.juanpablo.eggtimer;

import android.media.MediaPlayer;
import android.os.CountDownTimer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.sql.Time;

enum TimerStatus {
    RUNNING, IDLE
}

public class MainActivity extends AppCompatActivity {

    private SeekBar mSeekBar;
    private TextView mTimerTextView;
    private TimerStatus mTimerStatus = TimerStatus.IDLE;
    private Button mControllerButton;
    private CountDownTimer mCountDownTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mSeekBar = (SeekBar) findViewById(R.id.timerSeekBar);
        mTimerTextView = (TextView) findViewById(R.id.timerTextView);
        mControllerButton = (Button) findViewById(R.id.controllerButton);
        mSeekBar.setMax(600);
        mSeekBar.setProgress(30);

        mSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                updateTimer(progress);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
    }

    private void updateTimer(int secondsRemaining) {
        int minutes = secondsRemaining / 60;
        int seconds = secondsRemaining % 60;
        mTimerTextView.setText(String.format("%02d:%02d", minutes, seconds));
    }

    private void resetTimer() {
        mCountDownTimer.cancel();
        mTimerTextView.setText(String.format("%02d:%02d", 0, 30));
        mControllerButton.setText("Go!");
        mSeekBar.setProgress(30);
        mSeekBar.setEnabled(true);
        mTimerStatus = TimerStatus.IDLE;
    }

    private void startTimer() {
        mSeekBar.setEnabled(false);
        mControllerButton.setText("Stop");
        mCountDownTimer = new CountDownTimer(mSeekBar.getProgress() * 1000 + 100, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                updateTimer((int) millisUntilFinished / 1000);
            }

            @Override
            public void onFinish() {
                resetTimer();
                MediaPlayer.create(getApplicationContext(), R.raw.airhorn).start();
            }
        }.start();
        mTimerStatus = TimerStatus.RUNNING;
    }

    public void controlTimer(View view) {
        switch (mTimerStatus) {
            case RUNNING:
                resetTimer();
                break;
            case IDLE:
                mControllerButton.setText("Stop");
                startTimer();
                break;
        }
    }
}
