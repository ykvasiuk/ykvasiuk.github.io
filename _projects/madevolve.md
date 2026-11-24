---
title: "MadEvolve: evolutionary optimization of trading systems with large language models"
collection: projects
area: autoresearch
order: 1
short_title: "MadEvolve: LLM-driven evolution of trading systems"
excerpt: "An LLM-driven evolutionary loop, first built to optimize algorithms in computational cosmology, applied to trading strategies and alpha generation — with a careful look at p-hacking."
---

## Overview

If a problem has a programmatic evaluation function, an LLM can be put in a loop: write code, run the experiment, read the score, propose an improvement. MadEvolve is a general-purpose algorithm optimization framework of this kind, inspired by AlphaEvolve and originally developed to optimize algorithms in computational cosmology. Here we test how far the same machinery carries in a very different domain — quantitative finance.

## What we optimize

Using Bitcoin trading as the example, with our own simulation and backtesting setup, we evolve:

- **Feature sets** for signal generation,
- **Individual components** of the trading strategy,
- **The feature pipeline and execution strategy jointly.**

We find significant improvements on every task we considered.

## Is it research, or p-hacking?

An automated loop that tries many variants against a backtest is an efficient way to overfit. We therefore estimate p-hacking probabilities on our simulation setup, and compare the evolutionary approach against other agentic search methods.

## Links

- Paper: [arXiv:2605.23007](https://arxiv.org/abs/2605.23007)
