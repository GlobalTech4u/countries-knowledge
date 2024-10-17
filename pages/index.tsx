import { ApolloProvider, useQuery, useLazyQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import { GET_COUNTRIES } from "../queries/getCountries";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { NO_COUNTRY_FOUND } from "@/constants/common.constants";

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
  phone: string;
  currency: string;
}

const Home = () => {
  const [filter, setFilter] = useState<{
    code?: string;
    currency?: string;
  }>({});
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const { loading, error, data } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES
  );
  const [
    fetchCountries,
    { loading: lazyLoading, error: lazyError, data: lazyData },
  ] = useLazyQuery<{ countries: Country[] }>(GET_COUNTRIES);

  useEffect(() => {
    if (data) {
      setFilteredCountries(data.countries);
    }
  }, [data]);

  useEffect(() => {
    if (lazyData) {
      setFilteredCountries(lazyData.countries);
    }
  }, [lazyData]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    fetchCountries({
      variables: {
        filter: {
          code: filter.code ? { regex: filter.code } : undefined,
          currency: filter.currency ? { regex: filter.currency } : undefined,
        },
      },
    });
  };

  const handleClearFilters = () => {
    setFilter({ code: "", currency: "" });
    fetchCountries({
      variables: {
        filter: {
          code: undefined,
          currency: undefined,
        },
      },
    });
  };

  if (error || lazyError) {
    return (
      <div className="error-wrapper">
        Error: {error?.message || lazyError?.message}
      </div>
    );
  }

  return (
    <div>
      <div className="filters-container">
        <TextField
          label="Country Code"
          name="code"
          onChange={handleFilterChange}
          className="filter-text-field"
          value={filter?.code}
        />
        <TextField
          label="Currency"
          name="currency"
          onChange={handleFilterChange}
          className="filter-text-field"
          value={filter?.currency}
        />
        <Button
          className="filter-button"
          variant="contained"
          onClick={handleFilterSubmit}
        >
          Filter
        </Button>
        <Button
          className="filter-button"
          variant="contained"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
      <Grid container spacing={3}>
        {loading || lazyLoading ? (
          <div className="spinner-wrapper">
            <CircularProgress className="spinner" />
          </div>
        ) : (
          filteredCountries.map((country) => (
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
                    Code: {country.code}
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
                  <Typography variant="body2" color="text.secondary">
                    Phone: {country.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Currency: {country.currency}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
        {filteredCountries?.length <= 0 && (
          <div className="no-country-found-error">
            <span>{NO_COUNTRY_FOUND}</span>
          </div>
        )}
      </Grid>
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

export default App;
