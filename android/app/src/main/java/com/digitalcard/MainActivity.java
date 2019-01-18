package com.digitalcard;


import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;
import android.content.Intent;//react-native-fcm
import org.devio.rn.splashscreen.SplashScreen;//native-splashscreen

public class MainActivity extends NavigationActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    // RCTSplashScreen.openSplashScreen(this);   //open splashscreen
        SplashScreen.show(this); 
        //RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);   //open splashscreen fullscreen
        super.onCreate(savedInstanceState);
}
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

     


}
