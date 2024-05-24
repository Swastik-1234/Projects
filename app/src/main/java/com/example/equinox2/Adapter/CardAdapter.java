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

public class CardAdapter extends RecyclerView.Adapter<CardAdapter.CardViewHolder> {

    private List<CardItem> cardItemList;

    public CardAdapter(List<CardItem> cardItemList) {
        this.cardItemList = cardItemList;
    }

    @NonNull
    @Override
    public CardViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_item, parent, false);
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
    }

    @Override
    public int getItemCount() {
        return cardItemList.size();
    }

    public static class CardViewHolder extends RecyclerView.ViewHolder {

        ImageView imageViewIcon;
        TextView textViewTitle;
        TextView textViewLastUpdated;
        TextView textViewEllipse;


        public CardViewHolder(@NonNull View itemView) {
            super(itemView);

            imageViewIcon = itemView.findViewById(R.id.leaveicon);
            textViewTitle = itemView.findViewById(R.id.leaverequest);
            textViewLastUpdated = itemView.findViewById(R.id.leavedates);
textViewEllipse=itemView.findViewById(R.id.ellipsenumber);
        }
    }
}
