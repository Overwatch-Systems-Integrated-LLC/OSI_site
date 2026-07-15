---
title: "Iranian State Actors Are Targeting U.S. Industrial Control Systems. What That Means for Your Facility."
description: "A joint federal advisory from the FBI, CISA, and NSA confirmed Iranian-linked hackers are actively compromising internet-exposed PLCs across U.S. critical infrastructure. Here is what that means for industrial facilities in Northeast Alabama."
pubDate: 2026-06-03
category: "Industrial Security"
author: "Barry Fuller"
image: "https://www.securityweek.com/wp-content/uploads/2025/12/Iranian-Hackers.jpg"
readingTime: 4
---
A plant operator checks the HMI screen and sees normal process readings. The system looks fine. What they cannot see is that the underlying PLC has been fed manipulated logic by actors operating from overseas, altering what the display shows while controlling what the physical equipment actually does. That scenario is not theoretical. It is the documented attack method described in a joint federal advisory issued April 7, 2026.

## What the federal advisory actually says

The FBI, CISA, NSA, EPA, the Department of Energy, and U.S. Cyber Command issued a joint warning confirming that Iranian-linked threat actors, operating as CyberAv3ngers and assessed to be affiliated with Iran's Islamic Revolutionary Guard Corps, have been actively compromising internet-exposed programmable logic controllers across U.S. critical infrastructure. The campaign targets Rockwell Automation Allen-Bradley PLCs specifically, gaining access through internet-facing connections, deploying SSH backdoors, manipulating project files, and altering data displayed on HMI and SCADA systems. Targeted sectors include water and wastewater utilities, energy infrastructure, and local government services. Multiple victims reported operational disruptions and financial losses.

This is not a ransomware campaign designed to lock systems and demand payment. The objective is operational disruption and, in some cases, physical consequences. An operator watching a falsified display while physical equipment operates outside safe parameters is the intended outcome.

## Why this matters beyond the named sectors

Public discussion of these attacks centers on water utilities and energy providers, which are the confirmed targets. The exposure, however, is not limited to those sectors. Any industrial facility running internet-connected PLCs, SCADA systems, or HMI terminals for production automation, environmental monitoring, or process control carries a version of the same risk.

The entry point in these attacks is internet-accessible industrial control equipment. This is more common than facility managers recognize. Remote access capabilities added during COVID-era staffing reductions often remain in place with weak or default credentials. Legacy control systems were not designed with network security in mind and are frequently deployed on flat networks with direct internet routing. The PLC that runs a packaging line, a chemical dosing system, or a conveyor was engineered for reliability and uptime. Network security was an afterthought, if it was considered at all.

> "Affected sectors include government services, local municipalities, water and wastewater systems, and energy sectors. Attackers manipulated project files and altered data displayed on HMI and SCADA systems, causing operational disruptions."
> 
> FBI, CISA, NSA joint advisory - April 7, 2026

## What a layered defense actually looks like

Securing an OT environment is not a software problem with a software solution. It requires physical and network controls working together at each layer.

Network segmentation is the first and most critical control. OT networks, including PLCs, SCADA servers, and HMI terminals, need to be isolated from IT networks and from direct internet access through VLAN architecture and properly configured firewalls. An attacker who cannot reach a PLC from the internet cannot compromise it remotely. This is achievable without replacing control equipment and without disrupting production. OSI designs and installs network infrastructure specifically for industrial environments, including VLAN segmentation that physically and logically separates control networks from general business traffic.

Physical access control is the second layer. Restricting who can physically reach a PLC cabinet, server room, or control terminal closes the path for insider threats and on-site intrusion. Card readers, keypad entry systems, and credential management integrated with your camera system create a documented record of who accessed which areas and when. In a post-incident investigation, that record is the difference between a resolved incident and an unresolved one.

Camera coverage of critical control areas is the third layer. Cameras positioned at control room access points, server room entries, and PLC panel locations create a continuous record that supports incident investigation and policy enforcement. AI-powered video analytics can detect and flag unauthorized access attempts in real time, not after the fact when the damage is done.

## The local response advantage

When a control system shows anomalous behavior, the window for intervention is short. National vendors and remote-only security providers cannot respond to a physical access incident or an on-site configuration issue with the speed that a local team can. OSI is based in Oxford, Alabama. Facilities in Northeast Alabama can have a qualified technician on-site the same day for physical inspections, network changes, and system assessments.

If your facility runs PLCs, SCADA, or HMI systems and has not reviewed OT network segmentation and physical access controls recently, that review is worth scheduling before an incident forces it. OSI offers a complimentary facility walkthrough covering camera coverage gaps, access control posture, and network architecture. We will give you a straight answer about where the exposure is. Reach us at [www.overwatchsi.com/contact](https://www.overwatchsi.com/#contact), sales@overwatchsi.com, or (256) 240-0681.
