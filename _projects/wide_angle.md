---
title: "Optimal and exact wide-angle power spectrum estimation"
collection: projects
area: cosmology
order: 3
short_title: "Optimal wide-angle power spectra"
excerpt: "On the largest scales the plane-parallel approximation breaks down. We derive the optimal power spectrum estimator in this regime and an exact, FFT-friendly form of its window function."
---

## Overview

Galaxy surveys now cover so much of the sky that the usual plane-parallel approximation — treating all lines of sight as parallel — fails on the largest scales. These are exactly the scales that carry information about primordial physics. Standard tools such as the Yamamoto estimator are only optimal in the plane-parallel limit, and their window functions are usually approximated by truncating a slowly converging series.

## What we do

- **Optimal estimator.** We derive the optimal estimator for a broad class of clustering signals and show that it is equivalent to a two-\\(\ell\\) generalization of the Yamamoto estimator.
- **Exact window function.** We write the exact two-\\(\ell\\) window function as a finite number of terms, each of which can be evaluated efficiently with FFTs.
- **Broad applicability.** The results cover redshift-space distortions as well as large-scale radial-velocity reconstruction from the kinetic Sunyaev-Zel'dovich effect.

## Results

Focusing on linear-theory redshift-space distortions, we validate the finite window-function representation numerically and find that the two-\\(\ell\\) estimator can give order-unity improvements in the signal-to-noise of ultra-large-scale power spectrum measurements.

## Links

- Paper: [arXiv:2607.05513](https://arxiv.org/abs/2607.05513)
