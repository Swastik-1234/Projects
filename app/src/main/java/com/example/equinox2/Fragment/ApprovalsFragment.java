package com.example.equinox2.Fragment;

import android.os.Bundle;

import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.content.Intent;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.equinox2.Adapter.ApprovalCardAdapter;
import com.example.equinox2.Activity.ApprovalLeaveRequest;
import com.example.equinox2.ViewModel.CardItem;
import com.example.equinox2.R;

import java.util.ArrayList;
import java.util.List;


public class ApprovalsFragment extends Fragment {

    private Toolbar toolbar;
    private RecyclerView recyclerView;
    private List<CardItem> cardItemList;
    private ApprovalCardAdapter cardAdapter;
    private static final int REQUEST_CODE_PROFILE_IMAGE = 1;
    private ImageView ProfileImageView;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_approvals, container, false);
        toolbar = view.findViewById(R.id.toolbar3);


        recyclerView = view.findViewById(R.id.recyclerViewCards2);


//        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        cardItemList = new ArrayList<>();
        cardItemList.add(new CardItem(R.drawable.leave, getString(R.string.leave), getString(R.string.last_updated_on_20_may_10_45am), 5));
        cardItemList.add(new CardItem(R.drawable.pms, "PMS Request", getString(R.string.last_updated_on_20_may_10_45am), 8));
        cardItemList.add(new CardItem(R.drawable.patch, "Patch release Request", getString(R.string.last_updated_on_20_may_10_45am), 3));
        cardItemList.add(new CardItem(R.drawable.foc, "FOC Insurance Request", getString(R.string.last_updated_on_20_may_10_45am), 10));
        cardItemList.add(new CardItem(R.drawable.allowance, "Allowance", getString(R.string.last_updated_on_20_may_10_45am), 7));
        cardItemList.add(new CardItem(R.drawable.material, "Material Request", getString(R.string.last_updated_on_20_may_10_45am), 12));
        cardItemList.add(new CardItem(R.drawable.allowance, "Allowance", "last_updated_on_30_june_8:00am", 12));
        //cardAdapter = new ApprovalCardAdapter(cardItemList);

        cardAdapter = new ApprovalCardAdapter(cardItemList, new ApprovalCardAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int position) {
                if (position == 0) { // Assuming position 0 corresponds to "Leave" card
                    // Start ApprovalHistory activity
                    Intent intent = new Intent(getActivity(), ApprovalLeaveRequest.class);
                    startActivity(intent);
                }
            }
        });
        int position = cardItemList.size();

        recyclerView.setAdapter(cardAdapter);


        AppCompatActivity activity = (AppCompatActivity) getActivity();
        // Inflate the layout for this fragment
        return view;
    }
}