//
//  NotificationService.swift
//  RNGains
//
//  Created by Kian Popat on 30/08/2024.
//
import Foundation
import UserNotifications
import React

@objc(NotificationServiceBridge)
class NotificationService: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "NotificationServiceBridge"
  }

    static func requiresMainQueueSetup() -> Bool {
    // Return true if your module initialization requires the main thread.
    return true
  }
  
  // static let notificationService = NotificationService() //singleton?
  
  @objc func requestAuthorization() {
    print("🚀 ~ NotificationService: ~ @objcfuncrequestAuthorization ~ requestAuthorization:")
    let center = UNUserNotificationCenter.current()
    center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
      if let error = error {
        print("authorization error: \(error.localizedDescription)")
      }
    }
  }
  
  @objc func scheduleNotification(_ title: String, body: String, timeInterval: TimeInterval) {
    let content = UNMutableNotificationContent()
    content.title = title
    content.body = body
    content.sound = .default

    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: timeInterval, repeats: false)
    let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)

    UNUserNotificationCenter.current().add(request) { error in
      if let error = error {
        print("Notification error: \(error.localizedDescription)")
      }
    }
  }
}
