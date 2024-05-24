package com.example.equinox2.Adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;


import com.example.equinox2.Activity.ApproversTimeline;
import com.example.equinox2.Activity.AttachmentsHomeScreen;
import com.example.equinox2.Activity.FormLeaveRequest;
import com.example.equinox2.ViewModel.LeaveRequest;
import com.example.equinox2.R;

public class LeaveRequestAdapter extends RecyclerView.Adapter<LeaveRequestAdapter.LeaveRequestViewHolder> {
    private List<LeaveRequest> leaveRequests;
    private Context context;
    private FormLeaveRequest formLeaveRequest;

    public LeaveRequestAdapter(Context context, List<LeaveRequest> leaveRequests,FormLeaveRequest formLeaveRequest) {
        this.leaveRequests = leaveRequests;
        this.context=context;
        this.formLeaveRequest = formLeaveRequest;

    }

    @NonNull
    @Override
    public LeaveRequestViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.activity_form_content2, parent, false);
        return new LeaveRequestViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull LeaveRequestViewHolder holder, int position) {

        LeaveRequest leaveRequest = leaveRequests.get(position);
        holder.leaveTypeTextView.setText(leaveRequest.getLeaveType());
        holder.fromTextView.setText(leaveRequest.getFrom());
        holder.toTextView.setText(leaveRequest.getTo());
        holder.startDateTextView.setText(leaveRequest.getStartDate());
        holder.endDateTextView.setText(leaveRequest.getEndDate());
        holder.noOfDaysTextView.setText(leaveRequest.getNoOfDays());
        holder.reasonTextView.setText(leaveRequest.getReason());
        holder.leaveImageView.setImageResource(leaveRequest.getLeaveImageResId());
        holder.approverImageView.setImageResource(leaveRequest.getApproverImageResId());
        holder.approveImageView.setImageResource(leaveRequest.getApproveImageResId());
        //holder.approverImageView.setImageResource(leaveRequest.getApproverImageResId());
        holder.documentImageView.setImageResource(leaveRequest.getDocumentImageResId());

        // Set OnClickListener for the approvers image
        holder.approveImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Open dialog box logic here
                formLeaveRequest.onApproveIconClicked();
            }
        });
        holder.documentImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(context, AttachmentsHomeScreen.class);
                context.startActivity(intent);
            }
        });
        holder.approverImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, ApproversTimeline.class);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return leaveRequests.size();
    }

    public static class LeaveRequestViewHolder extends RecyclerView.ViewHolder {
        TextView leaveTypeTextView;
        TextView fromTextView;
        TextView toTextView;
        TextView startDateTextView;
        TextView endDateTextView;
        TextView noOfDaysTextView;
        TextView reasonTextView;
        ImageView leaveImageView;
        ImageView approverImageView;
        ImageView approveImageView;
        ImageView documentImageView;



        public LeaveRequestViewHolder(@NonNull View itemView) {
            super(itemView);
            leaveTypeTextView = itemView.findViewById(R.id.textView53);
            fromTextView = itemView.findViewById(R.id.textView54);
            toTextView = itemView.findViewById(R.id.textView74);
            startDateTextView = itemView.findViewById(R.id.textView77);
            endDateTextView = itemView.findViewById(R.id.imageView34);
            noOfDaysTextView = itemView.findViewById(R.id.textView80);
            reasonTextView = itemView.findViewById(R.id.textView82);
            leaveImageView = itemView.findViewById(R.id.imageView31); // ID of the leave image
            approverImageView = itemView.findViewById(R.id.imageView48); // ID of the approver image
            approveImageView=itemView.findViewById(R.id.imageView50C);
            documentImageView=itemView.findViewById(R.id.imageView49);

        }
    }
}
