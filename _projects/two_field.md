---
title: "Two-field formalism for a neural network-enhanced non-Gaussianity search with halos"
collection: projects
image: "untltd.png"
excerpt: 'We introduce a new, neural-net-enhanced method for measuring the local non-Gaussianity \(f_{NL}\) from the dark matter halos with the estimator that reconstructs the local value of \(\sigma_8\) and the large-scale linear dark matter field'
---

## Overview

Primordial non-Gaussianity of a local type, given by the modification

$$\Phi(\mathbf{x}) = \phi(\mathbf{x}) + f_{NL}(\phi^2(\mathbf{x}) - \langle\phi^2(\mathbf{x})\rangle)$$ 

of the otherwise Gaussian gravitational potential, results in a so-called scaled dependent bias for any bised tracer of the matter field. This results in the \\(f_{NL}\\) dependence of the locally observed variance of the matter field 

$$\sigma_8(\mathbf{x}) = (1+2f_{NL}\Phi_{L}(\mathbf{x}))\bar{\sigma}_8$$

Hence we can leverage this relation to construct an estimator of \\(f_{NL}\\) by building the probe that is sensitive to the local \\(\sigma_8\\) and to the long modes of \\(\Phi\\).

## Two-field \\(\pi\\) formalism

We introduce the field \\(\pi\\) that is sensitive to the local variance of the matter fluctuations \\(\sigma_8\\). It obeys the linear scale dependent bias statistics on the large scales:

$$\pi(\mathbf{k}) = \left(b^{g}_\pi + 2b^{NG}_\pi\frac{f_{NL}}{\alpha(k)}\right)\delta_m(\mathbf{k}_L) + \epsilon_\pi(\mathbf{k})$$

We show that one can learn such field from the simulated dark-matter halo catalogs, derive the loss and then show that only one such field is enough to be optimally sensitive to the \\(f_{NL}\\) given that the matter field is known. Then we relax that assumption and introduce another field \\(\pi_{m}\\) to reconstruct the large-scale linear matter modes. By directly calculating the Fisher information, we show that in this case, these two fields are enough to saturate information bound on the non-Gaussianity \\(f_{NL}\\). 

## Numerical Results

We test the proposed setup on the [AbacusSummit](https://abacussummit.readthedocs.io/en/latest/) large volume N-body simulation suite. We explicitly verify the claims that

- In the case of known matter field \\(\delta_m\\), one \\(\pi\\) field is equally sensitive to \\(f_{NL}\\) as \\(N\\) biased tracers (such as halo population of different masses).
- Inclusion of complementary local halo statistics, such as concentration, increases sensitivity.
- The proposed formalism is easily generalizable to the case when we have access to additional local halo statistics (concentration, velocity, position, etc.), as opposed to the traditional approach when each new halo probe would need it's own set of unknown biases and the correlated noise matrix that results in the large amount of MCMC parameters and poor convergence.

## Links

More details can be found in the full paper
- [arXiv Paper](https://arxiv.org/pdf/2410.01007)
- [Physical Review D Publication](https://journals.aps.org/prd/abstract/10.1103/2szy-wypg)

