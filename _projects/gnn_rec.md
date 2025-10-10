---
title: "Reconstruction of the non-linear cosmological density fields from galaxies"
collection: projects
image: "image1.png"
excerpt: 'We develop a new method of reconstruction of the cosmological fields, such as dark matter and baryon density, from the observed luminous galaxies'
---

## Overview

This project develops and evaluates **hybrid graph neural network–convolutional neural network (GNN‑CNN)** approaches for reconstructing continuous cosmological fields—specifically, dark matter and baryon (gas/electron) density—from discrete galaxy catalogs. The goal is to move from luminous tracers to continuous fields in 3D, bridging simulation-based training with observational applications. The methods demonstrate significant improvements over established baselines such as linear transfer functions and halo‑model reconstructions.

## Methodology

We employ CAMELS hydrodynamical simulations (IllustrisTNG-LH snapshots at redshift z=0) as the training and validation ground truth. Each simulation box contains ~200 galaxies with cosmological and astrophysical parameters varied across runs.

The reconstruction pipeline consists of three key stages:

1. **Message-Passing GNN**  
   Encodes galaxy features (positions, stellar mass, luminosity, velocity dispersion) and relational edge features via message passing.

2. **Learned Grid Aggregation**  
   Galaxy node embeddings are assigned to a regular grid using a bipartite graph with an MLP-based radial kernel. This replaces conventional CIC assignment and enables a flexible, learned mapping between galaxies and voxels.

3. **CNN Decoder**  
   A UNet-style convolutional network (with periodic padding) processes the voxel grid and outputs continuous dark matter and electron density fields.

Results show that both dark matter and baryon fields are reconstructed with high fidelity, giving a hign cross-correlation coeficient \\(r^2(k)\\) even in the highly non-Linear regime.

## Comparison to Alternative Methods

A systematic comparison against traditional approaches highlights the advantage of the GNN‑CNN pipeline:

- **Linear Transfer Functions**  
  Apply a Fourier-space filter \\(T(k)=\frac{P_{gm}(k)}{P_{gg}(k)}\\) to the galaxy density field. This method gives the same cross-correlation by construction, effectively rescaling the power spectrum

- **Halo-Level GNN + NFW**  
  A GNN predicts halo masses from galaxy features, followed by profile painting.

- **GNN‑CNN Field Reconstruction**  
  Outperforms all baselines across scales, capturing non-linear features and robustly generalizing across astrophysical feedback variations. Visualizations confirm the recovery of fine-scale structure absent in other methods.


## Results and Conclusions

- The GNN‑CNN achieves the highest cross-correlation with ground-truth matter and baryon fields, especially on non-linear scales where traditional approaches break down.  
- For kSZ velocity reconstruction, improvements in reconstruction fidelity can halve the effective noise.  
- Performance is robust under variations of astrophysical feedback parameters and does not require explicit parameter conditioning.  
- Compared with linear and halo-model methods, the hybrid GNN‑CNN offers the most flexible, accurate, and observation-ready framework for mapping galaxies to continuous fields.


## Links

- **Reconstruction of Continuous Cosmological Fields from Discrete Tracers with Graph Neural Networks (NeurIPS ML+Physical Sciences, Nov 2024)** — arXiv: [2411.02496](https://arxiv.org/abs/2411.02496)  
- **Reconstruction of Dark Matter and Baryon Density From Galaxies: A Comparison of Linear, Halo Model and Machine Learning‑Based Methods (JCAP submission, July 2025)** — arXiv: [2507.12530](https://arxiv.org/abs/2507.12530)
- **[Code](https://github.com/ykvasiuk/g2fnet)**  
