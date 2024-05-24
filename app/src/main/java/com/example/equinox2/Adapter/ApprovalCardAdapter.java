
package com.example.equinox2.Adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.equinox2.ViewModel.CardItem;
import com.example.equinox2.R;

import java.util.List;

public class ApprovalCardAdapter extends RecyclerView.Adapter<ApprovalCardAdapter.CardViewHolder> {

    private List<CardItem> cardItemList;

    private OnItemClickListener listener;
    public interface OnItemClickListener {
        void onItemClick(int position);
    }
    public ApprovalCardAdapter(List<CardItem> cardItemList, OnItemClickListener listener) {
        this.cardItemList = cardItemList;
        this.listener=listener;

    }

    @NonNull
    @Override
    public CardViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_items_approval, parent, false);
        return new CardViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CardViewHolder holder, int position) {
        CardItem cardItem = cardItemList.get(position);

        // Bind data to views
        holder.imageViewIcon.setImageResource(cardItem.getIcon());
        holder.textViewTitle.setText(cardItem.getTitle());
        holder.textViewLastUpdated.setText(cardItem.getLastUpdated());
        holder.textViewEllipse.setText(cardItem.getEllipseText());



        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onItemClick(position);
                }
            }
        });


    }

    @Override
    public int getItemCount() {
        return cardItemList.size();
    }

    public void addItems(List<CardItem> newItems, int position) {
        int startPosition = cardItemList.size();
        cardItemList.addAll(newItems);
        notifyItemRangeInserted(position, newItems.size());
    }

    public static class CardViewHolder extends RecyclerView.ViewHolder {

        ImageView imageViewIcon;
        TextView textViewTitle;
        TextView textViewLastUpdated;
        TextView textViewEllipse;

        public CardViewHolder(@NonNull View itemView) {
            super(itemView);

            imageViewIcon = itemView.findViewById(R.id.imageView17);
            textViewTitle = itemView.findViewById(R.id.textView25);
            textViewLastUpdated = itemView.findViewById(R.id.textView26);
            textViewEllipse=itemView.findViewById(R.id.textView27);
        }
    }
}