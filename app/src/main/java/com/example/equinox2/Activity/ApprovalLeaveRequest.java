package com.example.equinox2.Activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.equinox2.R;

public class ApprovalLeaveRequest extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_approval_leave_request);
        ImageView backArrow = findViewById(R.id.imageView82);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ApprovalLeaveRequest.this, EquinoxAfterLogin.class);
                startActivity(intent);
                finish(); // Optional, depending on your navigation requirements
            }
        });
        findViewById(R.id.buttonleave).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Handle button click to redirect to ApprovalHistory activity
                startActivity(new Intent(ApprovalLeaveRequest.this, ApprovalHistory.class));
            }
        });

        findViewById(R.id.button3).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Handle button click to redirect to ApprovalHistory activity
                startActivity(new Intent(ApprovalLeaveRequest.this, ApprovalHistory.class));
            }
        });

    }
}