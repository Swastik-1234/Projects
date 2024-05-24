package com.example.equinox2.Activity;

import android.os.Bundle;
import android.widget.FrameLayout;

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

public class EquinoxAfterLogin extends AppCompatActivity {

    private BottomNavigationView bottomNavigationView;

    private FrameLayout frameLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        setContentView(R.layout.activity_equinox_after_login);

        bottomNavigationView = findViewById(R.id.bottom_nav);
        frameLayout = findViewById(R.id.fragment_container);



        replaceFragment(new HomeFragment());
        bottomNavigationView.setOnItemSelectedListener(item -> {
            item.setChecked(true);
            int currItem = item.getItemId();
            item.setChecked(true);
            if (currItem == R.id.nav_home)
                replaceFragment(new HomeFragment());
            if (currItem == R.id.nav_services)
                replaceFragment(new ServicesFragment());
            if (currItem == R.id.nav_requests)
                replaceFragment(new MyRequestsFragment());
            if (currItem == R.id.nav_approvals)
                replaceFragment(new ApprovalsFragment());
            if (currItem == R.id.nav_news)
                replaceFragment(new NewsFragment());
            return true;
        });



    }
    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.fragment_container, fragment);
        fragmentTransaction.commit();
    }
}
