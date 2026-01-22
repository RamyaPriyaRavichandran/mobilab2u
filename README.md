[![M2U Dev Build](https://github.com/Santheepkumar/mobilab2u/actions/workflows/dev-build.yml/badge.svg?branch=develop)](https://github.com/Santheepkumar/mobilab2u/actions/workflows/dev-build.yml)

# Mobilab2u Documentation

## Overview

This project consists of a backend built with Fastify and MongoDB, and a frontend built with Next.js. The backend code is located in the `m2u-server` folder, while the frontend code is located in the `m2u-ui` folder.

## Table of Contents

- [Mobilab2u Documentation](#mobilab2u-documentation)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Backend](#backend)
    - [Technologies (Backend)](#technologies-backend)
    - [Setup (Backend)](#setup-backend)
    - [Running the Server](#running-the-server)
  - [Frontend](#frontend)
    - [Technologies (Frontend)](#technologies-frontend)
    - [Setup (Frontend)](#setup-frontend)
    - [Running the Application](#running-the-application)
  - [Environment Variables](#environment-variables)
  - [Changelog](#changelog)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Santheepkumar/mobilab2u.git
    cd mobilab2u
    ```

## Backend

### Technologies (Backend)

- Fastify
- MongoDB
- Mongoose

### Setup (Backend)

1. Navigate to the `m2u-server` folder:
    ```bash
    cd m2u-server
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Server

1. Make sure MongoDB is running.
2. Start the Fastify server:
    ```bash
    pnpm start
    ```

## Frontend

### Technologies (Frontend)

- Next.js 15 RC
- SWR (for data fetching)
- TailwindCSS (for styling)

### Setup (Frontend)

1. Navigate to the `m2u-ui` folder:
    ```bash
    cd m2u-ui
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Application

1. Start the Next.js application:
    ```bash
    pnpm run dev
    ```

## Environment Variables

Make sure to set up the following environment variables:

- Backend (`m2u-server/.env.example`):

- Frontend (`m2u-ui/.env.example`):

## Changelog

Please read [CHANGELOG.md](CHANGELOG.md) for details on our release changes.
