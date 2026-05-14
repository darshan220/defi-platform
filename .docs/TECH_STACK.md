# Technology Stack

This document outlines the core technologies used to build the Equivo DeFi Trading Platform and the rationale behind choosing them.

## Core Framework
- **Next.js (App Router)**: We use Next.js as our foundational framework. It provides robust routing, server-side rendering (SSR), and static site generation (SSG) out of the box, leading to optimal performance and SEO. The App Router paradigm allows for nested layouts and efficient data fetching.
- **React**: The industry standard for building interactive user interfaces. React's component-based architecture enables us to build reusable, encapsulated UI elements, making the codebase scalable and maintainable.
- **TypeScript**: Used throughout the application to enforce type safety. TypeScript catches errors at compile-time rather than runtime, significantly improving code quality, developer productivity, and system reliability, especially critical for financial applications.

## Styling & UI Design
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development directly within JSX. We chose Tailwind for its performance (purging unused CSS) and its ability to easily construct a customized, theme-aware design system (using CSS variables for dark/light modes).
- **Framer Motion**: A production-ready motion library for React. We utilize Framer Motion to implement smooth, performant micro-interactions, page transitions, and complex animations (like our "glassmorphic" panel layouts) that elevate the user experience to a premium level.
- **Lucide React**: A beautiful, consistent icon library that integrates seamlessly with React and Tailwind CSS.
- **shadcn/ui (Architecture Inspiration)**: While we build custom components, the modular, accessible component architecture inspired by shadcn/ui ensures our UI elements are robust and accessible.

## Web3 & Connectivity
- **Custom Wallet Integration**: We implemented a robust, multi-tier wallet connection architecture supporting various browser extensions (MetaMask, Phantom, OKX) and WalletConnect. This custom approach allows us tight control over the connection flow, error handling, and UI state synchronization.

## State Management
- **React Hooks (useState, useEffect, useContext)**: For local component state and global theme/wallet state, we rely on standard React hooks, keeping dependencies lightweight and performant.

## Rationale Summary
Our tech stack was carefully selected to prioritize **Performance**, **Security** (via strong typing), and **User Experience** (via modern animations and styling). Next.js provides the solid backend/SSR foundation, while Tailwind + Framer Motion delivers the premium, responsive frontend our users expect.
