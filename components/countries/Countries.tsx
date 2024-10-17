import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";

import COUNTRY_CODES from "@/constants/country-codes.json";
import CURRENCY_CODES from "@/constants/currency-codes.json";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/queries/getCountries";
import { NO_COUNTRY_FOUND } from "@/constants/common.constants";
import { Country } from "@/types/country.types";
import CountryCard from "@/components/country_card/CountryCard";
import {
  BUTTON_LABELS,
  COUNTRY_CODE_FILTER_LABEL,
  COUNTRY_CURRENCY_FILTER_LABEL,
} from "@/constants/label.constants";

const OPTIONS_INLINE_STYLES = {
  fontFamily: `"Roboto", "Ubuntu", "sans-serif"`,
  fontSize: "18px",
  fontWeight: "500",
  color: "#535353",
};

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
        <FormControl className="filter-select-field">
          <InputLabel id="select-code-label">
            {COUNTRY_CODE_FILTER_LABEL}
          </InputLabel>
          <Select
            labelId="select-code-label"
            id="select-code"
            label={COUNTRY_CODE_FILTER_LABEL}
            name="code"
            value={filter?.code}
            onChange={handleFilterChange}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            <MenuItem
              key="select-code-option"
              value="select"
              sx={OPTIONS_INLINE_STYLES}
            >
              Select
            </MenuItem>
            {COUNTRY_CODES?.map((code, index) => (
              <MenuItem
                value={code}
                key={`${index}-${code}`}
                sx={OPTIONS_INLINE_STYLES}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="filter-select-field">
          <InputLabel id="select-currency-label">
            {COUNTRY_CURRENCY_FILTER_LABEL}
          </InputLabel>
          <Select
            labelId="select-currency-label"
            id="select-currency"
            label={COUNTRY_CURRENCY_FILTER_LABEL}
            name="currency"
            value={filter?.currency}
            onChange={handleFilterChange}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            <MenuItem
              key="select-currency-option"
              value="select"
              sx={OPTIONS_INLINE_STYLES}
            >
              Select
            </MenuItem>
            {CURRENCY_CODES?.map((code, index) => (
              <MenuItem
                value={code}
                key={`${index}-${code}`}
                sx={OPTIONS_INLINE_STYLES}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className="filter-button"
          variant="contained"
          onClick={handleFilterSubmit}
        >
          {BUTTON_LABELS.FILTER}
        </Button>
        <Button
          className="filter-button"
          variant="contained"
          onClick={handleClearFilters}
        >
          {BUTTON_LABELS.CLEAR_FILTERS}
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
