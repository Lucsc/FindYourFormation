import { defineEventHandler } from 'h3'

const LYCEES = [
    { name: "Etienne Dolet", city: "Paris", category: "Public" },
    { name: "Lycée privé Charles de Foucauld", city: "Paris", category: "Privé" },
    { name: "Lycée polyvalent Guillaume Tirel", city: "Rennes", category: "Public" },
    { name: "Lycée polyvalent l'Initiative", city: "Lille", category: "Public" },
    { name: "Lycée polyvalent privé Saint Jean de Montmartre", city: "Paris", category: "Privé" },
    { name: "Lycée privé Pascal", city: "Paris", category: "Privé" },
    { name: "Lycée du bâtiment et des travaux publics", city: "Paris", category: "Public" },
    { name: "Lycée polyvalent privé Saint-Nicolas", city: "Paris", category: "Privé" },
    { name: "Lycée privé La Rochefoucauld", city: "Paris", category: "Privé" },
    { name: "Lycée technique privé de l'école technique supérieure du laboratoire", city: "Paris", category: "Privé" },
    { name: "Lycée privé Charles Péguy", city: "Paris", category: "Privé" },
    { name: "Lycée privé Sainte-Louise", city: "Paris", category: "Privé" },
    { name: "Lycée privé L'Ecole alsacienne", city: "Paris", category: "Privé" },
    { name: "Lycée polyvalent ESAA-Ecole Boulle", city: "Paris", category: "Public" },
    { name: "Lycée polyvalent Paul Poiret", city: "Paris", category: "Public" },
    { name: "Lycée Charlemagne", city: "Paris", category: "Public" },
    { name: "Lycée Claude Monet", city: "Paris", category: "Public" },
    { name: "Lycée privé Lucien de Hirsch", city: "Paris", category: "Privé" },
    { name: "Lycée privé Saint-Michel de Picpus", city: "Paris", category: "Privé" }
]

function choice<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

function randomClassCard() {
  const classes = ['Seconde', "Première", 'Terminale']
  const parcours = ['Général', 'Technologique', 'Professionnel']
  
  return {
    classe: choice(classes),
    parcours: choice(parcours),
  }
}

export default defineEventHandler(() => {
  return {
    lycee: choice(LYCEES),
    classCard: randomClassCard()
  }
})
