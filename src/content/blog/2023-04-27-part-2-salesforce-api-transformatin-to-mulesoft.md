---
title:  Salesforce API Transformation to MuleSoft - Part 2
description: Writing the API implementation
pubDate: "2023-04-27 13:11:34 +0300"
heroImage: '/images/codelive-2.png'
tags:   ["salesforce","mulesoft"]
slug: "2023/04/27/part-2-salesforce-api-transformatin-to-mulesoft"
---

This is the second of a three part series on the [Salesforce Developers](https://www.youtube.com/@SalesforceDevs) codeLive channel where we walk through a lift and shift of functionality from Salesfore Apex to MuleSoft Anypoint Platform.

- Part #1 - [Designing the API Specification](https://www.jeffdouglas.com/part-1-salesforce-api-transformatin-to-mulesoft)
- Part #3 - [Refactoring Apex & Building Flows](https://www.jeffdouglas.com/part-3-salesforce-api-transformatin-to-mulesoft)

In this part we build the implementation of the specification we developed in the first part. We use Anypoint Studio to build the flows that connect to the SOAP and REST services and postgres database for American Airlines. We build the individual flow for each airline (getFlights, getFlightsByDestination and getFligtByCode) and then build flows for `/flights` and `/flights/{code}` that combines returns results from all three services in a single call.

### Agenda

- Develop the implementation with Anypoint Studio
- Create a new MuleSoft application
- Connect to the three airline datasources using SOAP, REST and Database connectors
- Deploy the application to Anypoint Platform

See [this repo](https://github.com/jeffdonthemic/flight-finder-salesforce) for all of the code and assets used in the applications.

<iframe src="https://www.youtube.com/embed/0durd-U827g" loading="lazy" frameborder="0" allowfullscreen=""></iframe>


## Anypoint Studio Implementation

The `flights` flow uses a Choice processor (essentially an if/then) to determine whether to return all flights or flights by destination based upon the presence of the destination varaiable. For each route we use a Scatter-Gather processor which sends a request message to multiple subflows concurrently. It collects the responses from all routes, and aggregates them into a single message.

<img src="/images/codelive-2-flights.png" alt="/flights flow">


The `flightsByCode` flow also uses a Scatter-Gather processor to send the request message to multiple subflows concurrently. It collects the responses from all routes, and aggregates them into a single message.

<img src="/images/codelive-2-flightbycode.png" alt="/flights/code flow">


Individual flows for Delta (SOAP)

<img src="/images/codelive-2-delta.png" alt="Delta flows" width="450">


Individual flows for United (REST)

<img src="/images/codelive-2-united.png" alt="United flow" width="300">


Individual flows for American (Postgres)

<img src="/images/codelive-2-american.png" alt="american flow" width="450">










