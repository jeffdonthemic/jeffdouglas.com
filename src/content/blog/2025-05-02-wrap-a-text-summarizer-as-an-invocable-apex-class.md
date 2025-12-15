---
title: "Wrap a Text Summarizer as an Invocable Apex Class"
description: "How to wrap OpenAI's text summarization in an invocable Apex class so you can call it from Flows, Process Builder, or other Apex code - making AI part of your platform instead of an external tool."
pubDate: "2025-05-02"
heroImage: "/images/text-summarizer-apex.jpg"
tags: ["salesforce", "apex", "ai", "flow", "invocable"]
slug: "2025/05/02/wrap-a-text-summarizer-as-an-invocable-apex-class"
--- 

I've been playing around with AI integration in Salesforce lately, and one pattern that's really clicked for me is wrapping AI services as invocable Apex classes. It's a clean way to make AI features available throughout your org without having to build custom UIs or force users to learn new tools.

What's greate about this approach is that once you wrap an AI service as an invocable method, you can call it from Flows, Process Builder, or just plain 'ole Apex. It becomes part of your platform instead of some external thing.

## The Problem

Here's a real scenario: customer service reps writing these incredibly detailed case descriptions - which is great for context, but terrible for managers who just want to scan and understand what's going on. 

Instead of asking the reps to write shorter descriptions (good luck with that), you can auto-generate summaries and store them in a custom field. That way, the detailed info is still there, but there's also a clean summary for quick reference.

## Building the Apex Class

The implementation is pretty straightforward. We're going to use `HttpRequest` to call OpenAI's Chat Completions API and wrap it in an invocable method.

```apex
public with sharing class TextSummarizerService {

    public class Request {
        @InvocableVariable(required=true)
        public String inputText;
    }

    public class Response {
        @InvocableVariable
        public String summary;
    }

    @InvocableMethod(label='Summarize Text' description='Summarizes input text using OpenAI')
    public static List<Response> summarize(List<Request> requests) {
        List<Response> responses = new List<Response>();

        for (Request r : requests) {
            Response resp = new Response();
            try {
                resp.summary = callOpenAI(r.inputText);
            } catch (Exception e) {
                resp.summary = 'Error generating summary: ' + e.getMessage();
                System.debug('Summarization error: ' + e.getMessage());
            }
            responses.add(resp);
        }

        return responses;
    }

    private static String callOpenAI(String inputText) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();

        req.setEndpoint('callout:OpenAI_API/v1/chat/completions');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer ' + System.Label.OpenAI_API_Key);

        String body = JSON.serialize(new Map<String, Object>{
            'model' => 'gpt-4o',
            'messages' => new List<Map<String, String>>{
                new Map<String, String>{
                    'role' => 'user',
                    'content' => 'Summarize the following:\n\n' + inputText
                }
            },
            'temperature' => 0.5
        });

        req.setBody(body);
        HttpResponse res = http.send(req);

        if (res.getStatusCode() != 200) {
            throw new CalloutException('OpenAI call failed: ' + res.getBody());
        }

        Map<String, Object> json = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        
        // Safely parse the OpenAI response
        List<Object> choices = (List<Object>) json.get('choices');
        if (choices == null || choices.isEmpty()) {
            throw new CalloutException('No choices returned from OpenAI');
        }
        
        Map<String, Object> choice = (Map<String, Object>) choices[0];
        Map<String, Object> message = (Map<String, Object>) choice.get('message');
        
        if (message == null) {
            throw new CalloutException('No message in OpenAI response');
        }
        
        String content = (String) message.get('content');
        return content != null ? content.trim() : 'No summary generated';
    }
}
```

## Setting Up the Named Credential

You'll need to create a Named Credential to handle the OpenAI API authentication. This is way cleaner than hardcoding API keys (please don't do that).

- **Label**: `OpenAI_API`
- **URL**: `https://api.openai.com`
- **Authentication**: Set up the Bearer token using a Custom Label for the API key

You'll also need to:
1. Create a Custom Label called `OpenAI_API_Key` with your actual API key
2. Add `https://api.openai.com` to Remote Site Settings  
3. Make sure to authorize the Named Credential for outbound callouts in your org

## Using It in a Flow

Now for the fun part - since this is an invocable method, you can drop it right into a Flow as an Apex Action. Here's how I set it up:

- **Input**: Pass in the `Case.Description` field
- **Output**: Save the summary to a custom `Summary__c` field
- **Trigger**: Fire this when a case is created, or run it as a scheduled batch for existing cases

The beauty is that your service reps don't have to change anything about their workflow. They keep writing detailed descriptions, and the summary just magically appears.

## Testing It

Here's a basic test class to get you started:

```apex
@isTest
private class TextSummarizerServiceTest {
    
    // Mock class for HTTP callouts
    private class MockHttpResponseGenerator implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"choices":[{"message":{"content":"This is a test summary of the customer issue."}}]}');
            res.setStatusCode(200);
            return res;
        }
    }
    
    @isTest static void testSummarySuccess() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        Test.startTest();

        TextSummarizerService.Request req = new TextSummarizerService.Request();
        req.inputText = 'Customer reported issues logging into the platform, reset password, still failed...';

        List<TextSummarizerService.Response> result = TextSummarizerService.summarize(new List<TextSummarizerService.Request>{ req });

        System.assertNotEquals(null, result[0].summary);
        System.assert(result[0].summary.contains('test summary'));
        Test.stopTest();
    }
    
    @isTest static void testSummaryError() {
        // Don't set mock to simulate HTTP failure
        Test.startTest();

        TextSummarizerService.Request req = new TextSummarizerService.Request();
        req.inputText = 'Test input';

        List<TextSummarizerService.Response> result = TextSummarizerService.summarize(new List<TextSummarizerService.Request>{ req });

        System.assert(result[0].summary.startsWith('Error generating summary'));
        Test.stopTest();
    }
}
```

## Why This Pattern Works

What I love about this approach is how it fits into the Salesforce ecosystem:

- **Reusable**: Once it's built, you can use it anywhere - Flows, Process Builder, other Apex classes
- **Governed**: You get all the standard Salesforce security and limits built-in
- **Maintainable**: All your prompt logic is in one place, not scattered across different tools
- **Secure**: Everything goes through your org's security model instead of giving users direct access to external AI tools

## Taking It Further

This is just the starting point. You could extend this with:

- **Prompt templates** stored in Custom Metadata so you can tweak the summarization logic without code changes
- **Field mapping configuration** to handle different objects automatically
- **Usage logging** to track API calls and costs
- **Bulk processing** for handling large datasets efficiently

The pattern scales really well once you get the basics down. The approach could be used for sentiment analysis, content generation, and even code review automation.

The key is starting simple and building up from there. Get the basic integration working first, then add the fancy features once you understand how your users actually interact with it.
