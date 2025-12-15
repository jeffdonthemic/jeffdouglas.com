---
title:  Using Gmail Notifier with Multiple Accounts
description: I live and die by Gmail but if you are like me, and have multiple accounts, it can be a challenge to keep track of them. Google has a nifty little Gmail Notifier that runs in your menu bar but it only works for one account. My problem is that I need to track my Appirio account, personal account (Ive used Google App for my jeffdouglas.com domain for years) and then my Gmail account. Luckily theres a way to do this by duplicating the Gmail Notifier app so that multiple copies are running. Heres th
pubDate: "2009-11-15 15:08:29 +0300"
heroImage: '/images/slugs/using-gmail-notifier-with-multiple-accounts.jpg'
tags:   ["google"]
slug: "2009/11/15/using-gmail-notifier-with-multiple-accounts"
---
I live and die by Gmail but if you are like me, and have multiple accounts, it can be a challenge to keep track of them. Google has a nifty little <a href="http://toolbar.google.com/gmail-helper/notifier_mac.html" target="_blank">Gmail Notifier</a> that runs in your menu bar but it only works for one account. My problem is that I need to track my Appirio account, personal account (I've used Google App for my jeffdouglas.com domain for years) and then my Gmail account.

Luckily there's a way to do this by duplicating the Gmail Notifier app so that multiple copies are running. Here's the simple process for a Mac:

<ol>
 <li>Right click on the Gmail Notifier application and select "Duplicate".</li>
 <li>Right click on the new Gmail Notifier application <strong>that you just created</strong> and select "Show Package Contents".</li>
 <li>Open the Info.plist file in the Contents folder in your favorite text editor (ie TextMate)</li>
 <li>Find the property called CFBundleIdentifier and change it's string value from com.google.GmailNotifier to something like com.google.GmailNotifierPersonal.</li>
 <li>Now save the file and close your text editor.</li>
</ol>
Now when you start all of the Gmail Notifiers, your menu bar should look like:
<a href="http://res.cloudinary.com/blog-jeffdouglas-com/image/upload/v1400399460/gmailnotifier_fktb38.png"><img class="alignleft size-full wp-image-1684" title="GmailNotifier" src="http://res.cloudinary.com/blog-jeffdouglas-com/image/upload/v1400399460/gmailnotifier_fktb38.png" alt="GmailNotifier" width="544" height="155" /></a>


