#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NotificationServiceBridge, NSObject)

RCT_EXTERN_METHOD(requestAuthorization)
RCT_EXTERN_METHOD(scheduleNotification:(NSString *)title body:(NSString *)body timeInterval:(double)timeInterval)

@end
