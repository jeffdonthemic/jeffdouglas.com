---
title: "Designing and Implementing Skills for Agentforce Vibes"
description: "How to design and implement skills for Agentforce, from structure and best practices to real-world implementation."
pubDate: "2026-03-12"
permalink: /2026/03/12/designing-and-implementing-skills-for-agentforce-vibes/
heroImage: '/images/agentforce-skills.png'
tags: ["salesforce", "agentforce-vibes", "skills", "ai", "agents"]
slug: "2026/03/12/designing-and-implementing-skills-for-agentforce-vibes"
---

## Designing and Implementing Skills for Agentforce Vibes

Skills are a foundational capability in **Agentforce Vibes**, enabling developers to encode development knowledge into reusable, structured guidance that Vibes can apply during software development tasks.

While large language models are powerful general problem solvers, they do not automatically understand Salesforce conventions, architectural patterns, and operational standards. Skills bridge that gap by capturing expert workflows and making them available to Vibes in a consistent, repeatable form.

In the context of Salesforce development, Skills allow teams to embed best practices such as trigger frameworks, testing standards, security requirements, and deployment patterns directly into the development environment. When a Skill is activated, Vibes uses its instructions to guide reasoning and execution, helping ensure that generated code and development actions follow the expected patterns.

This guide explains how to design, structure, and maintain effective Skills for use in Agentforce Vibes. It covers naming conventions, discovery metadata, instruction design, directory structure, and progressive disclosure patterns, along with a practical checklist to help developers author high-quality Skills that Vibes can reliably apply during development workflows.

### What a Skill Is

A **Skill** is a reusable capability that teaches **Vibes** how to execute a specific development task or workflow.

Skills allow Vibes to move beyond general reasoning and perform tasks using **structured guidance encoded by developers**.

A Skill typically defines:

-   the **goal of the task**
-   the **workflow Vibes should follow**
-   important **validation checks**
-   optional **templates, examples, or documentation**

When a Skill is activated, Vibes uses its instructions to guide reasoning and execution. Skills therefore function as **codified development expertise**.

For example, without a Skill, Vibes might generate Salesforce Apex tests that:

-   miss bulk test cases
-   omit negative testing
-   include `SeeAllData=true`
-   lack meaningful assertions

A Skill can encode best practices such as:

-   bulk-safe testing
-   use of `Test.startTest()` and `Test.stopTest()`
-   proper test data generation
-   meaningful assertions

In practice, Skills allow Vibes to **consistently follow Salesforce development standards**.

## Skill Architecture in Agentforce Vibes

Skills in Agentforce Vibes follow a **progressive loading model** so that Vibes only loads the information required for the current task. This enables developers to maintain **large skill libraries without increasing prompt size**.

Every skill lives in a folder with a required `SKILL.md` at the root. The folder name matches the name of the skill, e.g., `generating-apex-test-classes`.

### Skill Discovery

When Vibes starts, it loads **only metadata** from each available Skill. This metadata should be roughly ~100 words and include:

1.  name
2.  description

Example:

```
name: generating-apex-test-classes

description: Generate bulk-safe Apex test classes with proper test data setup and meaningful assertions.
```

Vibes uses this metadata to determine whether a Skill should be activated during reasoning. At this stage:

-   full instructions are **not loaded**
-   supporting assets are **not loaded**

This keeps the working context small and efficient.

### Skill Activation

When Vibes determines that a Skill is relevant to a task, the Skill is activated and the full Skill content (ideally under 500 lines) becomes available. This may include:

-   workflow instructions
-   validation rules
-   examples
-   templates
-   documentation

Only active Skills are included in the prompt context. This approach allows Vibes to support **dozens or hundreds of Skills without degrading performance**.

## Skill Naming Conventions

Skills represent **actions Vibes performs**, so the name should clearly express that action. Skill names should use **gerund form (verbs ending in "-ing").** Gerund-based names create a clear and readable skill library. Each entry reads as a capability Vibes can execute.

**Examples**

-   generating-apex-test-classes
-   refactoring-triggers-to-handler-pattern
-   reviewing-permission-sets
-   optimizing-soql-queries
-   deploying-salesforce-metadata
-   creating-lwc-components

Each entry reads as a capability Vibes can execute.

## Skill Descriptions for Discovery

Descriptions determine whether Vibes **selects the Skill during reasoning**. Descriptions function as **searchable capability metadata**.

This is arguably the most critical piece. The description determines whether Vibes actually invokes your skill.

When Vibes analyzes a user request, it compares the request against Skill descriptions to determine which Skills are relevant. Poor descriptions reduce the likelihood that a Skill will be used. Descriptions should be concise but information-rich.

Instead of "Generates Apex trigger framework code," something like "Generates Apex trigger handler classes using the trigger-actions-framework pattern. Use this skill whenever the user mentions triggers, trigger handlers, TriggerAction interface, trigger-actions-framework, or asks about automating DML events on any Salesforce object."

### Effective Skill Description Characteristics

The guidance is to make descriptions slightly "pushy": include not just what the skill does, but specific contexts and trigger phrases. A good description explains:

-   the **problem the Skill solves**
-   the **development context**
-   the **expected outcome**

### Good Example

> Generates Apex trigger handler classes using the trigger-actions-framework pattern. Use this skill whenever the user mentions triggers, trigger handlers, TriggerAction interface, trigger-actions-framework, or asks about automating DML events on any Salesforce object.

Why this works:

-   includes domain keywords
-   defines the output
-   specifies quality expectations

### Weak Example

> Helps with Apex tests.

### Description Writing Tips

Include relevant development keywords such as:

- Apex
- Lightning Web Components
- SOQL
- Permission Sets
- Salesforce Metadata
- Unit Tests

Mention expected artifacts:

- test classes
- metadata deployments
- security reviews
- performance analysis

Describe **results**, not intentions.

**Bad:**

> Assists with debugging.

**Better:**

> Analyze Salesforce debug logs to identify exceptions, governor limit violations, and inefficient SOQL queries.

## Designing Skills Around Real Developer Workflows

The most effective Skills reflect **real development workflows**. Skills should capture the instructions that developers repeatedly give Vibes.

Recommended process:

1.  Use Vibes to perform a development task
2.  Observe where corrections are needed
3.  Identify repeated guidance
4.  Encode those instructions into a Skill

Over time this converts developer expertise into **reusable automation capabilities**.

### Example: Apex Test Generation Skill

During repeated interactions developers might instruct Vibes:

-   ensure coverage above 90%
-   include negative test cases
-   avoid `SeeAllData=true`
-   test bulk operations

If these instructions appear repeatedly, they should be encoded into a Skill. This ensures that every future test generation task automatically follows the same standards.

## Core Skill Components

Skills in Agentforce Vibes generally contain three major components.

### Metadata

Metadata enables Skill discovery.

Example:

```
name: generating-apex-test-classes

description: Generate production-ready Apex test classes with bulk-safe coverage and proper test data setup.
```

Metadata should be concise and should **not contain operational instructions**.

### Instructions

Instructions define the operational logic of the Skill. Typical sections include:

- Goal
- Workflow
- Validation
- Output

### Goal

Defines the purpose of the Skill.

Example:

Generate an Apex test class that validates business logic and ensures robust test coverage.

### Workflow

Defines the process Vibes should follow.

Example:

1. Identify the Apex class being tested
2. Determine required test data
3. Generate test records
4. Execute the methods under test
5. Assert expected outcomes

### Validation

Validation ensures generated outputs follow best practices.

Examples:

- Ensure no SeeAllData usage
- Ensure bulk-safe execution
- Ensure meaningful assertions
- Ensure test coverage targets are met

### Output

Defines the final artifact.

Example:

Return a complete Apex test class including setup methods, test cases, and assertions.

### Reference Assets (Optional)

Some Skills include supporting materials such as:

- templates/
- examples/
- docs/

Example assets:

- templates/apex-test-template.cls
- examples/sample-test-class.cls
- docs/testing-guidelines.md

These materials help Vibes follow consistent patterns.

## Progressive Disclosure in Skill Design

Skills follow **progressive disclosure**, where information is revealed only when needed. This prevents the model from being overloaded with unnecessary information.

### Layer 1 --- Metadata

Initially Vibes sees only:

1.  name
2.  description

This allows Vibes to determine whether the Skill should activate.

### Layer 2 --- Core Instructions

When activated, Vibes loads the primary instructions:

-   goal
-   workflow
-   validation rules

### Layer 3 --- Supporting Assets

If needed, Vibes may reference:

- docs/
- examples/
- templates/

This layered structure keeps prompts efficient while still allowing deep guidance when necessary.

## Directory Structure in Agentforce Vibes

Skills should use a **simple, predictable directory structure**. Skill directories should remain **one level deep**.

Example:

```
skills/
  generating-apex-test-classes/
      SKILL.md
      templates/
      examples/
      docs/
```

Expanded example:

```
generating-apex-test-classes/
  SKILL.md
  templates/
      apex-test-template.cls
  examples/
      sample-test.cls
  docs/
      testing-guidelines.md
```

### Why This Matters

This structure ensures:

-   predictable skill discovery
-   consistent asset loading
-   easier maintenance

Avoid deeply nested directory structures.

**Bad:**

```
skills/
  testing/
    apex/
      generation/
        templates/
```

**Good:**

```
skills/
  generating-apex-test-classes/
```

Each Skill should represent a **self-contained capability**.

## Iterating and Improving Skills

Skills should evolve through real-world usage.

Recommended iteration loop:

1.  Use the Skill in development workflows
2.  Observe failures or inconsistencies
3.  Identify missing guidance
4.  Update the Skill
5.  Repeat

Questions to ask:

-   What confused Vibes?
-   What validation rule was missing?
-   What workflow step should be clarified?

Over time, the Skill becomes a **stable encoded development practice**.

A well-designed Skill acts as an **encoded expert workflow** that allows **Vibes** to consistently execute complex Salesforce development tasks with minimal prompting.
