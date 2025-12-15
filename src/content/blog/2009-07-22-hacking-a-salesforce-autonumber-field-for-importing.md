---
title:  Hacking a Salesforce.com Autonumber Field for Importing
description: Joe Krutulis here at Appirio revealed this little gem to me today and I thought it an extremely creative work around for Salesforce.com. The use case is that you have a custom object that contains an autonumber field. Towards the end of your project, the customer informs you that they want to load legacy data and set the autonumber with their historical value from their external system. The solution would typically be to change the field from an autonumber to a text field, load the records into 
pubDate: "2009-07-22 16:00:00 +0300"
heroImage: '/images/slugs/hacking-a-salesforce-autonumber-field-for-importing.jpg'
tags:   ["salesforce", "apex"]
slug: "2009/07/22/hacking-a-salesforce-autonumber-field-for-importing"
---
<a href="http://www.facebook.com/joe.krutulis" target="_blank">Joe Krutulis</a> here at <a href="http://www.appirio.com" target="_blank">Appirio</a> revealed this little gem to me today and I thought it an extremely creative work around for Salesforce.com.

The use case is that you have a custom object that contains an autonumber field. Towards the end of your project, the customer informs you that they want to load legacy data and set the autonumber with their historical value from their external system. The solution would typically be to change the field from an autonumber to a text field, load the records into Salesforce.com and then change the field back to an autonumber.

The problem is that if your Apex code references this field, Force.com is not going to allow you to change the field type. The solution is to fool the compiler by using the sObject get/put methods instead referencing the field explicitedly in your Apex code. This way Force.com will allow you to change the type of the field to a text field, import your data with the correct sequence and then change the field back to an autonumber.

<strong>Current code</strong>

```plaintext
myObj.name = 'My Object Name';
```
<strong>New "Compiler-fooling" code</strong>

```plaintext
SObject myObj = new MyObject();
myObj.put('name','My Object Name');
```

