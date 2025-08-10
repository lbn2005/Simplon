

const apiURL = "http://localhost:3000/programmes";
    const programmesList = document.getElementById("list");
    const form = document.getElementById("form");
    const searchInput = document.getElementById("recherche");
    const cleanInput = document.getElementById("supprimer");

    let programmesData = [];
    function afficherProgrammes(data) {
      programmesList.innerHTML = "";
      if(data.length === 0){
        programmesList.innerHTML = " ";
        return;
      }
    data.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("programme");
        div.innerHTML = `
          <h3>${p.titre}</h3>
          <p>${p.description}</p>
          <p><strong>Durée:</strong> ${p.duree}</p>
          <p><strong>Compétences:</strong> ${p.competences.join(", ")}</p>
          <button id="supprimer" oncklic="supprimerprogramme('${p.id}')"> Supprimer</button>
        `;
         programmesList.appendChild(div);
      });
    }
 function lProgrammes() {
      axios.get(apiURL)
        .then(response => {
          programmesData = response.data;
          afficherProgrammes(programmesData);
        })
        .catch(error => console.error(error));
    }
form.addEventListener("submit", e => {
      e.preventDefault();
       const nouveauProgramme = {
        titre: document.getElementById("titre").value,
        description: document.getElementById("description").value,
        duree: document.getElementById("duree").value,
        competences: document.getElementById("competences").value.split(",").map(c => c.trim())
      };
       axios.post(apiURL, nouveauProgramme)
        .then(() => {
          form.reset();
          lProgrammes();
        })
        .catch(error => console.error(error));
    });
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filtered = programmesData.filter(p => 
        p.titre.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.competences.some(c => c.toLowerCase().includes(searchTerm))
      );
      afficherProgrammes(filtered);
    });
function supprimerprogramme(id){
  axios.delete(`http://localhost:3000/programmes/${id}`)
  .then(() => {
          console.log(id)
          lProgrammes()
          })
          .catch(error => console.error(error));

}
  lProgrammes();