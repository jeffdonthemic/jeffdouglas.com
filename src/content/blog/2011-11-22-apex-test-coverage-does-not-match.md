---
title:  Apex Test Coverage Does Not Match?
description: Writing unit test in Salesforce is, in my opinion, a black art. There are so many workarounds and techniques that it makes the process extremely frustrating. The issue below makes me enjoy the process even less based upon the amount of time/money I spent wasting on it. BTW, go vote on my idea  to make Apex testing easier. Youll thank me later. Ive seen a number of people on twitter recently comment that unit test coverage display different percentages when tests run in the browser vs. in Eclipse
pubDate: "2011-11-22 16:38:49 +0300"
heroImage: '/images/slugs/apex-test-coverage-does-not-match.jpg'
tags:   ["salesforce"]
slug: "2011/11/22/apex-test-coverage-does-not-match"
---
Writing unit test in Salesforce is, in my opinion, a "black art". There are so many workarounds and "techniques" that it makes the process extremely frustrating. The issue below makes me enjoy the process even less based upon the amount of time/money I spent wasting on it.

BTW, go <a href="http://success.salesforce.com/ideaView?c=09a30000000D9xtAAC&id=08730000000BrPiAAK" target="_blank">vote on my idea</a> to make Apex testing easier. You'll thank me later.

I've seen a number of people on twitter recently comment that unit test coverage display different percentages when tests run in the browser vs. in Eclipse with "Run All Tests". I just ran across this same issue and finally found the way to "work around" it.

I had an existing test class that I was updating and when I "Ran All Tests" from Eclipse I received a different result than when I "Ran All Tests" in my browser.

<a href="http://res.cloudinary.com/blog-jeffdouglas-com/image/upload/v1400327747/runall-1_aiegmt.png"><img src="http://res.cloudinary.com/blog-jeffdouglas-com/image/upload/v1400327747/runall-1_aiegmt.png" alt="" title="runall-1" width="550" height="115" class="aligncenter size-full wp-image-4300" /></a>

For some reason it looks like salesforce.com is caching the class and not re-running the actual test cases. When I <strong>edited the class, saved it and "Ran All Tests" again</strong> in the browser it finally displayed the same-ish results.

<a href="http://res.cloudinary.com/blog-jeffdouglas-com/image/upload/v1400327746/runall-2_narriw.png"><img src="http://res.cloudinary.com/blog-jeffdouglas-com/image/upload/v1400327746/runall-2_narriw.png" alt="" title="runall-2" width="550" height="68" class="aligncenter size-full wp-image-4302" /></a>


