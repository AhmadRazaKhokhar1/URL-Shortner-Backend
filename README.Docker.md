# 🌐 URL Shortener Backend

A production-grade backend system for URL shortening, passwordless authentication, and more — built with **TypeScript**, **Express**, **GraphQL**, **Redis**, **Docker**, and **Bull Queue**. Developed and maintained by [Ahmad Raza Khokhar](https://www.linkedin.com/in/ahmad-raza-khokhar/), this project is perfect for developers looking to master backend architecture in real-world applications.

![Stars](https://img.shields.io/github/stars/AhmadRazaKhokhar1/url-shortner-backend?style=social)
![Forks](https://img.shields.io/github/forks/AhmadRazaKhokhar1/url-shortner-backend?style=social)

---

## 🚀 Why Star This Repo?

This is more than just a URL shortener — it's a full-fledged backend boilerplate that helps you:

- ✅ Gain hands-on experience with scalable architecture
- 🔐 Learn **passwordless authentication** using **OTP**
- 🔄 Work with **queues and job scheduling** using **Bull**
- 📬 Send real-time emails with **Nodemailer + Redis Queue**
- 🧠 Master **GraphQL** with real-life resolver patterns
- 🐳 Use **Docker** to containerize your services
- 🎓 Prepare for **real-world backend development roles**

---

## 🛠 Tech Stack

- **Express.js** – Web framework for API development
- **TypeScript** – Strong typing for scalable codebases
- **GraphQL** – Flexible API querying
- **Redis** – In-memory store for caching and OTP storage
- **Bull Queue** – Background jobs & task processing
- **Nodemailer** – Send OTPs and transactional emails
- **Docker** – Seamless environment setup
- **ts-node** – Run TypeScript directly

---

## 📦 Features

- ✂️ **Shorten long URLs** into unique, permanent short links
- 📬 **Passwordless Auth** – Users log in via OTP sent to their email
- 📮 **Queued Emails** – OTPs sent using Bull Queue + Redis + Nodemailer
- 📊 **GraphQL API** – Query and mutate data with precise control
- 🧪 **Modular Codebase** – Scalable, maintainable project structure
- 🐳 **Dockerized Setup** – Run locally with one command

---

## 🧠 Ideal For

This repository is a great learning platform for:

- Backend developers who want to upgrade their Node.js skills
- Devs preparing for interviews or real-world system design
- Beginners looking to build & deploy full-stack systems
- Open-source enthusiasts who want to contribute and grow

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AhmadRazaKhokhar1/url-shortner-backend.git
cd url-shortner-backend
```
### 1. Run you backend and enjoy!
```bash
docker compose up --build --watch
```