import { config, taxonomy } from './data.yml';
import imageSidebar from './images/montrouge.png';

export const mapMaxBounds = config.map.maxBounds;
export const mapCenter = config.map.center;
export const mapZoom = config.map.zoom;
export const mapName = config.name;
export const mapStyles = config.map.styles;

export const mapillaryUsers = config.mapillary.users;
export const mapillaryClientId = config.mapillary.clientId;

Object.keys(taxonomy).forEach((key) => {
  Object.keys(taxonomy[key].features).forEach((keyFeature) => {
    taxonomy[key].features[keyFeature].selected = false;
  });
});

export { taxonomy, imageSidebar };
