package com.example.equinox2.Fragment;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.equinox2.Activity.FormLeaveRequest;
import com.example.equinox2.R;

public class AllRequestFragment extends Fragment {

    public AllRequestFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_approved_tab_content, container, false);

        // Find the container view
        View containerLayout = view.findViewById(R.id.imageView24);

        // Set onClickListener for the container
        containerLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Open the FormLeaveRequest activity when the container is clicked
                startActivity(new Intent(getActivity(), FormLeaveRequest.class));
            }
        });

        return view;
    }
}