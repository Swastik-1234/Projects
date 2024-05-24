package com.example.equinox2.Activity;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.equinox2.ViewModel.LeaveRequest;
import com.example.equinox2.Adapter.LeaveRequestAdapter;
import com.example.equinox2.R;

import java.util.ArrayList;
import java.util.List;

public class FormLeaveRequest extends AppCompatActivity {

        private RecyclerView recyclerView;
        private LeaveRequestAdapter adapter;
        private ImageView imageView;


    private List<LeaveRequest> leaveRequestList;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_form_leave_request);
            ImageView backArrow = findViewById(R.id.imageView81Form);
            backArrow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(FormLeaveRequest.this, ApprovalHistory.class);
                    startActivity(intent);
                    finish(); // Optional, depending on your navigation requirements
                }
            });




            recyclerView = findViewById(R.id.formrecycle);
            recyclerView.setLayoutManager(new LinearLayoutManager(this));


            leaveRequestList = new ArrayList<>();
            leaveRequestList.add(new LeaveRequest("Casual Leave", "Nico Roseberg", "Sophia Jacob Singh", "25 May 2020", "27 May 2020", "2 Days", "I am requesting a personal leave of absence from work for family reasons", R.drawable.leave, R.drawable.approvers,R.drawable.approve,R.drawable.documents));



           adapter = new LeaveRequestAdapter(this, leaveRequestList,this);


            recyclerView.setAdapter(adapter);

        }


public void onApproveIconClicked() {
    // Open dialog box
    final Dialog dialog = new Dialog(this);
    dialog.setContentView(R.layout.dialog_box);


    ImageView closeImageView = dialog.findViewById(R.id.imageView69);
    closeImageView.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            dialog.dismiss();
        }
    });

    TextView submitTextView = dialog.findViewById(R.id.textView99);
    submitTextView.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            // Handle submit button click
            dialog.dismiss();
        }
    });

    dialog.show();
}
    }