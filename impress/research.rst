:title: Hovercraft! demo
:data-transition-duration: 700
:css: hovercraft.css

----

VR Viewport Analysis
====================

.. raw:: html

    <p style="font-size: 20px">Agustin Diocares, Matthew Vu, David Wank, Natasha Trayers, Sunny Guan</p>

----

The Problem
===========

.. raw:: html

    <img src="images/zuck.jpg" />

----

Abstract
==========

.. raw:: html

    <ul style="list-style-position: inside; padding-left: 0">
        <li>Salient Features</li>
        <li>User Viewport</li>
    </ul>

----

Original
========

.. raw:: html

    <img src="images/original.jpg" style="width: 100%"/>

----

Salient Features
================

.. raw:: html

    <img src="images/salient_paint.jpg" style="width: 100%"/>

----

User Viewports
==============

.. raw:: html

    <img src="images/traces.png" style="width: 100%"/>

----

Radius
======

.. raw:: html

    <img src="images/example.png" style="width: 100%"/>

----

.. raw:: html

    <ol style="list-style-position: inside; padding-left: 0">
        <li>Prove Correlation</li>
        <li>Predict Viewport Clusters</li>
    </ol>

----

Hypothesis
==========

.. raw:: html

    <p>
        Salient features can be used to predict user viewport, which can be used to train a prediction model that dynamically render important areas in higher resolution to reduce data bandwidth
    </p>

----

Short Prediction
================

.. raw:: html

    <img src="images/short-horizon.jpg" style="width: 100%"/>

----

Long Prediction
===============

.. raw:: html

    <img src="images/long-horizon.jpg" style="width: 100%"/>

----

Correlation Ratio
=================

----

.. raw:: html

    <img src="images/example.png" style="width: 70%"/>

% of captured (orange) dots: :math:`\dfrac{\text{# of orange dots}}{\text{# of all dots}}`

% of screen covered: :math:`\dfrac{\text{area in red circles}}{\text{area of screen}}`

Ratio: :math:`\dfrac{\text{% of captured dots}}{\text{% of screen covered}}`

----

Ratio vs Radius
===============

.. raw:: html

    <img src="images/correlation_vs_radius.png" style="width: 70%"/>

----

.. raw:: html

    <h2>Upper Bound with K-Means</h2>

.. raw:: html

    <img src="images/k_means_upper_bound.png" style="width: 70%"/>

Orange line: best possible correlation ratio

Blue line: salient feature correlation ratio

----

Prediction Model
================

----

.. raw:: html

    <img src="images/model_detailed.png" style="width: 100%"/>

----

.. raw:: html

    <img src="images/model.png" style="width: 70%"/>

Green: predicted viewport area

White: actual viewport area

----

:data-y: r1200
:data-rotate-x: 180 

.. raw:: html

    <img src="images/dist.png" style="width: 70%"/>

Median: :math:`3756 \text{ (pixels squared) } \Longrightarrow 61.28 \text{ pixels } \Longrightarrow 11\% \text{ loss }` 

IQR: :math:`1735 \text{ (pixels squared) } \Longrightarrow 41.66 \text{ pixels }` 

----

:data-rotate-x: 90

Thank you!
======================

On Github: github.com/ACM-Research/vr-viewport-analysis