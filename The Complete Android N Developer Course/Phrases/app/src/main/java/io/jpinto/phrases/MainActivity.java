package io.jpinto.phrases;

import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void buttonClicked(View view) {
        int id = view.getId();
        String identifierId = getResources().getResourceEntryName(id);
        int resourceId = getResources().getIdentifier(identifierId, "raw", "io.jpinto.phrases");
        playSound(resourceId);
    }

    private void playSound(int resourceId) {
        MediaPlayer player = MediaPlayer.create(this, resourceId);
        player.start();
    }

}
