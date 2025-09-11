---
title: "KSZ Velocity Reconstruction with ACT and DESI‑LS using a Tomographic QML Power Spectrum Estimator"
collection: projects
image: "image2.png"
excerpt: 'We perform a reconstruction of the radial velocity with the kSZ effect. We use the ACT-DR6 CMB data and the DESI-LS galaxy sample. We find a strong cross correlation detection signifficance (\(\sim 11 \sigma\))'
---

## Overview
This project performs the **kinetic Sunyaev‑Zel'dovich (kSZ) velocity** reconstruction using real observational data from ACT DR6 and DESI‑LS DR9. We use the quadratic estimator to reconstruct velocity. A new **tomographic Quadratic Maximum Likelihood (QML)** estimator is developed, operating in redshift‑binned spherical coordinates (onion picture), to cross correlate the reconstructed velocity field with galaxy density. We find that widely assumed Battaglia-AGN profile of the electron density results in the \\(A=0.39\\) for the reconstructed amplitude of the velocity, possibly indicating the presence of enhanced feedback


## Methodology

- **Data Sets**  
  - ACT (Atacama Cosmology Telescope) Data Release 6 (DR6) for CMB temperature maps.
  - DESI‑LS (Dark Energy Spectroscopic Instrument – Large Survey) Data Release 9 galaxy catalog.

- **Estimator / Reconstruction**  
  - A quadratic estimator (QE) is used to reconstruct the velocities (note: even though it is suboptimal, for the given experimental noises it's enough. However, for the futuristic experiments, one could benefit from the [field likelihood analysis](/projects/project1/))
  - We develop a new tomographic QML (Quadratic Maximum Likelihood) in spherical coordinates with bins in redshift. This allows to optimally estimate the cross‑powers between velocity field and galaxy density on the lightcone

## Results

We report an **11.7 σ detection** of the cross-correlation between the reconstructed kSZ velocity field (from ACT DR6) and the DESI-LS DR9 galaxy density field.  
Central to this achievement is the introduction of a **tomographic Quadratic Maximum Likelihood (QML) estimator**, which a general optimal power spectrum estimator for an arbitrary \\(N\\) correlated Gaussian fields on a sphere.

A key physical result is the recovered **amplitude parameter \(A \approx 0.4\)** relative to standard halo-model predictions. This value well below unity indicates **strong astrophysical feedback**, such as gas heating or ejection from massive halos, which suppresses the expected kSZ signal relative to the Battaglia-AGN electron density profile.

### Future Prospects

In the future, we plan to use the reconstructed velocity to obtain the cosmological parameter constraints, in particular the local non-Gaussianity \\(f_{NL}\\), and possibly others (\\(m_\nu,\frac{dw}{da}\\))

## Links

- Paper: **KSZ Velocity Reconstruction with ACT and DESI‑LS using a Tomographic QML Power Spectrum Estimator** — arXiv: [2506.21684](https://arxiv.org/abs/2506.21684)
