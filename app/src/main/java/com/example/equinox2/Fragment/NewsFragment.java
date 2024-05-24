package com.example.equinox2.Fragment;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.equinox2.Adapter.NewsCardAdapter;
import com.example.equinox2.R;
import com.example.equinox2.ViewModel.news_carditem1;
import com.example.equinox2.ViewModel.news_carditem2;

public class NewsFragment extends Fragment {

    private RecyclerView mRecyclerView;
    private NewsCardAdapter mCardAdapter;
    private List<Object> mItems;
//private List<news_carditem1> mItems;
   // private Toolbar mToolbar;
    private androidx.appcompat.widget.Toolbar mToolbar;

    public static NewsFragment newInstance() {
        return new NewsFragment();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_news, container, false);

        mToolbar = view.findViewById(R.id.toolbar2);
//        ((AppCompatActivity) getActivity()).setSupportActionBar(mToolbar);
//        ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        mRecyclerView = view.findViewById(R.id.recyclerViewCards1);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));

        mItems = new ArrayList<>();
        mItems.add(new news_carditem1("Knowledge Snippet", "Team Admin", "Constructive total loss", "A loss that occurs when the cost to repair damaged property plus its remaining salvage value equals or exceeds the property’s preload value",R.drawable.bulb,R.drawable.cross));
//        mItems.add(new news_carditem2("Title 2", "Subtitle 2", "Text 1", "Text 2", "Text 3", R.drawable.image2, R.drawable.image3, R.drawable.image4));
//        mItems.add(new news_carditem1("Title 3", "Subtitle 3", "Description 3", R.drawable.image5));
//        mItems.add(new news_carditem2("Title 4", "Subtitle 4", "Text 4", "Text 5", "Text 6", R.drawable.image6, R.drawable.image7, R.drawable.image8));
        mItems.add(new news_carditem2("Latest News","Team Admin","QIC issues $300mn Tier 2 capital notes","Despite the prevailing financial market turbulence across the globe, Qatar Insurance Company announces successful issuance of US$300 million",R.drawable.startup,R.drawable.rounded_rectangle,R.drawable.qic_icon));

        mCardAdapter = new NewsCardAdapter(mItems);
        mRecyclerView.setAdapter(mCardAdapter);

        return view;
    }
}