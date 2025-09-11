---
title: "TP Bench – Theoretical Physics Benchmark for AI"
collection: projects
image: "squarelogo.png"
excerpt: 'A curated dataset and evaluation suite designed to measure the reasoning capabilities of AI models in theoretical physics'
---


## Overview

Scientific AI models are rapidly improving, but there remain **very few benchmarks** that pose **original, research‑grade problems** in theoretical physics. **TPBench** fills this gap by providing novel, non‑public problems, many at graduate or research difficulty, across fields such as cosmology, high‑energy theory, and mathematical physics.  
This is critical because the long‑term scientific and societal benefits of capable scientific AI—such as automated discovery, analytic derivations, and theory development—require a clear understanding of current model capabilities and shortcomings.

Benchmarking is the necessary first step: it allows the community to **track progress**, **diagnose failure modes** in reasoning and mathematics, and **set concrete targets for future models**.  
TPBench’s first release contains 57 problems from undergraduate to original research level, with the hardest remaining unsolved by today’s leading large language models, highlighting how far AI still has to go.

## Methodology

TPBench consists of:

- **Curated Problem Sets**  
  Problems are original - they can't be found in various public collections.  
  They include derivations, multi-step analytical reasoning, and conceptual explanations.

- **Public and Private Splits**  
  A small subset of problems and different models' solutions is made public
  A private hidden set ensures unbiased evaluation of AI models and prevents data leakage into training corpora.

- **Evaluation Protocol**  
  Models are tested for correctness of final answers and quality of intermediate reasoning steps.  

- **Leaderboard and Continuous Updates**  
  TPBench tracks and displays model performance on its website, providing a transparent benchmark for progress in AI for physics.

## Significance and Applications

TPBench serves several purposes:

- **Benchmarking AI for Theoretical Physics**  
  It enables fair comparison of large language models and symbolic reasoning systems on rigorous physics tasks.

- **Research and Development**  
  Helps guide the design of specialized AI architectures and training methods that can handle symbolic derivations and complex mathematical reasoning.

## Future Plans

Future development of TPBench is expected to include:

- Expanding both the public and private sets.
- Adding problem categories covering broader areas of theoretical physics.
- Developing richer evaluation metrics to assess step-by-step reasoning, not just final answers.
- Facilitating community contributions while maintaining strict quality control.

---

## Links

- Official website: [https://tpbench.org/](https://tpbench.org/)
- Paper: [arXiv:2502.15815](https://arxiv.org/pdf/2502.15815)
