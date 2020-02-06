<template>
  <div>
    <h1>Réutilisations</h1>
    <p>OpenStreetMap est un projet collaboratif. Ses données sont utilisées par de nombreux acteurs. À Montrouge en particulier, à chaque fois que nous réalisons une mise à jour, les acteurs suivants les utilisent :</p>

    <v-row>
      <v-col cols="12" md="6" lg="4" xs="1">
        <v-card href="https://www.velib-metropole.fr/">
          <v-img
            :src="images.velib"
            height="200px"
          />
          <v-card-title>Vélib'</v-card-title>
          <v-card-subtitle>Les bornes de Vélib' affichent un plan de quartier utilisant les données d'OpenStreetMap</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4" xs="1">
        <v-card href="https://www.cityscoot.eu/">
          <v-img
            :src="images.cityscoot"
            height="200px"
          />
          <v-card-title>Cityscoot</v-card-title>
          <v-card-subtitle> L'appli mobile Cityscoot affiche tous les trottoirs de la ville grâce aux données OpenStreetMap</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4" xs="1">
        <v-card href="https://alizecharge.com/">
          <v-img
            :src="images.alize"
            height="200px"
          />
          <v-card-title>Alizé</v-card-title>
          <v-card-subtitle>Le gestionnaire des bornes de recharge de véhicules électrique à Montrouge utilise un fond OpenStreetMap</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4" xs="1">
        <v-card href="https://www.valleesud.fr/">
          <v-img
            :src="images.vsgp"
            height="200px"
          />
          <v-card-title>Vallée Sud</v-card-title>
          <v-card-subtitle>Le site Internet de l'intercommunalité dont Montrouge fait partie utilise OpenStreetMap pour une plus grande précision</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4" xs="1">
        <v-card href="https://www.ratp.fr/">
          <v-img
            :src="images.ratp"
            height="200px"
          />
          <v-card-title>RATP</v-card-title>
          <v-card-subtitle>Les bornes interactives dans le métro affichent un plan d’Île-de-France grâce aux données OpenStreetMap</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4" xs="1">
        <v-card href="https://www.geovelo.fr/">
          <v-img
            :src="images.geovelo"
            height="200px"
          />
          <v-card-title>Géovélo</v-card-title>
          <v-card-subtitle>L'appli Géovélo utilise les données cyclable d'OpenStreetMap pour faire des calculs d'itinéraire adaptés aux vélos</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import images from '../images/reuses-*.jpg';
export default {
  computed: {
    images() { return images; }
  }
};
</script>
