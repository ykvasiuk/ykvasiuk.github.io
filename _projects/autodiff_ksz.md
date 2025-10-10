---
title: "Velocity Reconstruction with Autodifferentiable Forward Modelling and Optimization"
collection: projects
image: "cmb_logo_ink_centered2.png"
excerpt: "We present an optimal estimator for the peculiar radial velocity field by jointly maximizing the posterior of the CMB temperature anisotropy given galaxy survey induced by the kinetic SZ effect."
---

## Overview

We develop an optimization-based maximum likelihood approach to analyze the cross-correlation of the Cosmic Microwave Background (CMB) and large-scale structure induced by the kinetic Sunyaev-Zeldovich (kSZ) effect. The main goal is to reconstruct the radial velocity field of the Universe with the forward modelling of the kSZ effect and the numerical optimization of the posterior. As the MAP estimator is optimal by construction, this leads to the improved signal-to-noise (SNR) as compared to the traditional reconstruction approaches.

## The Kinetic Sunyaev-Zeldovich Effect

The kinetic Sunyaev-Zeldovich (kSZ) effect is the dominant contribution to the CMB anisotropies at small scales, overcoming CMB lensing around ℓ ≃ 4000. It arises due to a Doppler shifting of CMB photons due to Thomson scattering on free electrons along the line of sight. The kSZ signal is sensitive to both bulk velocities and galaxy/cluster astrophysics, making it a powerful probe for constraining dark energy models, neutrino masses, modified gravity, and primordial non-Gaussianity.

The kSZ temperature fluctuation is given by:

$$\Delta T_{\text{kSZ}}(\hat{\mathbf{n}}) = -\sigma_T \int \frac{d\chi}{a^2} n_e(\chi\hat{\mathbf{n}}, \chi) v_r(\chi\hat{\mathbf{n}}, \chi)$$

where \\(\sigma_T\\) is the Thomson cross-section, \\(n_e\\) is the electron density, \\(v_r\\) is the radial velocity, \\(\chi\\) is the comoving distance, and \\(a\\) is the scale factor.

## Joint Likelihood Formulation

The project develops a maximum likelihood approach to kSZ velocity reconstruction that outperforms traditional quadratic estimators at high signal-to-noise. The joint likelihood formulation allows for:

- **Joint parameter fitting**: Simultaneously fitting cosmological and astrophysical parameters
- **Unified analysis**: Combining several different kSZ analyses into a single framework
- **Improved signal-to-noise**: Extracting more information than quadratic estimators, especially at high signal-to-noise levels

Ignoring the foreground contributions for now, we can model the total CMB temperature anisotropy as \\(\theta_{obs} = \theta_{prim}+\theta_{kSZ}+\theta_{noise}\\). Let us assume we have observed the galaxy overdensity \\(\delta_g\\) from the galaxy survey and we have some model that relates the electron density to the galaxy distribution \\(n_e(\delta_g)\\). Then we can write the likelihood for the observed quantities:

$$\begin{aligned}
&-2\ln\mathcal{L}(\theta_{obs},\delta^{obs}_g|\theta_{prim},\delta_g, v_r) = \\ &(\theta_{obs}-\theta_{prim}-\theta_{ksz}(\delta_g,v_r))N^{-1}_T(\theta_{obs}-\theta_{prim}-\theta_{ksz}(\delta_g,v_r)) + \\ &(\delta^{obs}_g-\delta_g)N^{-1}_g(\delta^{obs}_g-\delta_g)
\end{aligned}$$

Supplying the likelihood with the corresponding priors for \\(\theta_{prim}, \delta_g, v_r \\), we can write the posterior 

$$-\ln\mathcal{P}(v_r,\delta_g,\theta_{prim}|\delta^{obs}_g) = - \ln \mathcal{L} - \ln \mathcal{P(v_r,\delta_g,\theta_{prim})}$$

The MAP estimator is found by numerically optimizing the posterior probability of the velocity field given the observed CMB temperature and galaxy survey data.

## Technical Implementation

### JAX-Based Autodifferentiation Framework

The entire likelihood optimization pipeline is implemented using **JAX**, a Python package with versatile and highly optimized autodifferentiation capabilities. This enables:

- **Automatic gradient computation**: Efficient numerical derivatives with respect to all fields and scalar parameters
- **Hessian evaluation**: Easy computation of second-order derivatives for error estimation
- **Seamless integration**: Compatibility with complex cosmological forward models and emulators
- **Optimized FFT routines**: Efficient switching between real and Fourier space representations

### Data Dimensionality and Memory Management

The implementation handles realistic survey configurations through careful dimensionality management:

- **Parameter scaling**: For \\(n\\) redshift bins and angular side length \\(N_{\text{side}}\\), we solve for \\(N_{\text{side}}^2 \times (2n + 1)\\) total parameters
- **Memory optimization**: Up to 23 redshift bins with \\(2048^2\\) pixel maps on a single 16 GB RTX-A4000 GPU
- **Multi-GPU parallelization**: Different redshift bin groups distributed across multiple GPUs with collective communication

### Data Representation and Transformations

The implementation uses a dual-space approach optimized for different computational requirements:

- **Pixel space (x-space)**: CMB likelihood terms are naturally represented here due to diagonal noise covariance and simple pixelwise kSZ multiplication
- **Fourier space (l-space)**: Prior terms naturally are represented here with diagonal covariance matrices
- **FFT transformations**: Seamless switching between representations using JAX FFT routines


## Results

The method was tested on the [AGORA](https://yomori.github.io/agora/index.html) simulation suite, demonstrating:
- Successful reconstruction of radial velocity fields witth the improved signal-to-noise over quadratic estimators
- Computational tractability for realistic survey configurations
- Promising prospects for a general framework for a joint field and parameter estimation for the future CMB and LSS surveys

## Links
The full paper can be found here:
- [arXiv Paper](https://arxiv.org/pdf/2305.08903)
- [Physical Review D Publication](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.109.083515)

## Future Work
The following things are planned to be addressed:
- Realistic foregrounds modellng
- Development of the more sophisticated \\(\delta_g \rightarrow \delta_e\\) model (partially addressed in ).
- Full Bayesian analysis with constraints on the cosmological parameters.
- Possible inclusion of the other secondaries, such as lensed CMB
