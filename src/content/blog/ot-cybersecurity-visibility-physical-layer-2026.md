---
title: "OT Cybersecurity's Blind Spot Includes the Physical Layer"
description: "A 2026 survey found nearly a quarter of organizations can see only half of their OT environment. Real OT visibility includes the physical layer, and the security system itself has to be segmented so it does not become the next attack surface."
pubDate: 2026-06-13
category: "Industrial Security"
author: "Barry Fuller"
image: "https://www.securitymagazine.com/ext/resources/2026/06/09/Green-planes-reflected-by-Vishal-Bansal.webp?t=1781028079"
readingTime: 4
---
A 2026 industry survey found that 23% of organizations have visibility into only half of their operational technology environment. That is roughly a quarter of industrial operators defending equipment they cannot fully see. Security Magazine reported the figure this month in its coverage of the Fortinet State of Operational Technology and Cybersecurity Report, alongside a clear message from across the industry: OT security is maturing, but visibility is still the weak link.

## Maturing priority, lagging visibility

The good news is that OT security is no longer an afterthought. Organizations increasingly recognize the risk from ransomware, nation-state actors, and opportunistic cybercriminals. The advice from practitioners has shifted accordingly. The focus is moving from prevention alone toward resilience, on the assumption that an adversary may eventually gain access and must be stopped from moving laterally.

Two recommendations come up repeatedly. The first is granular microsegmentation and zero-trust principles, so a foothold in one system does not become access to the entire plant. The second is real coordination between IT and OT teams, because OT security is strongest when it is supported by disciplined IT security. Both are sound. Both also depend on something more basic: you have to be able to see the environment you are trying to segment and defend.

## Visibility includes the physical layer

Most OT visibility conversations stay focused on network telemetry, asset inventories, and traffic analysis. That matters. It is also incomplete. As Vikesh Khanna of Ambient.ai put it in the same article, unauthorized physical access to industrial control system assets remains a major vector for breaches.

You cannot claim full visibility into an OT environment if you cannot see who is standing in front of the PLC cabinet, the network closet, or the control room door. Cameras, access control, and intrusion detection are not separate from OT security. They are the part of OT visibility that watches the physical spaces where the most sensitive assets actually live. A blind spot at a loading dock or an unmonitored mechanical room is an OT exposure, not just a facilities one.

## The security system can become the soft target

There is a second, less comfortable point in the reporting. John Gallagher of Viakoo noted that OT and IoT devices represent a larger attack surface than traditional IT systems, and that physical security gear is often the most easily compromised part of it. He framed the timing problem bluntly: if an attacker using AI can find and exploit a vulnerability in hours while it takes an organization six months to patch its physical security systems, the math favors the attacker.

That has a direct design consequence. The cameras and switches you add to gain visibility must not become the soft entry point into the operational network. This is where microsegmentation stops being abstract. A surveillance network belongs on its own VLAN, segregated from the operational and business networks, so a compromised camera cannot reach a controller. The switching hardware should be supply-chain conscious as well. NETGEAR surveillance switches, for example, comply with NDAA Section 889, which matters for any operator with federal or defense exposure.

Note

A camera system bolted onto the operational network adds an attack surface faster than it adds visibility. Segmentation is what turns a security upgrade into an actual improvement.

## What this means for industrial operators

For plant managers and operations directors in Northeast Alabama and beyond, the survey gap is a prompt to ask a few plain questions about your own facility:

-   Can you see the physical spaces where your control systems, panels, and network gear sit, or are there blind spots?
-   Is your camera and security network segmented from your operational network, or does it share one flat network?
-   Can the equipment actually be maintained and updated, or was it installed and forgotten years ago?

Most systems were good enough when they were installed. Many have not kept up with how OT environments are attacked today.

Overwatch Systems Integrated is a locally owned integrator in Oxford, Alabama, built on two decades of industrial maintenance and automation experience. Our team is equipped to design surveillance, access control, and network infrastructure for industrial environments where reliability and network performance are not optional, including VLAN segregation that keeps the security network off the operational network. We offer a complimentary, no-obligation facility walkthrough that maps coverage gaps, network bottlenecks, and integration weak points, and gives you a straight answer. If the OT visibility gap is a live question at your facility, [reach out to OSI](https://www.overwatchsi.com/contact) and we will take a look.
