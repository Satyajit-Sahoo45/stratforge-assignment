# SpaceX Info Web App

This is a **React** web application that displays SpaceX-related information fetched from the SpaceX API. It includes pages for **History**, **Launches**, and **Rockets**, with detailed information about each rocket, including images and technical specifications.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How to Run Locally](#how-to-run-locally)

## Tech Stack

### Frameworks and Libraries

- **React**: A JavaScript library for building user interfaces. React was chosen for its component-based architecture, which allows for modular, reusable components.
- **TypeScript**: TypeScript adds static typing, which helps catch potential bugs early in development, especially when working with complex API data structures like those from the SpaceX API.
- **Tailwind CSS**: A utility-first CSS framework used to build a responsive and visually appealing UI without the need to write custom CSS for every component.
- **Axios**: Used to make HTTP requests to the SpaceX API. It's lightweight, promise-based, and easy to integrate with React.
- **React Router**: Enables client-side routing in the app, allowing smooth navigation between pages like **History**, **Launches**, and **Rocket Details** without reloading the page.
- **Helmet (React Helmet Async)**: Used for setting and updating metadata dynamically in the document head, crucial for SEO and accessibility.

### Why These Choices?

- **React** is flexible and widely used for building dynamic, single-page applications. The component-based design makes it easy to manage and scale the project.
- **TypeScript** improves the maintainability and scalability of the application by providing static type checks and reducing runtime errors.
- **Tailwind CSS** enables quick prototyping and responsive designs without writing a lot of custom CSS.
- **React Router** helps in setting up dynamic routing and seamless navigation within the app.

## Project Structure

```bash
.
├── src
│   ├── components
│   │   ├── CrewSection.tsx        # Component to display crew info for launches
│   │   ├── ImageSlider.tsx        # A reusable image slider
│   │   ├── Navbar.tsx             # Navigation bar with menu links
│   │   └── RocketDetail.tsx       # Detailed view of a specific rocket
│   ├── pages
│   │   ├── HistoryPage.tsx        # Page displaying SpaceX historical events
│   │   ├── LaunchesPage.tsx       # Page for listing launches (Latest, past and upcoming)
│   │   ├── RocketsPage.tsx        # Page displaying SpaceX rockets
│   │   └── RocketDetailPage.tsx   # Dynamic page for displaying rocket details
│   ├── App.tsx                    # Main app component
```

## How to Run Locally

1. Clone the repo on you local

2. Install dependencies:

### `npm install`

3. Start the development server:

### `npm start`
