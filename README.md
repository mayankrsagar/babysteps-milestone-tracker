Here's your polished `README.md` for submission:

---

````markdown
# 🍼 BabySteps Milestone Tracker & Community Tips

This project is a fullstack implementation of the **"Milestone Tracker & Community Tips"** feature module for the BabySteps platform — a modern, inclusive parenting companion that supports users from preconception through pregnancy and postpartum.

## 🔧 Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | Next.js (App Router), Tailwind CSS |
| Backend     | Express.js, MongoDB (Mongoose) |
| Auth        | JWT (mocked for demo) |
| Deployment  | Local (Docker-ready in future) |

---

## ✨ Features

- ✅ **User Authentication** (Login/Signup - mocked with JWT)
- ✅ **Milestone CRUD** (Add, View, Edit, Delete)
- ✅ **Timeline View** with category tagging (Pregnancy, Preconception)
- ✅ **Community Tips** (View and contribute tips for each milestone)
- ✅ **Personalized Recommendations** based on pregnancy week
- ✅ **Responsive & Accessible** UI for mobile and desktop

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/mayankrsagar/babysteps-milestone-tracker.git
   cd babysteps-milestone-tracker
````

2. **Run the backend**

   ```bash
   cd backend
   npm install
   npm run start
   ```

3. **Run the frontend**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Visit **[http://localhost:3000](http://localhost:3000)**

---

## 🌈 Personalization & Inclusivity

We aimed to reflect BabySteps' core values in both the UX and functionality:

### 🎯 Personalization:

* Based on the pregnancy week entered or inferred, users receive **tailored health guidance**.
* Milestones are categorized and time-stamped to build a **personal journey timeline**.
* Personalized callouts encourage **timely actions** (e.g., "Schedule your next prenatal checkup").

### 🤝 Inclusivity:

* Categories include **Preconception, Pregnancy, and Postpartum** — acknowledging all stages of the parenting journey.
* **Gender-neutral and empathetic language** is used throughout the app.
* UI components follow **accessibility guidelines** (color contrast, labels, keyboard navigation).
* Built with **responsive design** to ensure access on all devices.

---

## 📁 Project Structure

```
/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── page.js
└── README.md
```

---

## 📜 License

This project is licensed under the MIT License.


