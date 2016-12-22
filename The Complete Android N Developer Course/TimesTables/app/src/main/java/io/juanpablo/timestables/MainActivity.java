package io.juanpablo.timestables;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.SeekBar;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private SeekBar mSeekBar;
    private ListView mListView;
    private static final int TIMES_TABLES_LIMIT = 10;

    private void setTimesTable(int timesTable) {
        ArrayList<String> timesTableContent = new ArrayList<>();

        for (int i = 1; i <= TIMES_TABLES_LIMIT; i++) {
            timesTableContent.add(String.valueOf(i * timesTable));
        }

        ArrayAdapter<String> timesTableAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, timesTableContent);
        mListView.setAdapter(timesTableAdapter);
    }

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
                setTimesTable(timesTable);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        setTimesTable(10);
    }
}
