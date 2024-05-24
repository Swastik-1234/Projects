package com.example.equinox2.Activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.equinox2.R;

public class AttachmentsHomeScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_attachments_home_screen);
        ImageView imageView68 = findViewById(R.id.imageView68);
        ImageView backArrow = findViewById(R.id.imageView81);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AttachmentsHomeScreen.this, ApproversTimeline.class);
                startActivity(intent);
                finish(); // Optional, depending on your navigation requirements
            }
        });

        // Attach OnClickListener to imageView68
        imageView68.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create an intent to start the Certificates activity
                Intent intent = new Intent(AttachmentsHomeScreen.this, Certificates.class);
                startActivity(intent);
            }
        });

    }
}