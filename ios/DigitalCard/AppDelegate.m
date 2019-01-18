/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
 #import "RNFIRMessaging.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <GoogleMaps/GoogleMaps.h>

#import "RNSplashScreen.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [GIDSignIn sharedInstance].clientID = @"192164745336-f3fdebn6qnnvngrms28nd23dohdqsqvq.apps.googleusercontent.com";
  [GIDSignIn sharedInstance].delegate = self;
  
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  /* react-native-maps */
  [GMSServices provideAPIKey:@"AIzaSyAvWC5FxzIgT1UH3ZGzPMivSIJmaA9Bf48"];
  /* react-native-maps */
  [[FBSDKApplicationDelegate sharedInstance] application:application
    didFinishLaunchingWithOptions:launchOptions];
  // Add any custom logic here.
  
 
  
  //Splash-screen
  [RNSplashScreen show];
  
  //splash-screen
  
  //fcm
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  //fcm
  
 
  return YES;
}
  - (BOOL)application:(UIApplication *)application
openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication
annotation:(id)annotation {
   

  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation];
}
//fcm
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
 {
     [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
   }
//fcm

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url 
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]] || [[GIDSignIn sharedInstance] handleURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  // Add any custom logic here.
  
 
  
  return handled;
}

// [START signin_handler]
- (void)signIn:(GIDSignIn *)signIn
didSignInForUser:(GIDGoogleUser *)user
     withError:(NSError *)error {
  // Perform any operations on signed in user here.
  NSString *userId = user.userID;                  // For client-side use only!
  NSString *idToken = user.authentication.idToken; // Safe to send to the server
  NSString *fullName = user.profile.name;
  NSString *givenName = user.profile.givenName;
  NSString *familyName = user.profile.familyName;
  NSString *email = user.profile.email;
  // [START_EXCLUDE]
  NSDictionary *statusText = @{@"statusText":
                                 [NSString stringWithFormat:@"Signed in user: %@",
                                  fullName]};
  [[NSNotificationCenter defaultCenter]
   postNotificationName:@"ToggleAuthUINotification"
   object:nil
   userInfo:statusText];
  // [END_EXCLUDE]
}

- (void)signIn:(GIDSignIn *)signIn
didDisconnectWithUser:(GIDGoogleUser *)user
     withError:(NSError *)error {
  // Perform any operations when the user disconnects from app here.
  // [START_EXCLUDE]
  NSDictionary *statusText = @{@"statusText": @"Disconnected user" };
  [[NSNotificationCenter defaultCenter]
   postNotificationName:@"ToggleAuthUINotification"
   object:nil
   userInfo:statusText];
  // [END_EXCLUDE]
}


@end
