---
title: "QML-FAST - A Fast Code for Low-ℓ Tomographic Maximum Likelihood Power Spectrum Estimation"
collection: projects
area: cosmology
order: 2
short_title: "QML-FAST: optimal low-ℓ power spectra"
image: "qml.png"
excerpt: "We present a novel implementation for the quadratic maximum likelihood (QML) power spectrum estimator for multiple correlated scalar fields on the sphere with computational optimizations making it tractable for low-ℓ analysis."
---

## Overview

We present **QML-FAST**, a novel implementation for the quadratic maximum likelihood (QML) power spectrum estimator for multiple correlated scalar fields on the sphere. Our estimator supports arbitrary binning in redshift and multipoles \\(\ell\\) and includes cross-correlations of redshift bins. It implements a fully optimal analysis with a pixel-wise covariance model and includes a number of optimizations which make the estimator and associated covariance matrix computationally tractable for a low-\\(\ell\\) analysis.

## QML Formalism for Multi-Field Power Spectrum Estimation

The QML estimator provides optimal power spectrum estimation with statistically minimal error bars. Our implementation generalizes the QML framework to an arbitrary number of correlated fields, making it ideal for:

- **Photometric galaxy surveys**: Where galaxy samples are binned in redshift with width proportional to photometric redshift error
- **CMB analyses**: Low-\\(\ell\\) power spectrum analysis for kSZ velocity reconstruction or primordial non-Gaussianity studies
- **Cross-correlation studies**: Multiple correlated fields with optimal handling of cross-powers between redshift bins

The QML estimator minimizes the variance of power spectrum estimates by accounting for the full pixel-wise covariance structure, unlike the popular pseudo-\\(C_{\ell}\\) method which is fast but not optimal.

## Computational Optimizations

### Fisher Matrix Evaluation
We implement several key optimizations to make the computationally intensive Fisher matrix calculation tractable:

- **Sparsity exploitation**: Leveraging the sparsity of basis matrices in signal covariance decomposition
- **Precomputation and reuse**: Strategic caching of computational elements to avoid redundant calculations
- **Symmetry utilization**: Exploiting symmetries of building blocks and real spherical harmonic basis

### Block-Diagonal Covariance
For cases with block-diagonal covariance structure, we implement specialized algorithms that significantly reduce computational complexity while maintaining optimality.

### Optimized ℓ Binning
Our implementation includes efficient ℓ binning algorithms that allow for arbitrary binning schemes while maintaining computational efficiency. This is particularly important for low-\\(\ell\\) analyses where fine binning is needed.

### Parametric Complexity Management
The implementation handles realistic survey configurations with careful memory management and parameter scaling, making it suitable for large-scale photometric surveys and future CMB experiments.

## Validation and Comparison

### Extensive Simulation Testing
We validate our estimator extensively on simulations, demonstrating:

- **Unbiasedness**: The estimator produces unbiased power spectrum estimates
- **Mode deprojection**: Proper removal of unwanted multipoles and systematic effects
- **Optimality**: Statistical efficiency compared to theoretical bounds

### Comparison with Pseudo-Cℓ Method
Our validation shows significant gains over the common pseudo-\\(C_{\ell}\\) method, particularly at large scales where the QML approach excels. 

### Performance Metrics
The code demonstrates remarkable performance:
- **40 correlated fields** up to \\(N_{\text{side}}=32\\) processed in **timescale of an hour** on a single 24-core CPU
- **Memory requirements**: \\(<256\\) GB RAM for realistic survey configurations
- **Scalability**: Several orders of magnitude faster than naive implementations

## Results

Our QML-FAST implementation successfully demonstrates:

- **Computational tractability**: Making optimal power spectrum estimation feasible for realistic survey configurations
- **Statistical optimality**: Achieves CRLB
- **Flexibility**: Supporting arbitrary field correlations and binning schemes
- **Validation**: Extensive testing confirms theoretical predictions and unbiasedness

The [companion paper](/projects/ksz_desi-ls/) applies this estimator to kSZ velocity reconstruction using ACT and DESI Legacy Survey data, constructing full QML estimators for 40 correlated fields and demonstrating the practical utility of the approach.


## Links

- **Paper**: [QML-FAST - A Fast Code for low-ℓ Tomographic Maximum Likelihood Power Spectrum Estimation](https://arxiv.org/pdf/2510.05215) (arXiv:2510.05215)
- **Code**: [QML-FAST GitHub Repository](https://github.com/ykvasiuk/qmlfast)
