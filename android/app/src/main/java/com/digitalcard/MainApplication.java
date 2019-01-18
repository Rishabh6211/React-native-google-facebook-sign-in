package com.digitalcard;

import android.app.Application;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;//google-signin
import com.horcrux.svg.SvgPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;//native-splash

import cl.json.RNSharePackage;//React-native-share
// import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import cl.json.ShareApplication;//React-native-share

import java.util.Arrays;
import java.util.List;
import com.airbnb.android.react.maps.MapsPackage;

public class MainApplication extends NavigationApplication {
          private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

        protected static CallbackManager getCallbackManager() {
                return mCallbackManager;
        }
        @Override
        protected ReactGateway createReactGateway() {
                ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
                         @Override
                        protected String getJSMainModuleName() {
                                return "index";
                        }
                };
                return new ReactGateway(this, isDebug(), host);
       }

        @Override
        public boolean isDebug() {
            return BuildConfig.DEBUG;
        }

        protected List<ReactPackage> getPackages() {
                return Arrays.<ReactPackage>asList(
                        new MapsPackage(),
                      
                        new VectorIconsPackage(),
                        new FIRMessagingPackage(),//react-native-fcm
                          new FBSDKPackage(mCallbackManager),
                        new RNSharePackage(),//React-native-share
                        new RNGoogleSignInPackage(),
                      
                        new SplashScreenReactPackage()//native-splash-screen
                );
        }

        @Override
        public List<ReactPackage> createAdditionalReactPackages() {
            return getPackages();
        }

        public String getFileProviderAuthority() { //react-native-share
                return "com.digitalcard.provider";
        }

        @Override
        public void onCreate() { 
                super.onCreate();
                FacebookSdk.sdkInitialize(getApplicationContext());
                AppEventsLogger.activateApp(this);
                SoLoader.init(this, /* native exopackage */ false); // <-- Check this line exists within the block
        }

        //  @Override
        // protected void attachBaseContext(Context base) {
        //         super.attachBaseContext(base);
        //         MultiDex.install(this);
        // }

}