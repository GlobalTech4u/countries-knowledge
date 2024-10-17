import { Card, CardContent, CardMedia } from "@mui/material";
import { Country } from "@/types/country.types";

const CountryCard = (props: { country: Country }) => {
  const { country } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
        alt={`${country.name} flag`}
      />
      <CardContent className="card-content">
        <span className="country-name">{country.name}</span>
        <div className="country-details-container">
          <div className="country-details">
            <span className="country-details-label">Code :</span>
            <span className="country-details-value">{country.code}</span>
          </div>
          <div className="country-details">
            <span className="country-details-label">Capital :</span>
            <span className="country-details-value">{country.capital}</span>
          </div>
          <div className="country-details">
            <span className="country-details-label">Continent :</span>
            <span className="country-details-value">
              {country.continent.name}
            </span>
          </div>
          <div className="country-details">
            <span className="country-details-label">Languages :</span>
            <span className="country-details-value">
              {country.languages.map((lang) => lang.name).join(", ")}
            </span>
          </div>
          <div className="country-details">
            <span className="country-details-label">Phone :</span>
            <span className="country-details-value">{country.phone}</span>
          </div>
          <div className="country-details">
            <span className="country-details-label">Currency :</span>
            <span className="country-details-value">{country.currency}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
