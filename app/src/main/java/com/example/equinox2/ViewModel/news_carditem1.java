package com.example.equinox2.ViewModel;

public class news_carditem1 {

    private String Title;
    private String Subtitle;
    private String Description1;
    private String Description2;
    private int ImageResource1;
    private int ImageResource2;

    public news_carditem1(String title, String subtitle, String description1, String description2, int imageResource1, int imageResource2) {
       this.Title = title;
        this.Subtitle = subtitle;
        this.Description1 = description1;
        this.Description2 = description2;
        this.ImageResource1 = imageResource1;
        this.ImageResource2 = imageResource2;
    }

    public String getTitle() {
        return Title;
    }

    public String getSubtitle() {
        return Subtitle;
    }

    public String getDescription1() {
        return Description1;
    }

    public String getDescription2() {
        return Description2;
    }

    public int getImageResource1() {
        return ImageResource1;
    }

    public int getImageResource2() {
        return ImageResource2;
    }
}