import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import COUNTRY_CODES from "@/constants/country-codes.json";
import CURRENCY_CODES from "@/constants/currency-codes.json";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/queries/getCountries";
import { NO_COUNTRY_FOUND } from "@/constants/common.constants";
import { Country } from "@/types/country.types";
import CountryCard from "@/components/country_card/CountryCard";

const Countries = () => {
  const [filter, setFilter] = useState<{
    code?: string;
    currency?: string;
  }>({
    code: "select",
    currency: "select",
  });
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

  const handleFilterChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    fetchCountries({
      variables: {
        filter: {
          code:
            filter.code && filter.code !== "select"
              ? { regex: filter.code }
              : undefined,
          currency:
            filter.currency && filter.currency !== "select"
              ? { regex: filter.currency }
              : undefined,
        },
      },
    });
  };

  const handleClearFilters = () => {
    setFilter({ code: "select", currency: "select" });
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
    <div className="countries-container">
      <div className="filters-container">
        <Select
          className="filter-select-field"
          id="select-code"
          value={filter?.code}
          label="Country Code"
          name="code"
          onChange={handleFilterChange}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem
            className="options"
            disabled
            key={"select-code-option"}
            value={"select"}
          >
            Select
          </MenuItem>
          {COUNTRY_CODES?.map((code, index) => (
            <MenuItem className="options" value={code} key={`${index}-${code}`}>
              {code}
            </MenuItem>
          ))}
        </Select>
        <Select
          className="filter-select-field"
          id="select-currency"
          value={filter?.currency}
          label="Country currency"
          name="currency"
          onChange={handleFilterChange}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem
            className="options"
            disabled
            key={"select-currency-option"}
            value={"select"}
          >
            Select
          </MenuItem>
          {CURRENCY_CODES?.map((code, index) => (
            <MenuItem className="options" value={code} key={`${index}-${code}`}>
              {code}
            </MenuItem>
          ))}
        </Select>
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
              <CountryCard country={country} />
            </Grid>
          ))
        )}
        {!loading && !lazyLoading && filteredCountries?.length <= 0 && (
          <div className="no-country-found-error">
            <span>{NO_COUNTRY_FOUND}</span>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Countries;
