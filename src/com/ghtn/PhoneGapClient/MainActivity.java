package com.ghtn.PhoneGapClient;

import android.os.Bundle;
import org.apache.cordova.DroidGap;

public class MainActivity extends DroidGap {
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.main);
        String page = getIntent().getStringExtra("page");
        if (page != null && !page.equals("") && !page.equals("null")) {
            super.loadUrl(page);
        } else {
            super.loadUrl("file:///android_asset/www/index.html");
        }

    }
}
