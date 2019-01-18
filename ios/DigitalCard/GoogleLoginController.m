//
//  GoogleLoginController.m
//  Happhe
//
//  Created by Ganesh Papola on 03/07/18.
//  Copyright © 2018 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "GoogleLoginController.h"
#import <React/RCTLog.h>
@import GoogleSignIn;
@interface GoogleLoginController ()<GIDSignInUIDelegate, GIDSignInDelegate>

@end

@implementation GoogleLoginController {
  NSString *userId;                // For client-side use only!
  NSString *idToken;
  NSString *name;
  NSString *familyName;
  NSString *givenName;
  NSString *email;
}
  RCT_EXPORT_MODULE();
  - (NSArray<NSString *> *)supportedEvents
  {
    return @[[self getSignInNotificationName],[self getFailedSignInNotificationName],@"EventReminderData"];
  }
  RCT_EXPORT_METHOD(logout)
  {
   [[GIDSignIn sharedInstance] signOut]; // log out user
  }

  RCT_EXPORT_METHOD(login)
  {
    RCTLogInfo(@"Pretending to create an event ");
    [GIDSignIn sharedInstance].delegate = self;
    [GIDSignIn sharedInstance].uiDelegate = self;
    [[GIDSignIn sharedInstance] signOut];
    [[GIDSignIn sharedInstance] signIn];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didSignIn:) name:[self getSignInNotificationName] object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didFailSignIn:) name:[self getFailedSignInNotificationName] object:nil];
    
  }
  
  - (UIViewController *)getTopViewController {
    
    UIViewController *topViewController = [[[UIApplication sharedApplication] keyWindow] rootViewController];
    while (true)
    {
      if (topViewController.presentedViewController) {
        topViewController = topViewController.presentedViewController;
      } else if ([topViewController isKindOfClass:[UINavigationController class]]) {
        UINavigationController *nav = (UINavigationController *)topViewController;
        topViewController = nav.topViewController;
      } else if ([topViewController isKindOfClass:[UITabBarController class]]) {
        UITabBarController *tab = (UITabBarController *)topViewController;
        topViewController = tab.selectedViewController;
      } else {
        break;
      }
    }
    return topViewController;
  }
  -(NSDictionary *)getUserDictionary {
    
    NSMutableDictionary* obj= [[NSMutableDictionary alloc]init];
    if (userId != nil) {
      [obj setObject:userId forKey:@"userId"];
    }
    if (idToken != nil) {
      [obj setObject:idToken forKey:@"idToken"];
    }
    if (name != nil) {
      [obj setObject:name forKey:@"name"];
    }
    if (familyName != nil) {
      [obj setObject:familyName forKey:@"familyName"];
    }
    if (givenName != nil) {
      [obj setObject:givenName forKey:@"givenName"];
    }
    if (email != nil) {
      [obj setObject:email forKey:@"email"];
    }
//    [obj setObject:value forKey:@"key"];
     NSLog(@"Customer details: %@ ", obj);
     [self sendEventWithName:[self getSignInNotificationName] body:@{@"name": obj}];
    return obj;
  }
  - (NSString *)getSignInNotificationName {
    return @"GoogleSignInSuccess";
  }
  - (NSString *)getFailedSignInNotificationName {
    return @"GoogleSignInFail";
  }
#pragma mark GoogleSignIn methods.
  
- (void)signIn:(GIDSignIn *)signIn didSignInForUser:(GIDGoogleUser *)user withError:(NSError *)error {
  // Perform any operations on signed in user here.
    [self sendUserDetailsForUser:user];
 
}
  
- (void)signInWillDispatch:(GIDSignIn *)signIn error:(NSError *)error {
//stop any animation if any
}
  
  // Present a view that prompts the user to sign in with Google
- (void)signIn:(GIDSignIn *)signIn
presentViewController:(UIViewController *)viewController {
  
  [[self getTopViewController] presentViewController:viewController animated:YES completion:nil];
}
  
  // Dismiss the "Sign in with Google" view
- (void)signIn:(GIDSignIn *)signIn
dismissViewController:(UIViewController *)viewController {
  [[self getTopViewController] dismissViewControllerAnimated:YES completion:nil];
}
  
 
  -(void)didSignIn:(NSNotification*)notification
  {
    NSDictionary *dict = notification.userInfo;
    [self sendEventWithName:[self getSignInNotificationName] body:dict];
  }
  
  -(void)didFailSignIn:(NSNotification*)notification {
    NSDictionary *dict = notification.userInfo;
    [self sendEventWithName:[self getFailedSignInNotificationName] body:dict];
  }
  -(void)sendUserDetailsForUser :(GIDGoogleUser *)user {
    userId = user.userID;                  // For client-side use only!
    idToken = user.authentication.idToken; // Safe to send to the server
    name = user.profile.name;
    email = user.profile.email;
    familyName = user.profile.familyName;
    givenName = user.profile.givenName;
    [[NSNotificationCenter defaultCenter] postNotificationName:[self getSignInNotificationName] object:nil userInfo:[self getUserDictionary]];
  }
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
