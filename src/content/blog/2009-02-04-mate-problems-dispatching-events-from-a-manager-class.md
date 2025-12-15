---
title:  Mate - Problems Dispatching Events from a Manager Class
description: I switched to Mate framework for Flex a few months ago and really love its simplicity in respect to Cairngorm and other frameworks. Mate is a tag-based, event-driven Flex framework that provides a mechanism for dependency injection to make it easy for the different parts of an application to get the data and objects they need. If you know Spring then youll love Mate. In this project Im using BlazeDS for remoting and messaging with Salesforce.com and SQL Server 2005. With Mate, you typically have
pubDate: "2009-02-04 12:28:29 +0300"
heroImage: '/images/slugs/mate-problems-dispatching-events-from-a-manager-class.jpg'
tags:   ["salesforce", "flex"]
slug: "2009/02/04/mate-problems-dispatching-events-from-a-manager-class"
---
I switched to <a href="http://mate.asfusion.com/" target="_blank">Mate framework for Flex</a> a few months ago and really love its simplicity in respect to Cairngorm and other frameworks. Mate is a tag-based, event-driven Flex framework that provides a mechanism for dependency injection to make it easy for the different parts of an application to get the data and objects they need. If you know Spring then you'll love Mate.

In this project I'm using <a href="http://opensource.adobe.com/wiki/display/blazeds/BlazeDS/" target="_blank">BlazeDS</a> for remoting and messaging with Salesforce.com and SQL Server 2005.

With Mate, you typically have a view (ie Login.mxml) that dispatches an event (ie LoginEvent.DO_LOGIN) and an EventMap that listens for the event and performs some action (eg log into Salesforce.com). My problem was that I was using an inline itemrenderer in my view which was making it extremely difficult to process and dispatch the event. My proposed solution was to dispatch a simple event and have the EventMap invoke a method on my Manager:

```xml
<eventHandlers type="{LoginEvent.DO_LOGIN}">
  <methodInvoker generator="{SfdcManager}" method="doLogin"/>
</eventHandlers>
```
The Manager method would then process the login request based upon some business logic and then dispatch appropriate event:

```apex
public function doLogin():void {

 // process some business logic

 // dispatch the sfdc login event
 var evt:LoginEvent = new LoginEvent(LoginEvent.DO_SFDC_LOGIN);
 evt.username = "my_username";
 evt.password = "my_password";
 dispatchEvent(evt);

}
```
<em><strong>Unfortunately this approach does not work as events dispatched from non-views will not make it to the event map.</strong></em> I found a very <a href="http://mate.asfusion.com/forums/topic.php?id=319" target="_blank">detailed post of the process</a> and a proposed work around. There was also <a href="http://stackoverflow.com/questions/482085/flex-mate-framework-dispatching-events" target="_blank">another post</a> with some more information that helped me successfully dispatch my event from the Manager class.

Here is the event handler in the map injecting the event map's dispatcher into the Manager:

```xml
<eventHandlers type="{LoginEvent.DO_LOGIN}">
  <methodInvoker generator="{SfdcManager}" method="doLogin">
  <properties dispatcher="{scope.dispatcher}"/>
  </methodInvoker>
</eventHandlers>
```
In the Manager class we need to add a public property for the dispatcher reference:

```js[Bindable] public var dispatcher:GlobalDispatcher;
```
Now modify the method to dispatch events using the reference to the dispatcher public property (ie dispatcher.dispatchEvent(evt)):

```apex
public function doLogin():void {

  // process some business logic

  // dispatch the sfdc login event
  var evt:LoginEvent = new LoginEvent(LoginEvent.DO_SFDC_LOGIN);
  evt.username = "my_username";
  evt.password = "my_password";
  dispatcher.dispatchEvent(evt);

}
```
Now you can successfully dispatch an event from a Manager class and have it picked up from in the EventMap.


