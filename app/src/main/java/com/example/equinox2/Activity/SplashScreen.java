package com.example.equinox2.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.ProgressBar;
import androidx.appcompat.app.AppCompatActivity;

import com.example.equinox2.R;

public class SplashScreen extends AppCompatActivity {
    private static final int SPLASH_TIMEOUT = 3000; // 3 seconds
    private ProgressBar progressBar;
    private Handler handler = new Handler();
    private int progressStatus = 0;
    private Runnable updateProgressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        progressBar = findViewById(R.id.progressBar);

        updateProgressBar = new Runnable() {
            @Override
            public void run() {
                if (progressStatus < 100) {
                    progressStatus += 1; // Increment progress
                    progressBar.setProgress(progressStatus);
                    handler.postDelayed(this, SPLASH_TIMEOUT / 100); // Update every (SPLASH_TIMEOUT / 100) milliseconds
                } else {
                    // Start the next activity
                    Intent intent = new Intent(SplashScreen.this, Login.class);
                    startActivity(intent);
                    finish(); // Optional, to close the splash screen activity
                }
            }
        };

        handler.post(updateProgressBar); // Start the progress bar animation
    }

    @Override
    protected void onDestroy() {
        handler.removeCallbacks(updateProgressBar);
        super.onDestroy();
    }
}
