---
title:  The Anatomy of a Perfect Salesforce Developer Tool
description: I've built a lot of Salesforce developer tools over the years. Here's what I've learned about what makes them actually useful.
pubDate: "2025-01-28 10:00:00 +0300"
heroImage: '/images/perfect-developer-tool.jpg'
tags:   ["salesforce", "developer", "tools", "dx"]
slug: "2025/01/28/the-anatomy-of-a-perfect-salesforce-developer-tool"
---

I've built a lot of Salesforce developer tools over the years - from internal ones that our Falcon developers you to external ones for Salesforce developers. After shipping tools that developers actually use (and some that they definitely didn't), I've learned a few things about what separates the good ones from the junk drawer tools that nobody touches.

So what makes a Salesforce developer tool actually great? Here's what I've figured out.

## Make It Obvious

The best tools don't make you think. When I built the Force.com Utility Belt, I made sure every feature was exactly where you'd expect it to be. Need to check the API docs? There's a button right in the toolbar. Want to see your debug logs? One click gets you there.

I've seen too many tools that require you to memorize command structures or hunt through nested menus. If your tool needs a manual, you're probably doing it wrong.

## Know Your Context

Here's something I learned the hard way: Salesforce development is messy. You're jumping between orgs, dealing with different API versions, working with varying permissions. Your tool needs to handle this gracefully.

When I was working on tools for the CloudSpokes platform, we had to support hundreds of different org configurations. The tools that worked best were the ones that could figure out what kind of org they were talking to and adjust accordingly. Is this a scratch org? A production org with namespaces? A Developer Edition with limited API calls? Good tools know the difference.

## Play Nice with Others

One thing I've always tried to do is make my tools scriptable. When you're building something for developers, assume they're going to want to automate it eventually. I'm lazy and I do. 

For the TopCoder tools I built, everything had to work in CI/CD pipelines. That meant JSON output, predictable exit codes, and no random prompts asking for input. If you can't pipe your tool's output to `jq` or chain it with other commands, you're missing a huge part of the developer workflow.

## Don't Make Me Learn Your Tool

I can't tell you how many developer tools I've abandoned because they had their own special way of doing things. The best tools follow patterns that developers already know.

When I built command-line tools, I always looked at how `git` or `npm` structured their commands. Developers already know these patterns, so why fight them? Use familiar verbs, consistent flag naming, and help output that actually helps.

## Fail Gracefully

This is a big one. Salesforce development involves a lot of things that can go wrong - API limits, deployment failures, permission issues, network problems. The tools I actually trust are the ones that handle these gracefully.

Don't just throw a stack trace at me when something breaks. Tell me what went wrong, why it probably happened, and what I can do about it. Even better, handle the common failure cases automatically when possible.

## Speed Matters

I've deleted more tools because they were slow than for any other reason. When you're in the middle of a development flow, waiting 30 seconds for a tool to start up or process a simple request kills your momentum.

This is especially important with Salesforce where API calls can be expensive. Good tools cache intelligently, batch requests when possible, and only do the minimum work necessary. I always try to make the common operations fast, even if it means the edge cases take a bit longer.

## Keep It Simple

One mistake I made early on was trying to build tools that did everything. The tools that have lasted the longest are the ones that do one thing really well.

Take my [nforce-tooling](https://github.com/jeffdonthemic/nforce-tooling) plugin as an example. Instead of building another massive all-in-one Salesforce tool, I focused on one specific gap: Node.js developers needed clean access to the Tooling API. The plugin does exactly that - it adds `createContainer()`, `deployContainer()`, `executeAnonymous()`, and other Tooling API methods to the nforce library. Nothing more, nothing less.

The Force.com Utility Belt could have been a massive Swiss Army knife, but instead I focused on the daily pain points - quick access to docs, debug logs, and data export. It's been installed by thousands of developers because it solves real problems without getting in the way.

## Test With Real People

Here's something I wish I'd learned earlier: build tools with other developers, not just for them. Some of my best tools came from pairing with other developers and watching them struggle with existing solutions.

When I was building tools for the Trailhead team, I made sure to test them with actual content developers and not just the engineers. Turns out they had completely different workflows and pain points than I expected.

## Wrapping Up

The best Salesforce developer tools feel invisible. They solve problems you didn't even realize you had, work the way you expect them to work, and get out of your way so you can focus on building cool stuff.

If you're building tools for Salesforce developers, start with the problems you actually have, not the problems you think other people might have. Build something you'll use every day, and chances are other developers will find it useful too.
