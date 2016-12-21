package io.juanpablo.timestables;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ListView;
import android.widget.SeekBar;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    SeekBar mSeekBar;
    ListView mListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mSeekBar = (SeekBar) findViewById(R.id.timesTablesSeekBar);
        mListView = (ListView) findViewById(R.id.timesTablesListView);

        mSeekBar.setMax(20);
        mSeekBar.setProgress(10);

        mSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                int min = 1;
                int timesTable;
                if (progress < min) {
                    timesTable = min;
                    seekBar.setProgress(min);
                } else {
                    timesTable = progress;
                }
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        int timesTable = 10;

        ArrayList<String> timesTableContent = new ArrayList<>();


    }
}
