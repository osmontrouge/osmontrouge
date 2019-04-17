import taxonomy from './data.yml';
import imageSidebar from './images/montrouge.png';

export const mapMaxBounds = [[2.293611, 48.807344], [2.336998, 48.825486]];
export const mapCenter = [2.315111, 48.816614];
export const mapZoom = 15;
export const mapName = 'OSMontrouge';
export const mapStyles = [
  {
    title: 'Bright',
    uri: 'https://tiles.osmontrouge.fr/styles/bright/style.json',
  },
  {
    title: 'Liberty',
    uri: 'https://tiles.osmontrouge.fr/styles/liberty/style.json',
  }
];
export const mapillaryUsers = [
  'e_ZBE6mFd7CYNjRSpLl-Lg', // francois2
  'C4ENdWpJdFNf8CvnQd7NrQ', // phyks
  'XtzGKZX2_VIJRoiJ8IWRNQ'  // overflorian
];
export const mapillaryClientId = 'ZV9aQkU2bUZkN0NZTmpSU3BMbC1MZzo0YmYyNDRkMDFkYWE3YWQ3';

Object.keys(taxonomy).forEach((key) => {
  Object.keys(taxonomy[key].features).forEach((keyFeature) => {
    taxonomy[key].features[keyFeature].selected = false;
  });
});

export { taxonomy, imageSidebar };
