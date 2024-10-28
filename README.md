# OfficeOasis frontend

**Version:** 0.0.1

OfficeOasis is project designed to provide a seamless and dynamic user experience for office management tools. With a modern UI and server-side rendering capabilities, OfficeOasis offers fast load times and efficient interactions. The application is enhanced with a range of UI and data visualization components, and uses a custom favicon to give it a distinctive look.

## 🚀 Technologies Used

### Frontend
OfficeOasis leverages **Angular** (version 16), a popular frontend framework that enables a modular, responsive design.

- **@angular/core** - Core Angular library for components and services.
- **@angular/router** - Used for managing in-app navigation and routing.
- **@angular/forms** - Supports reactive and template-driven forms.

### UI Components
For a sleek and functional user interface, OfficeOasis incorporates the following libraries:

- **@angular/material** - Provides a suite of customizable UI components.
- **@angular/cdk** - Offers advanced UI tools to enhance accessibility and interactivity.
- **@abacritt/angularx-social-login** - Enables social login integration.

### Server-Side Rendering
OfficeOasis supports server-side rendering (SSR) for faster load times and improved SEO, utilizing:

- **@nguniversal/express-engine** - Integrates Angular with Express.js for SSR.
- **Express.js** - Handles the server-side aspect of the application.

### Charting & Data Visualization
For representing data interactively:

- **ng-apexcharts** - A powerful library for creating dynamic and responsive charts.

### Styling and Icons
- **Bootstrap** - Used to create responsive and mobile-first designs.
- **favicon** - Provides a custom icon for the project, making it easily recognizable in browser tabs.

### Animations & Alerts
- **@angular/animations** - Used to implement smooth animations and transitions.
- **sweetalert2 & @sweetalert2/ngx-sweetalert2** - For creating interactive alerts and notifications.

### State Management & Utilities
- **rxjs** - Handles reactivity and data streams.
- **zone.js** - Manages zones for efficient change detection in Angular.

### Development Tools
- **Karma and Jasmine** - Used for unit and integration testing.
- **TypeScript** - Ensures type safety and more maintainable code.

## 🌐 Deployment

The application can be deployed on Firebase, a platform that provides fast and scalable hosting for web applications.

## 🛠️ Getting Started

To get started with OfficeOasis locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Angular CLI](https://angular.io/cli) (install using `npm install -g @angular/cli`)
- [Firebase CLI](https://firebase.google.com/docs/cli) (optional, for deployment)

### Clone the Repository

1. Open your terminal.
2. Clone the repository using the command:

   ```bash
   git clone https://github.com/DiegoFCJ/E-commerce.git
   ```

3. Navigate into the project directory:

   ```bash
   cd E-commerce
   ```
   
### Switch to the Development Branch

Switch to the front-dev branch:

   ```bash
   git checkout front-dev
   ```

### Install Dependencies
Run the following command to install the required dependencies:

   ```bash
   npm install
   ```
   
### Run the Application Locally
To start the application locally, use the following command:

   ```bash
   ng serve
   ```
   
The application will be accessible at http://localhost:4200/.

### Run the Server-Side Rendered Version
To start the SSR version locally, run:

   ```bash
   npm run dev:ssr
   ```
   
The SSR application will be accessible at http://localhost:4200/.
