package com.example.equinox2.Activity;

import android.os.Bundle;
import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.view.View;
import android.widget.TextView;
import android.widget.ImageView;

import com.example.equinox2.R;

public class MPIN extends AppCompatActivity {

    EditText editTextDigit1, editTextDigit2, editTextDigit3, editTextDigit4;
    ImageView eyeIcon;
    boolean isPasswordVisible = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mpin);

        // Initialize EditText fields
        editTextDigit1 = findViewById(R.id.editTextDigit1);
        editTextDigit2 = findViewById(R.id.editTextDigit2);
        editTextDigit3 = findViewById(R.id.editTextDigit3);
        editTextDigit4 = findViewById(R.id.editTextDigit4);

        // Initialize eye icon
        eyeIcon = findViewById(R.id.eyeIcon);

        // Set input type to make entered digits appear as bullets
        setInputType();

        // Request focus on the first EditText field
        editTextDigit1.requestFocus();

        // Move focus to next EditText field automatically after entering a digit
        addTextChangeListeners();

        // Set onClickListener for "Set Pin" TextView
        TextView setPinTextView = findViewById(R.id.textView106);
        setPinTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Concatenate the PIN digits
                String pin = editTextDigit1.getText().toString() +
                        editTextDigit2.getText().toString() +
                        editTextDigit3.getText().toString() +
                        editTextDigit4.getText().toString();


                if (pin.length() == 4) {
                    // Proceed to the next activity
                    Intent intent = new Intent(MPIN.this, EquinoxAfterLogin.class);
                    startActivity(intent);
                    finish(); // Finish current activity to prevent returning back to it
                }
            }
        });

        // Set onClickListener for "Skip This" TextView
        TextView skipTextView = findViewById(R.id.textView107);
        skipTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Proceed to the next activity (implement this based on your requirement)
                Intent intent = new Intent(MPIN.this, EquinoxAfterLogin.class);
                startActivity(intent);
                finish(); // Finish current activity
            }
        });

        // Set onClickListener for eye icon to toggle visibility
        eyeIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isPasswordVisible = !isPasswordVisible;
                togglePasswordVisibility();
            }
        });
    }

    private void setInputType() {
        editTextDigit1.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        editTextDigit2.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        editTextDigit3.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        editTextDigit4.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
    }

    private void addTextChangeListeners() {
        editTextDigit1.addTextChangedListener(new PinTextWatcher(editTextDigit1, editTextDigit2));
        editTextDigit2.addTextChangedListener(new PinTextWatcher(editTextDigit2, editTextDigit3));
        editTextDigit3.addTextChangedListener(new PinTextWatcher(editTextDigit3, editTextDigit4));
        editTextDigit4.addTextChangedListener(new PinTextWatcher(editTextDigit4, null));
    }

    private void togglePasswordVisibility() {
        if (isPasswordVisible) {
            editTextDigit1.setInputType(InputType.TYPE_CLASS_NUMBER);
            editTextDigit2.setInputType(InputType.TYPE_CLASS_NUMBER);
            editTextDigit3.setInputType(InputType.TYPE_CLASS_NUMBER);
            editTextDigit4.setInputType(InputType.TYPE_CLASS_NUMBER);
        } else {
            setInputType();
        }
    }

    private class PinTextWatcher implements TextWatcher {
        private EditText currentEditText;
        private EditText nextEditText;

        PinTextWatcher(EditText currentEditText, EditText nextEditText) {
            this.currentEditText = currentEditText;
            this.nextEditText = nextEditText;
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
        }

        @Override
        public void afterTextChanged(Editable s) {
            // Move focus to the next EditText if available and a digit is entered
            if (nextEditText != null && s.length() > 0) {
                nextEditText.requestFocus();
            }
        }
    }
}

