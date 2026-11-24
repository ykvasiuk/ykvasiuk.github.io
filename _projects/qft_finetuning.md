---
title: "Fine-tuning small reasoning models for quantum field theory"
collection: projects
area: ai
order: 3
short_title: "Fine-tuning small reasoning models for QFT"
excerpt: "A comparison of reinforcement learning and supervised fine-tuning for teaching small language models to solve verifiable problems in quantum field theory."
---

## Overview

Large language models are increasingly used in theoretical physics, but little is known about how domain-specific physics reasoning develops during training. We compare reinforcement learning (RL) and supervised fine-tuning (SFT) of small reasoning models on verifiable problem-solving tasks, using quantum field theory (QFT) as the test domain.

## Data

Open, verifiable training data for theoretical physics is scarce, so we built a data generation pipeline that both creates synthetic problems and adapts human-written problems for training. This gave us more than 2,500 synthetic QFT problems, plus a curated set of human-adapted problems drawn from arXiv and standard pedagogical sources.

## Findings

- Both RL and SFT improve over the base model on every dataset.
- SFT gains concentrate on in-distribution synthetic tasks.
- RL generalizes better: it outperforms SFT on the human-adapted datasets and on [TPBench](/projects/tpbench_project/).
- Analysing chains of thought before and after fine-tuning shows how reasoning errors change under each method.

We release the data pipeline, the verifiable QFT training data, and roughly 200M tokens of QFT reasoning traces.

## Links

- Paper: [arXiv:2604.18936](https://arxiv.org/abs/2604.18936) · [Mach. Learn.: Sci. Technol. 7, 055029](https://doi.org/10.1088/2632-2153/aea39e)
