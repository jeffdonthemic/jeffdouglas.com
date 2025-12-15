---
title:  Building an AI-Powered Apex CLI with OpenAI
description: I built a simple CLI tool that uses OpenAI to generate and explain Salesforce Apex code. Here's how it works and why I'm excited about it.
pubDate: "2024-12-03 10:00:00 +0300"
permalink: /2024/03/12/ai-apex-cli/
heroImage: '/images/ai-apex-cli.jpg'
tags:   ["salesforce", "apex", "ai", "cli", "automation", "openai"]
slug: "2024/12/03/ai-apex-cli"
---

I've been playing around with OpenAI's API lately and got to thinking about how much time we spend writing boilerplate Apex code. Triggers, batch classes, SOQL queries, test methods - you know the drill. What if we could just describe what we want in plain English and get working code back?

So I built a simple CLI tool called **AI Apex Snippets** that does exactly that. It's nothing fancy, but it's been pretty handy for knocking out quick prototypes and explaining existing code.

## What It Does

The tool has three basic commands:

- **`generate`**: Tell it what you want in plain English, get Apex code back
- **`explain`**: Paste in some Apex code, get a plain English explanation  
- **`test`**: Check if your OpenAI API key is working

## How I Built It

Here's the basic setup using Node.js:

```javascript
#!/usr/bin/env node
// ai-apex-snippets-cli/index.js

const { Command } = require('commander');
const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
require('dotenv').config();

const program = new Command();
const spinner = ora();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const generatePrompt = (input) => `Generate a Salesforce Apex code snippet for: ${input}`;
const explainPrompt = (code) => `Explain what this Apex code does:

${code}`;

async function callOpenAI(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].message.content.trim();
}
```

The CLI commands are pretty straightforward. I used Commander.js to handle the argument parsing:

```javascript
program
  .name('ai-apex')
  .description('CLI to generate or explain Apex code using OpenAI')
  .version('0.1.0');

program
  .command('generate')
  .description('Generate Apex code from natural language')
  .argument('<prompt>', 'natural language prompt')
  .action(async (prompt) => {
    spinner.start('Generating Apex code...');
    try {
      const result = await callOpenAI(generatePrompt(prompt));
      spinner.stop();
      console.log(chalk.green('\nGenerated Apex Code:\n'));
      console.log(result);
    } catch (err) {
      spinner.fail('Error generating code');
      console.error(err.message);
    }
  });

program
  .command('explain')
  .description('Explain given Apex code')
  .argument('<code>', 'Apex code block')
  .action(async (code) => {
    spinner.start('Analyzing Apex code...');
    try {
      const result = await callOpenAI(explainPrompt(code));
      spinner.stop();
      console.log(chalk.cyan('\nExplanation:\n'));
      console.log(result);
    } catch (err) {
      spinner.fail('Error explaining code');
      console.error(err.message);
    }
  });

program
  .command('test')
  .description('Test connectivity to OpenAI API')
  .action(async () => {
    spinner.start('Testing OpenAI API connectivity...');
    try {
      const response = await axios.get(
        'https://api.openai.com/v1/models',
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      spinner.stop();
      console.log(chalk.green('\n✅ OpenAI API connection successful!\n'));
      console.log(chalk.cyan('Available models:'));
      response.data.data.forEach(model => {
        console.log(chalk.white(`  - ${model.id}`));
      });
    } catch (err) {
      spinner.fail('❌ OpenAI API connection failed');
      if (err.response) {
        console.error(chalk.red(`Status: ${err.response.status}`));
        console.error(chalk.red(`Error: ${err.response.data.error?.message || err.message}`));
      } else if (err.request) {
        console.error(chalk.red('Network error - no response received'));
      } else {
        console.error(chalk.red(`Error: ${err.message}`));
      }
    }
  });

program.parse();
```

## Using It

Here's how you'd use it:

```bash
# Generate some Apex code
npm start generate "trigger to update account when contact is added"

# Explain what some code does
npm start explain "public class MyClass { }"

# Test your API connection
npm start test
```

## Getting It Running

You'll need Node.js and an OpenAI API key. The setup is pretty simple:

1. **Install dependencies:**
   ```bash
   cd ai-apex-snippets
   npm install
   ```

2. **Add your OpenAI API key:**
   Create a `.env` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

The main dependencies are:
- **Commander.js** for CLI stuff
- **Axios** for API calls
- **Chalk** for colored output
- **Ora** for loading spinners

## What I Learned

I've been using this tool for a few weeks now and it's been pretty handy for:
- **Quick prototypes** - describing what I want and getting a starting point
- **Code explanations** - pasting in complex Apex and getting a plain English breakdown
- **Learning new patterns** - asking it to show me different ways to solve the same problem

## Gotchas

A few things to watch out for:
- **API rate limits** - if you hit them, just wait a bit and try again
- **Model availability** - I recently upgraded the code to use `gpt-4o` which seems to be pretty reliable
- **API key security** - keep that `.env` file out of version control

## Where This Could Go

This is just a simple starting point, but I can see a few interesting directions:
- **Salesforce CLI integration** - deploy generated code directly
- **Batch processing** - generate multiple classes at once
- **Custom templates** - save your favorite prompt patterns
- **Code quality checks** - analyze and suggest improvements

## Wrapping Up

This tool has been fun to build and actually useful for my day-to-day Apex work. It's nothing revolutionary, but it's a good example of how AI can make the boring parts of development a bit less painful.