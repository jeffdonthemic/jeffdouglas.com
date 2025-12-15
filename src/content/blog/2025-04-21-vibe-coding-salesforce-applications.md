---
title: "Vibe Coding Salesforce Applications"
description: "Experimenting with vibe coding to build a complete Salesforce purchasing application using just high-level prompts and AI collaboration - from data models to Lightning Web Components."
pubDate: "2025-04-21"
permalink: /2025/04/21/vibe-coding-salesforce-applications/
heroImage: '/images/vibe-coding-salesforce.jpg'
tags: ["salesforce", "development", "coding", "productivity"]
slug: "2025/04/21/vibe-coding-salesforce-applications"
---

Have you heard of vibe coding? It's this interesting development approach where you basically give AI the general idea of what you want and let it figure out the details. Instead of meticulously planning every detail upfront, you give an AI assistant a general direction and let it figure out the implementation details. It's like having a really smart developer pair who can read your mind and build what you're thinking about.

We've been talking about vibe coding a lot at Salesforce lately, and I decided to try it out for some real-ish development work. The results have been pretty interesting. Let me walk you through what happened when I used it to build purchasing application for a baking company demo.

## What is Vibe Coding?

Vibe coding is essentially collaborative development with AI where you describe what you want at a high level, and the AI fills in the technical details. Instead of writing detailed specifications or wireframes, you just explain the business need and let the AI research the domain, design the data model, and implement the functionality.

The term comes from the idea that you're giving the AI the "vibe" of what you want rather than explicit instructions. You might say something like "build me a customer onboarding flow that feels modern and reduces friction" instead of "create a 5-step wizard with these specific fields and validation rules."

### How It's Different

Traditional development follows a more structured approach:
1. **Requirements gathering** - Document exactly what needs to be built
2. **Design phase** - Create detailed specs, wireframes, data models
3. **Implementation** - Write code to match the specifications
4. **Testing** - Verify the implementation matches requirements

Vibe coding flips this on its head:
1. **Context setting** - Give the AI background about your domain and goals
2. **Exploration** - Let the AI research and propose solutions
3. **Iteration** - Guide and refine as the AI builds
4. **Validation** - Test that the result solves the actual business problem

### The Magic Happens in the Conversation

What makes vibe coding powerful is the iterative conversation with AI. You might start with "I need a way to track inventory for a restaurant" and the AI might come back with questions like:

- "Should this handle perishables differently than dry goods?"
- "Do you need lot tracking for food safety compliance?"
- "How do you want to handle recipe costing and ingredient substitutions?"

The AI is essentially acting as a business analyst, solution architect, and developer all rolled into one. It's researching the domain, identifying edge cases you might not have considered, and proposing implementation approaches.

### When It Works Best

Vibe coding shines when:
- **You're exploring new domains** where you don't know all the requirements upfront
- **The AI has rich context** about your existing systems and patterns
- **You need rapid prototyping** to validate concepts quickly
- **The problem is well-understood** in the broader software community (like purchasing, inventory, CRM workflows)

As of now, it's less effective when you need precise control over implementation details, have strict compliance requirements, or are working in highly specialized domains where the AI lacks training data.

### The Trust Factor

The biggest mental shift with vibe coding is learning to trust the AI's domain research and implementation decisions. When I told Cursor to build a purchasing system for a baking company, I had to resist the urge to micromanage every field and relationship. Instead, I let it research industry best practices and make informed decisions about data models and workflows.

This requires a different kind of technical leadership. Instead of being the architect who designs every detail, you become more of a product owner who validates that the AI's decisions align with business goals.

## Vibe Coding with Salesforce and Cursor

Salesforce development is actually perfect for vibe coding because:

1. **Rich metadata context** - The AI can see your entire org structure, existing objects, fields, and relationships
2. **Established patterns** - Salesforce has well-known patterns for triggers, handlers, and Lightning components
3. **Built-in constraints** - Governor limits and platform restrictions naturally guide implementation decisions
4. **Domain knowledge** - Most business processes map well to Salesforce's CRM-centric data model

When you're working in Cursor (or similar AI-powered IDEs) with access to your Salesforce metadata, the AI understands your org's context and can make smart decisions about how new functionality should integrate with existing systems.

## The Demo: Building a Purchasing Application

I was putting together a demo for a baking company and realized I needed a purchasing workflow to make the scenario more realistic. Instead of spending hours designing schemas and workflows, I decided to try vibe coding the entire application.

I initially started with Windsurf, but since I have much more experience with Cursor, I switched to that instead. For the LLM, I used Claude 4.0 Sonnet, which has been my go-to for Salesforce development work lately.

### The Prompt

My instruction to Cursor was basically: "Research purchasing processes for baking companies and create a purchasing application for this org."

That's it. No detailed requirements, no ERDs, no user stories. Just the business context and the goal.

### What Cursor Vibe'd

Having access to all my org's metadata, Cursor understood the existing data model and created a purchasing system that integrated naturally with the Account object and followed our org's naming conventions.

It designed two main objects (with some of the major fields):

**Purchase_Order__c** with fields for:
- Account (Master-Detail relationship)
- Cancellation Reason
- Expected Date
- Line Items (Roll-Up Summary COUNT)
- Line Items Total (Roll-Up Summary SUM)
- Shipping Fee
- Total (Formula field)
- Status (Picklist)

**Purchase_Order_Line_Item__c** with fields for:
- Product
- Order Quantity
- Received Quantity
- UOM (Unit of Measure)
- Subtotal

### The Automation Logic

Cursor also generated the trigger framework:
- `PurchaseOrderTrigger` and `PurchaseOrderTriggerHandler`
- `PurchaseOrderLineItemTrigger` and `PurchaseOrderLineItemTriggerHandler`

The clever part is how it handles status transitions. The line item trigger monitors received quantities and automatically updates the purchase order status based on fulfillment progress.

## The Purchase Order Lifecycle

Here's how a purchase order conceptually flows through the system, based on typical purchasing workflows:

**Draft** → The initial state when a purchase order is created. Users can modify quantities, add/remove line items, and update details. No commitments have been made to vendors.

**Submitted** → The purchase order has been finalized internally and is ready for approval. Line items are locked, but the order hasn't been sent to the vendor yet.

**Approved** → Management has signed off on the purchase. The order is authorized to be sent to the vendor.

**Ordered** → The purchase order has been transmitted to the vendor and they've acknowledged receipt. This represents a binding commitment from both parties.

**Partially Received** → Some line items have been received, but others are still pending. This status is automatically triggered when line item received quantities are updated but don't match the ordered quantities.

**Received** → All line items have been fully received. The purchase order is complete from a receiving perspective.

**Cancelled** → The order was terminated before completion. The cancellation reason field captures why the order was stopped.

The beauty of this flow is that status transitions happen automatically based on line item activity. When warehouse staff update received quantities on line items, the system evaluates total fulfillment and updates the parent purchase order status accordingly.

## The Iterative Conversation

What made this vibe coding experience interesting was how Cursor didn't just build what I asked for and call it done. It started asking really thoughtful questions about edge cases and business processes:

- How did I want to handle cancelled purchase orders? Should they still show line items or clear them out?
- What kind of approval processes did I need? Single approver or multi-level approval chains?
- How should user permissions work during different stages of the purchase order lifecycle?
- What happens when you partially receive items on a PO? Should it auto-update status or require manual confirmation?

These weren't random questions but the kinds of things an experienced business analyst would ask when trying to understand requirements. The AI was essentially doing discovery work, identifying scenarios I hadn't thought through.

## Real-World Validation

The conversation got even more interesting when I started validating Cursor's assumptions with actual domain knowledge. My brother-in-law works as a sales rep at a baking supply company, so I asked him how their purchasing process actually works in practice.

Turns out, the initial approach was too simplistic. Baking companies don't typically purchase by simple quantity but by unit of measure (UOM) independent of package count. The reason is that different suppliers have different package sizes for the same product. You might get flour in 40 lb bags from one vendor and 65 lb bags from another.

So instead of ordering "20 bags of flour," they order "1000 lbs of flour." The system then needs to calculate how many packages that translates to based on the specific vendor and their unit packaging. This is a much more complex data model than the straightforward quantity-based approach Cursor initially proposed.

When I brought this feedback back to Cursor, it immediately understood the nuance and started redesigning the line item structure to handle:
- Base quantities in the desired UOM (pounds, ounces, etc.)
- Vendor-specific package sizes for conversion calculations  
- Separate tracking for ordered UOM vs. package quantities
- Similar logic for received quantities to handle partial shipments

This back-and-forth perfectly illustrated both the power and the limitation of vibe coding. The AI can research general industry practices and build sophisticated data models, but it takes real domain expertise to catch the subtle details that make the difference between a demo app and a production-ready system.

## Vibe Coding the Input Interface

After getting the data model sorted out, I decided to push the vibe coding experiment further and ask Cursor to build a Lightning Web Component for purchase order line item entry. I figured this would be a good test of whether the approach could handle both backend logic and frontend user experience.

My prompt was something like: "Create a Lightning Web Component modal for entering purchase order line items with a product search and running totals."

What impressed me was that Cursor didn't just create the LWC, it built the complete stack. It generated:
- The Lightning Web Component with proper HTML structure and styling
- JavaScript controller logic for handling user interactions
- An Apex controller class to provide backend functionality
- Proper integration with the Purchase Order data model we'd already built

The initial design was actually pretty solid. It included a product search box that would filter as you typed, input fields for quantities and UOM, and a running total that updated based on user input. The UI followed Lightning Design System patterns and felt native to the Salesforce experience.

![Add Purchase Order Line Items Interface](/images/lwc-add-items.png)

But here's where the iterative conversation really paid off. Through several rounds of feedback, we refined the component:
- Added validation to prevent duplicate products on the same order
- Improved the search functionality to handle partial product names and SKUs  
- Added better error handling and user feedback messages
- Included logic to handle the UOM conversion calculations we'd discussed earlier
- Made the modal responsive and accessible

By the end of our conversation, we had a fully functioning LWC modal that could be dropped into any Purchase Order record page. The component handled product selection, quantity calculations, real-time totals, and proper integration with the backend triggers and handlers.

What struck me was how Cursor maintained context throughout the entire conversation. It remembered the data model decisions we'd made earlier, understood the business requirements from our baking company discussion, and applied those constraints to the UI design. The final component actually reflected the domain-specific requirements we'd discovered.

## Building the Receiving Interface

With the purchase order creation working smoothly, we moved the conversation to the other side of the workflow: receiving inventory. This is where the real complexity of the purchasing process becomes apparent. You rarely receive exactly what you ordered, when you ordered it.

Through several conversations with Cursor, we identified that we needed another Lightning Web Component to handle the various receiving scenarios:
- Receiving all items on a purchase order at once
- Receiving partial quantities of specific line items
- Receiving some line items while leaving others pending

Once again, Cursor built the complete stack including all the supporting Apex controllers and backend logic. But what surprised me was how much "bling" it added that I didn't even ask for. The component came with features I hadn't thought to request: filter by product name, filter by status, and pagination for handling large purchase orders.

![Add Purchase Order Line Items Interface](/images/lwc-receive-items.png)

But the real insight came when Cursor informed me about industry best practices. It explained that receiving inventory by package quantity is much more practical than receiving by total quantity. It's way easier for a warehouse worker to count "5 bags" than to verify "200 lbs", especially when you're dealing with heavy items like flour or sugar.

So for each line item, the interface provided functionality to receive the number of packages individually. You could receive the entire line item quantity or just a partial amount, package by package. The UI made this intuitive by showing both the package count and the equivalent weight, so workers could think in terms of physical units while the system tracked the total quantities.

Cursor even went a step further and color-coded the line items based on their status:
- Green for fully received items
- Gold for partially received items  
- Gray for cancelled items

The component also included an "override" button based on our conversation about real-world scenarios. Sometimes you receive 5 packages but one is damaged and you can only salvage a portion of it. This is particularly relevant with large bags of flour where a small tear might make some product unusable. The override feature let warehouse staff enter custom quantities when the standard package-based receiving didn't match reality.

The one area where Cursor did struggle initially was with the CSS styling. The columns were slightly off and misaligned, which made the interface look unprofessional. Instead of trying to describe the layout issues in text (which I did initially), I took a few screenshots of what I was seeing and shared them directly with Cursor.

This is where the visual analysis capabilities really shone. Cursor immediately understood what was wrong from the images! It could see that the product name column was too narrow, the quantity fields weren't properly aligned, and the status indicators were overlapping with the text. Within minutes, it had generated updated CSS that fixed all the alignment issues after a couple of tries.

The fact that I could just show Cursor "this is what's broken" instead of trying to articulate layout problems in words was a game-changer. It's so much faster than the traditional back-and-forth of "move this 10 pixels left, no that's too much, try 7 pixels" that usually happens with UI refinements.

## What Didn't Work So Well

Let's be honest... AI isn't perfect, and I expected some bumps along the way. I'd actually be shocked if there weren't any issues with an approach this experimental. But all in all, Cursor did a pretty impressive job for what was essentially a conversational approach to building a complete application.

That said, there were definitely some areas for improvement:

**Going with the (wrong) Flow**

Vibe coding is all about going with the flow of where the AI takes you. However, sometimes the AI takes you entirely down the wrong path. Your application may be coming along quite nicely and all of a sudden, for one reason or another, the AI makes a mess of things. Make sure you create a new branch when vibe coding. This way you can track progress along the way with commits or even throw away the branch if you need to. 

**Hallucination Issues**

I had to create some guardrails to prevent Cursor from hallucinating about what existed in my org. It would sometimes insist that a field existed even after I explicitly told it I had declined to add that field. I ended up creating Cursor rules that instructed it to always verify objects and fields from the local file system rather than making assumptions about what was available.

**Metadata File Generation Problems**

Cursor had consistent problems creating the XML metadata files for objects and classes. It would often try to deploy code without generating the necessary `.object-meta.xml` or `.cls-meta.xml` files, which would cause deployments to fail. I had to add specific instructions to my Cursor rules to always generate these metadata files alongside the actual code.

**Security and Permissions**

I had to manually set up security and field-level security (FLS) for most of the objects and classes that were created. Cursor didn't automatically handle permission sets or profile configurations. In retrospect, I probably could have asked Cursor to create these permissions as well, but by the time I realized the gap, I'd already made the changes manually.

**Unit Test Challenges**

As the code base became larger, Cursor would sometimes have problems writing unit tests. For instance, for the Purchasing app I had a number of classes with their own tests. Once I had a couple of test classes complete I would have the following problem: Cursor would write a test class and say, "OH! I see the implementation is not correct. Let me make some changes." These changes would then, of course, break tests in other classes that it had just completed successfully. So, I created a test suite of all related classes and after each modification, I told Cursor to run the test suite, and if anything broke, then revert the code and explain why it was failing and steps to fix.

I also ran into some issues with unit test generation, though this wasn't entirely Cursor's fault. I initially used Claude 4.0 Sonnet, but had to switch to Gemini because Claude was having problems properly handling triggers and preventing recursive updates in the test scenarios. The trigger logic for updating purchase order statuses based on line item changes was complex enough that it required more sophisticated test data setup than Claude could generate consistently.

---

The whole experience got me thinking about how AI-assisted development might change the way we build Salesforce applications. When the AI understands your org's context and can research domain-specific requirements, it can move incredibly fast from concept to working application.

There's definitely still a place for traditional detailed planning, especially for complex integrations or mission-critical systems. But for getting functional prototypes built quickly, or when you're exploring what's possible in a new domain, vibe coding might be the way to go. 
