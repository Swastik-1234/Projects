package com.example.equinox2.Fragment;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.equinox2.Adapter.CardAdapter;
import com.example.equinox2.ViewModel.CardItem;
import com.example.equinox2.Activity.Notifications;
import com.example.equinox2.Activity.ProfileChanger;
import com.example.equinox2.R;
import com.example.equinox2.SpacingItemDecoration;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class HomeFragment extends Fragment {

    private Toolbar toolbar;
    private RecyclerView recyclerView;
    private List<CardItem> cardItemList;
    private CardAdapter cardAdapter;
    private static final int REQUEST_CODE_PROFILE_IMAGE = 1;
    private ImageView ProfileImageView;
    private static final String PROFILE_IMAGE_KEY = "profile_image";


    private static final int REQUEST_IMAGE_CAPTURE = 101;
    private static final int REQUEST_IMAGE_GALLERY = 102;
    private static final int REQUEST_IMAGE_CROP = 103;
    private static final String TAG = "HomeFragment";
    private ImageView profileImageView;
    private ImageView imageView77, imageView78,imageView77d;
    private Uri profileImageUri;


    private Uri selectedImageUri;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        // Initialize toolbar
        toolbar = view.findViewById(R.id.toolbar);
        ImageView notificationIcon = view.findViewById(R.id.imageView5);
        imageView77 = view.findViewById(R.id.imageView77c);
        imageView78 = view.findViewById(R.id.imageView78);
        imageView77d=view.findViewById(R.id.imageView77d);
        View.OnClickListener notificationClickListener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(), Notifications.class);
                startActivity(intent);
            }
        };
        recyclerView = view.findViewById(R.id.recyclerViewCards);
        imageView78.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                imageView77.setVisibility(View.GONE);
                imageView77d.setVisibility((View.GONE));
                imageView78.setVisibility(View.GONE);
                FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) recyclerView.getLayoutParams();
                layoutParams.topMargin = getResources().getDimensionPixelSize(R.dimen.recyclerView_margin_top);
                recyclerView.setLayoutParams(layoutParams);



            }
        });

        notificationIcon.setOnClickListener(notificationClickListener);
        profileImageView = view.findViewById(R.id.imageView8);

        // Load the profile picture from SharedPreferences and display it
        String profileImagePath = getActivity().getSharedPreferences("profile_data", Context.MODE_PRIVATE)
                .getString(PROFILE_IMAGE_KEY, null);

        if (profileImagePath != null) {
            File profileImageFile = new File(profileImagePath);
            if (profileImageFile.exists()) {
                Bitmap profileBitmap = BitmapFactory.decodeFile(profileImageFile.getAbsolutePath());
                profileImageView.setImageBitmap(profileBitmap);
            }
        }

        int spacing = 4;
        recyclerView.addItemDecoration(new SpacingItemDecoration(spacing));
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));

        recyclerView.addItemDecoration(new SpacingItemDecoration(spacing));

     // Initialize  list of card items
        cardItemList = new ArrayList<>();


        cardItemList.add(new CardItem(R.drawable.leave, getString(R.string.leave), getString(R.string.last_updated_on_20_may_10_45am), 5));
        cardItemList.add(new CardItem(R.drawable.pms, "PMS Request", getString(R.string.last_updated_on_20_may_10_45am), 8));
        cardItemList.add(new CardItem(R.drawable.patch, "Patch release Request", getString(R.string.last_updated_on_20_may_10_45am), 3));
        cardItemList.add(new CardItem(R.drawable.foc, "FOC Insurance Request", getString(R.string.last_updated_on_20_may_10_45am), 10));
        cardItemList.add(new CardItem(R.drawable.allowance, "Allowance", getString(R.string.last_updated_on_20_may_10_45am), 7));
        cardItemList.add(new CardItem(R.drawable.material, "Material Request", getString(R.string.last_updated_on_20_may_10_45am), 12));






    // Create and set up the adapter
        cardAdapter = new CardAdapter(cardItemList);
        recyclerView.setAdapter(cardAdapter);

        // Set toolbar as the action bar
        AppCompatActivity activity = (AppCompatActivity) getActivity();
        if (activity != null) {

        }

        profileImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(), ProfileChanger.class);
                startActivity(intent);
            }
        });


        return view;
    }

}
