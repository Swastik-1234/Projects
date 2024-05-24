package com.example.equinox2.Adapter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.equinox2.R;
import com.example.equinox2.ViewModel.news_carditem1;
import com.example.equinox2.ViewModel.news_carditem2;

import java.util.List;
public class NewsCardAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {


        private List<Object> mItems;

        public NewsCardAdapter(List<Object> items) {
            mItems = items;
        }

        @Override
        public int getItemViewType(int position) {
            if (position % 2 == 0) {
                return 1;
            } else {
                return 2;
            }
        }

        @Override
        public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view;
            if (viewType == 1) {
                view = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_news, parent, false);
                return new CardItem1ViewHolder(view);
            } else {
                view = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_news, parent, false);
                return new CardItem2ViewHolder(view);
            }
        }

        @Override
        public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
            Object item = mItems.get(position);
            if (item instanceof news_carditem1) {
                news_carditem1 cardItem1 = (news_carditem1) item;
                CardItem1ViewHolder cardItem1Holder = (CardItem1ViewHolder) holder;
                cardItem1Holder.titleTextView.setText(cardItem1.getTitle());
                cardItem1Holder.subtitleTextView.setText(cardItem1.getSubtitle());
                cardItem1Holder.descriptionTextView1.setText(cardItem1.getDescription1());
                cardItem1Holder.descriptionTextView2.setText(cardItem1.getDescription2());
                cardItem1Holder.imageView1.setImageResource(cardItem1.getImageResource1());
                cardItem1Holder.imageView2.setImageResource(cardItem1.getImageResource2());
            } else if (item instanceof news_carditem2) {
                news_carditem2 cardItem2 = (news_carditem2) item;
                CardItem2ViewHolder cardItem2Holder = (CardItem2ViewHolder) holder;
                cardItem2Holder.titleTextView.setText(cardItem2.getTitle());
                cardItem2Holder.subtitleTextView.setText(cardItem2.getSubtitle());
                cardItem2Holder.descriptionTextView1.setText(cardItem2.getDescription1());
                cardItem2Holder.descriptionTextView2.setText(cardItem2.getDescription2());


                cardItem2Holder.imageView1.setImageResource(cardItem2.getImageResource1());
                cardItem2Holder.imageView2.setImageResource(cardItem2.getImageResource2());
                cardItem2Holder.imageView3.setImageResource(cardItem2.getImageResource3());
            }
        }

        @Override
        public int getItemCount() {
            return mItems.size();
        }

        public static class CardItem1ViewHolder extends RecyclerView.ViewHolder {

            public TextView titleTextView;
            public TextView subtitleTextView;
            public TextView descriptionTextView1;
            public TextView descriptionTextView2;
            public ImageView imageView1;
            public ImageView imageView2;

            public CardItem1ViewHolder(View itemView) {
                super(itemView);
                titleTextView = itemView.findViewById(R.id.textView16);
                subtitleTextView = itemView.findViewById(R.id.textView17);
                descriptionTextView1 = itemView.findViewById(R.id.textView18);
                descriptionTextView2 = itemView.findViewById(R.id.textView19);
                imageView1 = itemView.findViewById(R.id.imageView14);
                imageView2 = itemView.findViewById(R.id.imageView15);
            }
        }

        public static class CardItem2ViewHolder extends RecyclerView.ViewHolder {

            public TextView titleTextView;
            public TextView subtitleTextView;
            public TextView descriptionTextView1;
            public TextView descriptionTextView2;
            public TextView textView3;
            public ImageView imageView;
            public ImageView imageView1;
            public ImageView imageView2;
            public ImageView imageView3;

            public CardItem2ViewHolder(View itemView) {
                super(itemView);
                titleTextView = itemView.findViewById(R.id.textView20);
                subtitleTextView = itemView.findViewById(R.id.textView21);
                descriptionTextView1 = itemView.findViewById(R.id.textView22);
                descriptionTextView2 = itemView.findViewById(R.id.textView23);

                imageView1 = itemView.findViewById(R.id.imageView16);
                imageView2 = itemView.findViewById(R.id.imageView18);
                imageView3 = itemView.findViewById(R.id.imageView21);
            }
        }
    }