# What’s in my Homelab?

date: January 15, 2024
slug: homelab
status: Public
tags: Tech
summary: Ever since quarantine began, I’ve been fascinated with the ins and outs of networking, servers, and containerization. Here’s what’s in it…
type: Post
thumbnail: Group_13.png
updatedAt: August 12, 2025 1:44 AM
category: 📗 Doc

<aside>
📄 Computers are a lot like brains; networks are a lot like the pulsating rhythm behind our thoughts. Here’s a quick overview of what I’ve deployed in my homelab and have been using to develop (hopefully) cool little projects.

</aside>

## 🌐 Networking

The so-called heart of the network where all the wiring is redirected and redistributed. There’s also the network video recorder where the security footage is stored locally—**yes, no subscriptions like Ring or whatever else**. A rack based approach keeps things neat and organized as each appliance slots into a the standardized “U” form factor. Granted the current rack is not nearly deep enough for the NVR, prompting this “innovative” mounting approach!

![This wall mounted rack houses all of the key components of a network and then some.](What%E2%80%99s%20in%20my%20Homelab/Group_1_(3).png)

This wall mounted rack houses all of the key components of a network and then some.

Building a solid wireless network keeps everyone happy. Naturally, I went with MikroTik and Unifi—these brands are robust and relatively affordable. You could also go with TP Link or something secondhand from Cisco, Ruckus, etc. if you feel confident with even more fiddling. Right now, there’s a mix of Wi-Fi 6 and 5 APs linked up with an assortment of CAT 5e and 6 cabling (plus fiber for the outside). Although the Wi-Fi 6e or even 7 gen standard is here along with CAT 6A, there’s no need as of now with the symmetrical gig connection. 

![Unifi Network topology for Wi-Fi Clients (~50 Devices)](What%E2%80%99s%20in%20my%20Homelab/Untitled.png)

Unifi Network topology for Wi-Fi Clients (~50 Devices)

![The backyard is equipped with Wi-Fi for get togethers and future projects (e.g. AI bird feeder)](What%E2%80%99s%20in%20my%20Homelab/Group_5.png)

The backyard is equipped with Wi-Fi for get togethers and future projects (e.g. AI bird feeder)

## 🖥️ Compute

As for the compute, I went with the whole nine yards: i5-12600k CPU (robust integrated graphics for efficient hardware encoding), 32 GBs of DDR4 memory (not ECC but recommended for ZFS) , 2x16 TB (one for parity) of Seagate’s Exos HDDs, 500 GB of PCIe 4.0 cache, etc. On the software side, I stuck with UNRAID given its ease of use and flexibility. Although its not the fastest, I plan to make upgrades and updates as my requirements change.

![Left: A rigged on Noctua fan to bring down HDD temps to the ~40-50° Celsius range. Right: A view of the machine at work.](What%E2%80%99s%20in%20my%20Homelab/Group_3_(2).png)

Left: A rigged on Noctua fan to bring down HDD temps to the ~40-50° Celsius range. Right: A view of the machine at work.

![The main UNRAID dashboard for the brains of the operation.](What%E2%80%99s%20in%20my%20Homelab/Untitled%201.png)

The main UNRAID dashboard for the brains of the operation.

Plus, the brains of the operation hosts a few VMs and dockers for a myriad of smart home operations (even routing thanks to VMs and a cheap network card). Also, I used to host a Minecraft server for ~10 people at no external cost! Not to mention, I was able to add integrations within dockers to run all sorts of automations on Home Assistant: the doorbell sound is played through Sonos smart home speakers, for example.

![The insides of a Unifi NVR with a few modifications to bring down noise from the HDD and fans.](What%E2%80%99s%20in%20my%20Homelab/Group_4_(1).png)

The insides of a Unifi NVR with a few modifications to bring down noise from the HDD and fans.

<aside>
🛠️ Tinkering around with server hardware and software forced me to navigate novel areas like never before—**contributing to my curiosities in the AI space** as well. I endlessly scoured eBay and other sites to find the best deals to scrap together the optimal build to run AI models through Ollama and such.

</aside>