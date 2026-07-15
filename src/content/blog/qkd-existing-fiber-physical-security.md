---
title: "QKD on Your Existing Fiber: What IonQ's Latest Move Means for Physical Security"
description: "IonQ just launched a quantum key distribution system that runs on fiber you already have. Here is what that means for the cameras, access control, and networks securing your facility."
pubDate: 2026-06-26
category: "Industrial Security"
author: "Barry Fuller"
image: "https://i.ibb.co/MkK8xq7f/75b57e3c3d2f.png"
readingTime: 4
---
There is a statistic worth sitting with before you read the rest of this: 61 percent of security professionals say that "harvest now, decrypt later" is their top quantum-related concern. That means the majority of people paid to think about this problem believe someone is already archiving your encrypted traffic today, with plans to decrypt it once quantum computers are capable of doing so.

If that sounds abstract, think about what travels across your network on any given day. Camera feeds. Badge reads. Remote access sessions. VPN tunnels between sites. The encryption protecting all of it is RSA or ECC. Both are mathematically solvable by a sufficiently large quantum computer. The question is not whether quantum computers will get there. The question is when, and whether your data will still matter when they do.

## What IonQ Just Announced

On June 17, 2026, IonQ launched the Clavis XG Multiplex, a quantum key distribution system designed to run on existing metropolitan fiber networks without requiring dedicated infrastructure. That last phrase is the one that matters. Until now, QKD systems required their own fiber runs separate from data traffic. That meant significant installation cost and was effectively a non-starter for most facilities outside of government data centers and financial institutions.

The Clavis XG Multiplex sends QKD traffic alongside existing data on the same fiber, using wavelength multiplexing to keep them separate. It integrates with IonQ's Clarion KX platform, which handles post-quantum key exchange on the software side. The result is a layered approach: QKD protects key generation at the physics level, while post-quantum cryptography algorithms (the NIST-finalized FIPS 203 and 204 standards) protect the broader encryption stack.

Jordan Shapiro, IonQ's President of Quantum Platform, put it plainly: "Quantum security is moving beyond specialized network environments, making multiplexing a necessary feature for organizations operating critical infrastructure today."

## Why Physical Security Systems Are Directly in Scope

When most people hear "quantum encryption," they picture server rooms at the NSA. The reality is that physical security infrastructure runs on the same vulnerable protocols as everything else.

IP cameras use TLS to encrypt the feed between the camera and the video management system. Access control panels communicate over OSDP links that, in many installations, are running without encryption enabled at all. Network switches have management planes protected by SSH with RSA host keys. VPN tunnels to remote sites run IKEv1 or IKEv2 with RSA cipher suites. None of those are quantum-resistant today.

The harvest now, decrypt later threat is particularly relevant here. Video footage, access logs, and network traffic from a secure facility have long-term intelligence value. A nation-state actor does not need to decrypt your camera feeds today. They need to archive them now and wait. The data that matters most is exactly the data being collected by the systems you already have installed.

## What the Fiber News Actually Changes

The removal of the dedicated-fiber requirement is meaningful for any facility that already runs its security systems over a structured cabling plant. If your cameras, access control head-end, and NVR are on the same fiber backbone as your general data network, a QKD system like the Clavis XG Multiplex can run on that existing infrastructure. No new conduit. No fiber pulls. No construction project.

This does not mean the deployment is simple or cheap. QKD hardware still carries enterprise price tags, and the integration work requires someone who understands both the network architecture and the quantum layer. But the single biggest barrier to entry for most facilities has been removed.

## What OSI Is Doing About It

Our team has been tracking the post-quantum cryptography transition since NIST finalized the first standards in 2024. We added a quantum readiness section to our free security audit this year. It does not cost extra. It is part of what we document when we come on-site.

What we look at: which encryption algorithms are running on your cameras and access control systems, whether your firmware has a post-quantum upgrade path from the manufacturer, which vendor roadmaps are confirmed versus still pending, and whether your network management plane is using cipher suites that will survive the transition.

Most facilities we talk to have never thought about this. That is not a criticism. This conversation was not mainstream twelve months ago. It is now, and the IonQ announcement is part of why. When a major quantum hardware company launches a product designed specifically for existing enterprise fiber, the market has shifted from theoretical to commercial.

If you are in Northeast Alabama or the surrounding region and want to know where your systems stand, reach out. The audit is free, the assessment takes a few hours, and you will leave with a documented picture of your cryptographic exposure and a realistic path forward. Barry Fuller, Oxford, AL. (256) 240-0681. sales@overwatchsi.com.

*Source: [The Quantum Insider, June 17, 2026](https://thequantuminsider.com/2026/06/17/ionq-launches-clavis-xg-multiplex-for-quantum-key-distribution-on-existing-fiber-networks/)*
