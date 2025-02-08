# Domain Search App

A modern Next.js application that allows users to search for domain information using the Twilight Cyber API.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Secure Server-Side Proxy:**  
  All API requests are handled by Next.js server routes, ensuring that your API key remains confidential.

- **Modern User Interface:**  
  Built with Tailwind CSS for a clean, responsive design.

- **Efficient Data Fetching:**  
  Utilizes SWR for fast and reliable client-side data fetching with caching and revalidation.

- **Robust Error Handling:**  
  Graceful error handling without exposing sensitive internal details.

## Technologies

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [SWR](https://swr.vercel.app/) for data fetching
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IDSAD-XL/olivesystem-test.git
   cd olivesystem-test
    ```
2. **Install dependencies:**  
   ```bash
   bun i
   ```
3. **Set up environment variables:**  
   Create a `.env.local` file in the root directory and add the following:

   ```bash
   NEXT_PUBLIC_API_KEY=your_api_key_here
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```
   
    Replace `your_api_key_here` with your Twilight Cyber API key and `https://api.example.com` with the base URL of the API.

### Usage

1. **Run the development server:**

   ```bash
   bun dev
   ```
   
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

2. **Build the app for production:**

   ```bash
   bun build
   ```
   
    The optimized production build will be created in the `build` directory.

3. **Run the production build:**

   ```bash
   bun start
   ```
   
    The app will be served at [http://localhost:3000](http://localhost:3000).

