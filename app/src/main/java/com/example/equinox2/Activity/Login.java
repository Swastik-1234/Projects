package com.example.equinox2.Activity;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.example.equinox2.R;

public class Login extends AppCompatActivity {

    private EditText editTextLoginId;
    private EditText editTextPassword;
    private ImageView imageViewEye;
    private boolean isPasswordVisible = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Initialize views
        editTextLoginId = findViewById(R.id.editTextLoginId);
        editTextPassword = findViewById(R.id.editTextPassword);
        imageViewEye = findViewById(R.id.imageView4);
        ImageView backArrow = findViewById(R.id.imageView77);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Login.this, SplashScreen.class);
                startActivity(intent);
                finish(); // Optional, depending on your navigation requirements
            }
        });


        // Set click listener for eye button
        imageViewEye.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                togglePasswordVisibility();
            }
        });

        // Set click listener for login button
        Button loginButton = findViewById(R.id.button2);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login();
            }
        });
        Drawable customButtonBackground = getResources().getDrawable(R.drawable.custom_button_background);
        loginButton.setBackground(customButtonBackground);
    }

    private void togglePasswordVisibility() {
        if (isPasswordVisible) {
            // Hide password
            editTextPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
            isPasswordVisible = false;
            imageViewEye.setImageResource(R.drawable.eye);
        } else {
            // Show password
            editTextPassword.setInputType(InputType.TYPE_CLASS_TEXT);
            isPasswordVisible = true;
            imageViewEye.setImageResource(R.drawable.eye);
        }
    }

    private void login() {
        // Check login id and password
        String loginId = editTextLoginId.getText().toString();
        String password = editTextPassword.getText().toString();

        if (loginId.equals("12") && password.equals("12")) {
            // Successful login
            Intent intent = new Intent(Login.this, MPIN.class);
            startActivity(intent);
            finish(); // Finish the current activity to prevent going back to the login screen
        } else {
            // Invalid login
            Toast.makeText(this, "Invalid login", Toast.LENGTH_SHORT).show();
        }
    }
}
