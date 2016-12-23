package io.juanpablo.eggtimer;

import android.os.CountDownTimer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.sql.Time;

enum TimerStatus {
    RUNNING, PAUSED, IDLE
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

    public void updateTimer(int secondsRemaining) {
        int minutes = (int) secondsRemaining / 60;
        int seconds = secondsRemaining % 60;
        mTimerTextView.setText(String.format("%02d:%02d", minutes, seconds));
    }

    private boolean isCountDownTimerRunning() {
        return mTimerStatus == TimerStatus.RUNNING;
    }

    public void controlTimer(View view) {
        switch (mTimerStatus) {
            case RUNNING:
                mTimerStatus = TimerStatus.PAUSED;
                mControllerButton.setText("Resume");
                break;
            case PAUSED:
                mTimerStatus = TimerStatus.RUNNING;
                mControllerButton.setText("Pause");
                break;
            case IDLE:
                mTimerStatus = TimerStatus.RUNNING;
                mControllerButton.setText("Pause");
                break;
        }
    }
}
