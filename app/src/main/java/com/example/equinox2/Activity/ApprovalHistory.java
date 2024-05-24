package com.example.equinox2.Activity;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import androidx.viewpager2.widget.ViewPager2;

import com.example.equinox2.Adapter.ApprovalHistoryPagerAdapter;
import com.example.equinox2.Fragment.AllRequestFragment;
import com.example.equinox2.Fragment.ApprovedRequestFragment;
import com.example.equinox2.R;
import com.example.equinox2.Fragment.RejectedRequestFragment;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;


import androidx.annotation.Nullable;


import android.view.View;
import android.widget.ImageView;

public class ApprovalHistory extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_approval_history);
        ImageView backArrow = findViewById(R.id.imageView79);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ApprovalHistory.this, ApprovalLeaveRequest.class);
                startActivity(intent);
                finish(); // Optional, depending on your navigation requirements
            }
        });

        ViewPager2 viewPager = findViewById(R.id.viewpager);
        TabLayout tabLayout = findViewById(R.id.tablayout);
   ApprovalHistoryPagerAdapter adapter = new ApprovalHistoryPagerAdapter(this);
        adapter.addFragment(new AllRequestFragment(), getString(R.string.all));
        adapter.addFragment(new ApprovedRequestFragment(), getString(R.string.approved));
        adapter.addFragment(new RejectedRequestFragment(), getString(R.string.rejected));

        viewPager.setAdapter(adapter);

        viewPager.setAdapter(adapter);

        // Define tab titles
        String[] tabTitles = {getString(R.string.all), getString(R.string.approved), getString(R.string.rejected)};
        new TabLayoutMediator(tabLayout, viewPager, (tab, position) -> {
            tab.setText(adapter.getPageTitle(position));
        }).attach();

    }
}
