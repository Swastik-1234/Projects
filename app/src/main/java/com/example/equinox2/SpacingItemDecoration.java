package com.example.equinox2;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import android.graphics.Rect;
import android.view.View;

public class SpacingItemDecoration extends RecyclerView.ItemDecoration {

    private final int spacing;

    public SpacingItemDecoration(int spacing) {
        this.spacing = spacing;
    }

    @Override
    public void getItemOffsets(@NonNull Rect outRect, @NonNull View view, @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {
        super.getItemOffsets(outRect, view, parent, state);
        outRect.bottom = spacing;
    }
}