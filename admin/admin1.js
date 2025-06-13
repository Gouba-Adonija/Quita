import Cookies from "js-cookie";

// Configuration temporaire pour le développement (à remplacer par un vrai système d'authentification)
Cookies.set("adminToken", "temp_token");

// Fonction pour afficher les villes
async function loadVilles() {
  try {
    const response = await fetch("/api/villes");
    const villes = await response.json();
    displayVilles(villes);
  } catch (error) {
    console.error("Erreur lors du chargement des villes:", error);
  }
}

// Fonction pour afficher les villes dans le DOM
function displayVilles(villes) {
  const villesList = document.getElementById("villesList");
  villesList.innerHTML = villes
    .map(
      (ville) => `
      <div class="item-card" id="ville-${ville.id}">
        <div class="item-header">
          <img src="${ville.image}" alt="${ville.nom}" class="item-image"/>
          <h4>${ville.nom}</h4>
        </div>
        <div class="item-details">
          <p>${ville.description}</p>
          <button class="delete-btn" onclick="deleteVille(${ville.id})">Supprimer</button>
        </div>
      </div>`
    )
    .join("");
}

// Fonction de suppression d'une ville
async function deleteVille(villeId) {
  try {
    const response = await fetch(`/api/villes/${villeId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      document.getElementById(`ville-${villeId}`).remove();
      alert("Ville supprimée avec succès.");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la ville:", error);
  }
}

// Fonction pour ajouter une ville
async function addVille(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const imageFile = formData.get("image");

  // Upload de l'image
  const imageUrl = await uploadImage(imageFile);

  // Envoi des données de la ville
  const newVille = {
    nom: formData.get("nom"),
    description: formData.get("description"),
    image: imageUrl,
    creation: formData.get("creation"),
    histoire: formData.get("histoire"),
  };

  try {
    const response = await fetch("/api/villes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVille),
    });
    const data = await response.json();
    if (data.success) {
      loadVilles(); // Recharge la liste des villes après ajout
      closeModal("addVilleModal");
      alert("Ville ajoutée avec succès.");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la ville:", error);
  }
}

// Fonction pour gérer l'upload d'image
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image:", error);
    return null;
  }
}

// Fonction pour charger et afficher les actualités
async function loadActualites() {
  try {
    const response = await fetch("/api/actualites");
    const actualites = await response.json();
    displayActualites(actualites);
  } catch (error) {
    console.error("Erreur lors du chargement des actualités:", error);
  }
}

// Fonction pour afficher les actualités dans le DOM
function displayActualites(actualites) {
  const actualitesList = document.getElementById("actualitesList");
  actualitesList.innerHTML = actualites
    .map(
      (actu) => `
      <div class="item-card" id="actu-${actu.id}">
        <div class="item-header">
          <h4>${actu.titre}</h4>
        </div>
        <div class="item-details">
          <p>${actu.contenu}</p>
          <button class="delete-btn" onclick="deleteActualite(${actu.id})">Supprimer</button>
        </div>
      </div>`
    )
    .join("");
}

// Fonction de suppression d'une actualité
async function deleteActualite(actuId) {
  try {
    const response = await fetch(`/api/actualites/${actuId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      document.getElementById(`actu-${actuId}`).remove();
      alert("Actualité supprimée avec succès.");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'actualité:", error);
  }
}

// Fonction pour ajouter une actualité
async function addActualite(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const imageFile = formData.get("image");

  // Upload de l'image
  const imageUrl = await uploadImage(imageFile);

  // Envoi des données de l'actualité
  const newActualite = {
    titre: formData.get("titre"),
    date: formData.get("date"),
    contenu: formData.get("contenu"),
    image: imageUrl,
  };

  try {
    const response = await fetch("/api/actualites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActualite),
    });
    const data = await response.json();
    if (data.success) {
      loadActualites(); // Recharge la liste des actualités après ajout
      closeModal("addActuModal");
      alert("Actualité ajoutée avec succès.");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'actualité:", error);
  }
}

// Fonction pour charger et afficher les sites touristiques
async function loadSites() {
  try {
    const response = await fetch("/api/sites");
    const sites = await response.json();
    displaySites(sites);
  } catch (error) {
    console.error("Erreur lors du chargement des sites touristiques:", error);
  }
}

// Fonction pour afficher les sites touristiques dans le DOM
function displaySites(sites) {
  const sitesList = document.getElementById("sitesList");
  sitesList.innerHTML = sites
    .map(
      (site) => `
      <div class="item-card" id="site-${site.id}">
        <div class="item-header">
          <img src="${site.image}" alt="${site.nom}" class="item-image"/>
          <h4>${site.nom}</h4>
        </div>
        <div class="item-details">
          <p>${site.description}</p>
          <button class="delete-btn" onclick="deleteSite(${site.id})">Supprimer</button>
        </div>
      </div>`
    )
    .join("");
}

// Fonction de suppression d'un site touristique
async function deleteSite(siteId) {
  try {
    const response = await fetch(`/api/sites/${siteId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      document.getElementById(`site-${siteId}`).remove();
      alert("Site touristique supprimé avec succès.");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du site touristique:", error);
  }
}

// Fonction pour ajouter un site touristique
async function addSite(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const imageFile = formData.get("image");

  // Upload de l'image
  const imageUrl = await uploadImage(imageFile);

  // Envoi des données du site touristique
  const newSite = {
    nom: formData.get("nom"),
    description: formData.get("description"),
    image: imageUrl,
    horaires: formData.get("horaires"),
    tarifs: formData.get("tarifs"),
  };

  try {
    const response = await fetch("/api/sites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSite),
    });
    const data = await response.json();
    if (data.success) {
      loadSites(); // Recharge la liste des sites après ajout
      closeModal("addSiteModal");
      alert("Site touristique ajouté avec succès.");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du site touristique:", error);
  }
}

// Fonction de gestion des onglets
document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Fonction de déconnexion
document.getElementById("logoutBtn").addEventListener("click", () => {
  Cookies.remove("adminToken");
  window.location.href = "/login.html";
});

// Fonction d'ouverture de modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// Fonction de fermeture de modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Rendre les fonctions globales
window.deleteVille = deleteVille;
window.deleteActualite = deleteActualite;
window.deleteSite = deleteSite;
window.closeModal = closeModal;
// Initialisation de la page
document.addEventListener("DOMContentLoaded", () => {
  loadVilles();
  loadActualites();
  loadSites();

  // Branchements des événements pour ouvrir les modals
  document
    .getElementById("addVilleBtn")
    .addEventListener("click", () => openModal("addVilleModal"));
  document
    .getElementById("addActuBtn")
    .addEventListener("click", () => openModal("addActuModal"));
  document
    .getElementById("addSiteBtn")
    .addEventListener("click", () => openModal("addSiteModal"));

  // Branchements des événements pour ajouter des villes, actualités et sites
  document.getElementById("addVilleForm").addEventListener("submit", addVille);
  document
    .getElementById("addActuForm")
    .addEventListener("submit", addActualite);
  document.getElementById("addSiteForm").addEventListener("submit", addSite);
});
