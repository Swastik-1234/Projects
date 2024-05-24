package com.example.equinox2.Activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.equinox2.R;

public class Certificates extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_certificates);
        ImageView backArrow = findViewById(R.id.imageView83);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Certificates.this, AttachmentsHomeScreen.class);
                startActivity(intent);
                finish(); // Optional, depending on your navigation requirements
            }
        });

    }
}