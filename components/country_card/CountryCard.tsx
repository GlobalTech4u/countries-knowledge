import { Card, CardContent, CardMedia } from "@mui/material";

import { Country } from "@/types/country.types";
import { COUNTRY_CARD_LABELS } from "@/constants/label.constants";

const CountryCard = (props: { country: Country }) => {
  const { country } = props;

  const countryImage = `${
    process?.env?.NEXT_PUBLIC_COUNTRY_FLAG_URL
  }${country.code.toLowerCase()}.png`;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={countryImage}
        alt={`${country.name} flag`}
      />
      <CardContent className="card-content">
        <span className="country-name">{country.name}</span>
        <div className="country-details-container">
          <div className="country-details">
            <span className="country-details-label">
              {COUNTRY_CARD_LABELS.CODE} :
            </span>
            <span className="country-details-value">{country.code}</span>
          </div>
          <div className="country-details">
            <span className="country-details-label">
              {COUNTRY_CARD_LABELS.CAPITAL} :
            </span>
            <span className="country-details-value">{country.capital}</span>
          </div>
          <div className="country-details">
            <span className="country-details-label">
              {COUNTRY_CARD_LABELS.CONTINENT} :
            </span>
            <span className="country-details-value">
              {country.continent.name}
            </span>
          </div>
          <div className="country-details">
            <span className="country-details-label">
              {COUNTRY_CARD_LABELS.LANGUAGES} :
            </span>
            <span className="country-details-value">
              {country.languages.map((lang) => lang.name).join(", ")}
            </span>
          </div>
          <div className="country-details">
            <span className="country-details-label">
              {COUNTRY_CARD_LABELS.PHONE} :
            </span>
            <span className="country-details-value">{country.phone}</span>
          </div>
          <div className="country-details">
            <span className="country-details-label">
              {COUNTRY_CARD_LABELS.CURRENCY} :
            </span>
            <span className="country-details-value">{country.currency}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
