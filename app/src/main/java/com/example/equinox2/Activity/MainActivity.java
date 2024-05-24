package com.example.equinox2.Activity;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.FrameLayout;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;


import com.example.equinox2.Fragment.ApprovalsFragment;
import com.example.equinox2.Fragment.HomeFragment;
import com.example.equinox2.Fragment.MyRequestsFragment;
import com.example.equinox2.Fragment.NewsFragment;
import com.example.equinox2.Fragment.ServicesFragment;
import com.example.equinox2.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;


public class MainActivity extends AppCompatActivity {

    private BottomNavigationView bottomNavigationView;
   private FrameLayout frameLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);



        bottomNavigationView = findViewById(R.id.bottomNavView);
        frameLayout = findViewById(R.id.fragment_container);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                int itemId = menuItem.getItemId();
                if (itemId == R.id.nav_home) {

                    loadFragment(new HomeFragment(), false);
                } else if (itemId == R.id.nav_services) {
                    loadFragment(new ServicesFragment(), false);
                } else if (itemId == R.id.nav_approvals) {
                    loadFragment(new ApprovalsFragment(), false);
                } else if (itemId == R.id.nav_news) {
                    loadFragment(new NewsFragment(), false);
                } else {//add device
                    loadFragment(new MyRequestsFragment(), false);
                }


                return false;
            }
        });
        loadFragment(new HomeFragment(), true);

    }

    private void loadFragment(Fragment fragment, boolean isAppInitialised) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        if (isAppInitialised) {
            fragmentTransaction.add(R.id.fragment_container, fragment);
        } else {

            fragmentTransaction.replace(R.id.fragment_container, fragment);
        }
        fragmentTransaction.commit();

    }
}