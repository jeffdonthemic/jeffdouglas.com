---
title:  Using Exernal ID Fields in Salesforce
description: Salesforce has baked in some magical features into its platform. Two of my favorites are the upsert command and the use of External IDs. If you are new to the platform, youve probably seen the option of making a field an External ID during the new field creation process. The External ID field allows you to store unique record IDs from an external system, typically for integration purposes. So if you have a bespoke marketing system running on SQL Server, it is may be easier to load, update and re
pubDate: "2010-05-07 11:35:42 +0300"
heroImage: '/images/slugs/using-exernal-id-fields-in-salesforce.jpg'
tags:   ["salesforce"]
slug: "2010/05/07/using-exernal-id-fields-in-salesforce"
---
Salesforce has baked in some "magical" features into its platform. Two of my favorites are the upsert command and the use of External IDs. If you are new to the platform, you've probably seen the option of making a field an "External ID" during the new field creation process.

<img src="/images/1-tiabpsoxwztqfbzuehc0-1.png" alt="" >

The External ID field allows you to store unique record IDs from an external system, typically for integration purposes. So if you have a bespoke marketing system running on SQL Server, it is may be easier to load, update and reference these external records in Salesforce using unique IDs from SQL Server.

Salesforce allows you mark up to 3 fields as External IDs and these fields must be text, number or email field types. Values in these External ID field must also be unique and you can also determine whether or not value are case sensitive.There are three ways that you typically use External ID field.

<strong>Loading Data from External Systems</strong>

When you load data from external systems you may want to track the record from the external system for reference or if you want to make updates back into the external system. Simply mark a field as an External ID and the Force.com platform will ensure that each value is unique and that you don't load duplicate records from the external system.

<strong>Making Fields Searchable</strong>

When searching for custom object records from the sidebar the following fields are searchable:

<ul><li>Name</li><li>All custom auto number fields</li></ul>You can make fields searchable by marking them as an External ID. Some people "cheat" and mark fields that do not necessarily contain external record IDs so that they are searchable.For the advanced search, the following fields are searchable:
<ul><li>All custom fields of type text</li><li>Text area</li><li>Long text area</li><li>Email</li><li>Phone</li></ul>So if you have a numeric field that is an External ID it will not be searchable via the advanced search. You could create a <em>text</em> External ID field and then write a workflow that updates this field from the numeric External ID field. This way your external ID is searchable.
<strong>Data Integration</strong>

This is were the External ID field really earns its keep. When using the <code>upsert</code> command during data loading, you can reference the External ID field instead of the Salesforce ID. This is a huge advantage because you typically don't want to maintain the Salesforce ID in your external system. When uploading data with the Import Wizard, Data Loader or (most) ETL tools like Boomi or Informatica, there is a setting to specify that a field is an External ID.

<strong>Salesforce Import Wizard</strong>

<img src="/images/2-fkcrf6z0gsmbm6izox1s.png" alt="" >

<strong>Data Loader</strong>

<img src="/images/3-jiazgjvfwt1poeo0q09r.png" alt="" >

<strong>Boomi</strong>

<img src="/images/4-ocqon8hz160qjzhdq4tr.png" alt="" >

If you are loading data from an external system, External IDs will definitely become your best friends.


