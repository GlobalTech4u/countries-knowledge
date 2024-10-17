import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

import Countries from "@/components/countries/Countries";

const App = () => (
  <ApolloProvider client={client}>
    <Countries />
  </ApolloProvider>
);

export default App;
