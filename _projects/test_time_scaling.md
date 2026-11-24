---
title: "Test-time Scaling Techniques in Theoretical Physics"
collection: projects
area: ai
order: 2
short_title: "Test-time scaling for theoretical physics"
image: "accuracy_vs_attempts.png"
excerpt: "We evaluate test-time scaling methods on the TPBench physics dataset and develop a novel symbolic weak-verifier framework that significantly outperforms existing approaches for complex scientific reasoning."
---

## Overview

This project reproduces and summarizes the findings of *Test-time Scaling Techniques in Theoretical Physics: A Comparison of Methods on the TPBench Dataset* ([arXiv:2506.20729](https://arxiv.org/abs/2506.20729)).

The study evaluates how different **test-time scaling strategies** affect large language model (LLM) reasoning on advanced theoretical-physics problems using **TPBench**, a benchmark containing symbolic, multi-step derivations across cosmology, field theory, and mathematical physics.

## Methodology

The paper compares four explicit test-time scaling approaches:

### Sequential Multi-round Reasoning
The model performs iterative refinement—each generation revises or critiques previous attempts.  
We find that sequential scaling shows limited gains on harder physics problems.

### Parallel Majority Voting
Multiple solutions are generated independently, and the most frequent answer is chosen.  
This simple parallel baseline improves stability but plateaus quickly.


### Parallel Scaling with Weak Verifiers
The key contribution.  
Each candidate derivation is decomposed into symbolic steps and evaluated by a **weak verifier** based on *SymPy*, which checks algebraic and calculus consistency step-by-step and assigns a soft verification score. The highest-scoring candidate is selected.  

## Results

Across all TPBench categories, **parallel weak-verifier scaling** achieves the highest accuracy—up to **≈22 % improvement** and approaching the **best-of-N upper bound**.  
Key observations:

- We don't immediately see an improvement from the sequential scaling technique discussed, although we think that the concept is underexplored
- Symbolic parallel verification, on the other hand, substantially improves robustness with limited computational overhead.

## Discussion & Conclusion

Parallel scaling methods perform best, especially when combined with **step-wise symbolic verification**.  
Sequential multi-round reasoning does not enhance performance on difficult problems, indicating the need for more sophisticated iterative frameworks.  
The results highlight that **domain-aware verification is essential** for physics reasoning and that future progress will depend on developing **stronger symbolic tools** capable of handling the wider range of mathematical expressions found in theoretical physics—such as tensor calculus and operator algebra.  
Integrating these verifiers directly into the generation process, rather than using them post hoc, represents an important direction for future research.


## Links

- **Paper**: [Test-time Scaling Techniques in Theoretical Physics -- A Comparison of Methods on the TPBench Dataset](https://arxiv.org/abs/2506.20729) (arXiv:2506.20729)
- **TPBench Project**: [https://tpbench.org/](https://tpbench.org/)
