
package com.example.equinox2.Activity;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.example.equinox2.R;
import com.yalantis.ucrop.UCrop;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class ProfileChanger extends AppCompatActivity {
    private static final int REQUEST_IMAGE_CAPTURE = 101;
    private static final int REQUEST_IMAGE_GALLERY = 102;
    private static final int PERMISSION_REQUEST_CODE = 200;
    private static final String PROFILE_IMAGE_KEY = "profile_image";
    private static final String PROFILE_IMAGE_FILE_NAME = "profile_image.jpg";

    ImageView imageView;
    ImageView editButton;
    SharedPreferences sharedPreferences;
    private Uri selectedImageUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_changer);
        ImageView backArrow = findViewById(R.id.imageView87);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfileChanger.this, EquinoxAfterLogin.class);
                startActivity(intent);
                finish(); // Optional, depending on your navigation requirements
            }
        });


        sharedPreferences = getSharedPreferences("profile_data", MODE_PRIVATE);

        if (!checkPermission()) {
            requestPermission();
        }

        imageView = findViewById(R.id.imageView9);
        editButton = findViewById(R.id.imageView10);

        // Load the profile picture from internal storage and display it
        File profileImageFile = new File(getFilesDir(), PROFILE_IMAGE_FILE_NAME);
        if (profileImageFile.exists()) {
            Bitmap profileBitmap = BitmapFactory.decodeFile(profileImageFile.getAbsolutePath());
            imageView.setImageBitmap(profileBitmap);
        }

        editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showEditOptions();
            }
        });
    }

    private boolean checkPermission() {
        return ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, PERMISSION_REQUEST_CODE);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    private void showEditOptions() {
        CharSequence[] options = {"Take Photo", "Choose from Gallery", "Cancel"};
        AlertDialog.Builder builder = new AlertDialog.Builder(ProfileChanger.this);
        builder.setTitle("Select Option");
        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (options[item].equals("Take Photo")) {
                    dispatchTakePictureIntent();
                } else if (options[item].equals("Choose from Gallery")) {
                    dispatchChooseFromGalleryIntent();
                } else if (options[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

    private void dispatchChooseFromGalleryIntent() {
        Intent pickPhoto = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(pickPhoto, REQUEST_IMAGE_GALLERY);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK && data != null) {
            if (requestCode == REQUEST_IMAGE_GALLERY) {
                Uri imageUri = data.getData();
                if (imageUri != null) {
                    startCropActivity(imageUri);
                }
            }

            if (requestCode == REQUEST_IMAGE_CAPTURE) {
                Bundle extras = data.getExtras();
                Bitmap imageBitmap = (Bitmap) extras.get("data");
                saveProfileImage(imageBitmap);
            }

            if (requestCode == UCrop.REQUEST_CROP) {
                handleCropResult(data);
            }
        }
    }

    private void handleCropResult(Intent data) {
        final Uri resultUri = UCrop.getOutput(data);
        if (resultUri != null) {
            saveProfileImage(getBitmapFromUri(resultUri));
        }
    }

    private void saveProfileImage(Bitmap imageBitmap) {
        File profileImageFile = new File(getFilesDir(), PROFILE_IMAGE_FILE_NAME);
        OutputStream os = null;
        try {
            os = new FileOutputStream(profileImageFile);
            imageBitmap.compress(Bitmap.CompressFormat.JPEG, 90, os);
            os.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // Save the image path to SharedPreferences
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(PROFILE_IMAGE_KEY, profileImageFile.getAbsolutePath());
        editor.apply();

        // Update the ImageView with the new image
        imageView.setImageBitmap(imageBitmap);

        Intent resultIntent = new Intent();
        resultIntent.putExtra("profileBitmap", imageBitmap);
        setResult(Activity.RESULT_OK, resultIntent);
        finish();
    }

    private Bitmap getBitmapFromUri(Uri uri) {
        try {
            return MediaStore.Images.Media.getBitmap(this.getContentResolver(), uri);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void startCropActivity(Uri sourceUri) {
        Uri destinationUri = Uri.fromFile(new File(getCacheDir(), "cropped"));
        UCrop.of(sourceUri, destinationUri)
                .start(this);
    }
}
