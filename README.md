Here's a README.md file for your Next.js project that fetches data from the Countries GraphQL API using Apollo Client:

# Countries Knowledge App

This is a simple Next.js application that fetches data from a public GraphQL API for countries using Apollo Client. The data is displayed using Material-UI (MUI) Card components, and the application includes filter functionality to search for countries by code, and currency.

## Features

• Fetches country data from a public GraphQL API.

• Displays country information in a well-designed MUI Card component.

• Filter functionality to search for countries by code and currency.

• Uses TypeScript for type safety.

## Technologies Used

• [Next.js](https://nextjs.org/)

• [Apollo Client](https://www.apollographql.com/docs/react/)

• [GraphQL](https://graphql.org/)

• [Material-UI (MUI)](https://mui.com/)

• [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

• Node.js (>= 12.x)

• npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/GlobalTech4u/countries-knowledge.git
cd countries-knowledge

1.
Install the dependencies:

npm install
# or
yarn install

1.
Create a .env.local file in the root of your project and add the GraphQL API URL:

NEXT_PUBLIC_GRAPHQL_API_URL=https://countries.trevorblades.com/

Running the Application
To run the application in development mode:

npm run dev
# or
yarn dev

Open http://localhost:3000 with your browser to see the result.

Building for Production
To build the application for production:

npm run build
# or
yarn build

To start the production server:

npm run start
# or
yarn start

Project Structure
•  lib/apolloClient.ts: Configures Apollo Client.

•  queries/getCountries.ts: Defines the GraphQL query to fetch country data.

•  pages/index.tsx: Main page that fetches and displays country data using MUI Card components.

Public GraphQL API
This project uses the Countries GraphQL API to fetch data about countries. The API provides information such as country code, name, capital, continent, languages, phone code, and currency.
Public GraphQL API used to fetch data in this project is https://countries.trevorblades.com/

Acknowledgements
•  Next.js

•  Apollo Client

•  GraphQL

•  Material-UI (MUI)

•  Countries GraphQL API

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

Contact
For any questions or feedback, please contact shubham.saxena@mindfiresolutions.com
```
