# 📌 Angular Project – Udemy Course

This project is built as part of the Udemy course **"The Complete Guide to Angular"**. It covers core Angular concepts, including components, directives, services, routing, forms, HTTP communication, authentication, and deployment.

## 🚀 Features

✅ **Component-based architecture**  
✅ **Custom directives & pipes**  
✅ **Reactive & template-driven forms**  
✅ **Service-based data sharing**  
✅ **HTTP requests with REST APIs**  
✅ **Authentication & Route Guards**  
✅ **Lazy Loading & Performance Optimization**  
✅ **Deployment-ready setup**  

## 📂 Project Structure

```
/src
│-- app/                  # Main Angular app files
│   │-- components/        # UI components
│   │-- services/          # Injectable services
│   │-- models/            # Data models
│   │-- pipes/             # Custom Angular pipes
│   │-- directives/        # Custom directives
│   │-- app-routing.module.ts  # App routing configuration
│   │-- app.module.ts      # Root module
│-- assets/                # Static assets
│-- environments/          # Environment-specific settings
│-- index.html             # Main HTML file
│-- main.ts                # Entry point for Angular app
│-- styles.css             # Global styles
```

## 🛠️ Installation & Setup

1️⃣ **Clone the Repository**  
```sh
git clone <repository-url>
cd <project-folder>
```

2️⃣ **Install Dependencies**  
```sh
npm install
```

3️⃣ **Run the Development Server**  
```sh
ng serve
```
Visit `http://localhost:4200/` in your browser.

4️⃣ **Build for Production**  
```sh
ng build --prod
```

## 🔑 Authentication (If Applicable)

- Uses Firebase Authentication / JWT-based authentication.
- Protects routes using **Route Guards**.
- Stores authentication tokens securely in LocalStorage or SessionStorage.

## 🔗 API Integration

- Uses Angular's **HttpClient** to fetch data from REST APIs.
- Handles HTTP requests efficiently with **interceptors**.
- Implements error handling and retry mechanisms.

## 🚀 Deployment

1. **To Firebase:**  
   ```sh
   ng build --prod
   firebase deploy
   ```
2. **To GitHub Pages:**  
   ```sh
   ng deploy --base-href=/your-repo-name/
   ```
3. **To a Custom Server:**  
   Upload the `/dist` folder to your web server.

## 📖 Learnings & Takeaways

- Deep understanding of **Angular CLI**, TypeScript, and project structure.
- Hands-on experience with **component-based development**.
- Mastery of **Angular services, pipes, directives, and forms**.
- Practical knowledge of **API communication and authentication**.
- Deployment skills for real-world applications.

## 🤝 Contribution

Feel free to fork and improve this project. If you have any ideas or issues, create a pull request or open an issue.

---

🎯 *This project is a learning exercise based on the Udemy course, but it can be extended into a full-fledged Angular application!* 🚀