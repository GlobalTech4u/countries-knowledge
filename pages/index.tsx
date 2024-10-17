import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import { GET_COUNTRIES } from "../queries/getCountries";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";

interface Country {
  code: string;
  name: string;
  capital: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
}

const Home = () => {
  const { loading, error, data } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid container spacing={3}>
      {loading && (
        <div className="spinner-wrapper">
          <CircularProgress className="spinner" />
        </div>
      )}
      {!loading &&
        data?.countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.code}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                alt={`${country.name} flag`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {country.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Capital: {country.capital}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Continent: {country.continent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Languages:{" "}
                  {country.languages.map((lang) => lang.name).join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

export default App;
