package com.example.equinox2.ViewModel;


public class CardItem {

    private int icon;
    private String title;
    private String lastUpdated;
   // private int requestCount;
    private int requestCount;

    public CardItem(int icon, String title, String lastUpdated,int requestCount) {
        this.icon = icon;
        this.title = title;
        this.lastUpdated = lastUpdated;
        this.requestCount = requestCount;
    }

    public int getIcon() {
        return icon;
    }

    public String getTitle() {
        return title;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }
    public int getRequestCount() {
        return requestCount;
    }

    public String getEllipseText() {
        return String.valueOf(requestCount);
    }


}

