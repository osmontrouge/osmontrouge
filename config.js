import { config, taxonomy } from './data.yml';
import imageSidebar from './images/montrouge.jpg';

export const mapMaxBounds = config.map.maxBounds;
export const mapCenter = config.map.center;
export const mapZoom = config.map.zoom;
export const mapName = config.name;
export const mapDescription = config.description;
export const baseUrl = config.baseUrl;
export const mapStyles = config.map.styles;
export const links = config.links;

export const mapillaryUsers = config.mapillary.users;
export const mapillaryClientId = config.mapillary.clientId;
export const addok = config.addok;

Object.keys(taxonomy).forEach((key) => {
  Object.keys(taxonomy[key].features).forEach((keyFeature) => {
    taxonomy[key].features[keyFeature].selected = false;
  });
});

export { taxonomy, imageSidebar };
