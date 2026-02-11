# Building Smart Glasses to Empower Independence

date: February 1, 2024
slug: ar-glasses
status: Public
tags: Neuroscience, Tech
summary: After being mesmerized by https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/'s $329 smart glasses, I knew I had to see what I could do with accessible components and a patient-first mindset.
type: Post
thumbnail: smart_glasses_(1).png
updatedAt: August 11, 2025 8:38 PM
category: ⚙️ Product

<aside>
📄 After being mesmerized by [Meta](https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/)'s $329 smart glasses, I knew I had to see what I could do with accessible components. Here's my interpretation (in real time) that incorporates a cheap webcam, a pair of dollar store glasses, and some legos. Granted it can run on something like a raspberry pi zero once its all fleshed out.

</aside>

<aside>
🌟 Check out the [LinkedIn post](https://www.linkedin.com/feed/update/urn:li:activity:7146319606226329600/) and the pitch below!

</aside>

[A basic overview of the initial proof of concept after a few days of tinkering.](https://youtu.be/foMOTNIz51g)

A basic overview of the initial proof of concept after a few days of tinkering.

[[https://docs.google.com/presentation/d/1_xUhFjE61mDi1vMg8PmpurIAmXqOkSE_ykhtHB_Ekls/edit?usp=sharing](https://docs.google.com/presentation/d/1_xUhFjE61mDi1vMg8PmpurIAmXqOkSE_ykhtHB_Ekls/edit?usp=sharing)](https://docs.google.com/presentation/d/1_xUhFjE61mDi1vMg8PmpurIAmXqOkSE_ykhtHB_Ekls/preview?usp=sharing)

## 🚀 Future Forward

However, instead of a general AI implementation, I hope to hyperfocus a model on things such as prescription bottles. For instance, if an older person is using them, they can see what medication to take without having to remember or ask for help. Not to mention, they can utilize AI assistance during routine tasks—easing the load on those they depend on. I still have plans to work on a fleshed out project with robust software, a seamless 3d printed enclosure, and integrated wiring. This will require some time and help from industry professionals who I hope to reach out to!

![Early prototype of the front plate (Jan ‘24)](Building%20Smart%20Glasses%20to%20Empower%20Independence/Group_3_(1).png)

Early prototype of the front plate (Jan ‘24)

## 🧰 What You’ll Need

- [Mini-camera/laptop webcam](https://www.amazon.com/dp/B0BWS4R1BH?ref=ppx_yo2ov_dt_b_product_details&th=1) ~$10-$30 (depends on megapixel count, quality, etc.)
- Some sort of glasses that can be used to mount (can be rigged on via LEGO) the camera
- AI libraries (e.g. [https://huggingface.co/Salesforce/blip-image-captioning-large](https://huggingface.co/Salesforce/blip-image-captioning-large), custom GPT, etc.)
- Computer to run Python (currently using a MacBook for iterative work, but uploading to a Raspberry Pi Zero would be ideal)
- Optional: Battery Pack, 3d Printed Enclosure, etc.