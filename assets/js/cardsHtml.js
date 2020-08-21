import { loadingHide } from "./footballAPI.js";

//Cards container getSatands
const cardsGetStands = (resStand) => {
  let containerHTML = "";
  let containerHeaderHome = `
        <header>
            <h5>Match standings of Premier League</h5>
            <h6>First Teams</h6>
            <hr />
        </header>
    `;
  let containerHeader = `     
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th></th>
                        <th>PG</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>GD</th>
                        <th>GA</th>
                        <th>GF</th>
                        <th>Points</th>
                    </tr>`;
  const strUrl = JSON.stringify(resStand).replace(/http:/g, "https:");
  JSON.parse(strUrl).standings[0].table.forEach((stand) => {
    console.log(stand);

    containerHTML +=
      /*html*/
      `<tr>
          <td class="center">${stand.position}</td>
          <td>
          <a href="./detailsTeam.html?id=${stand.team.id}">
              <img
              src="${stand.team.crestUrl}"
              style="width:20px;"
              alt="logo-${stand.team.name}"
              />
          </a>
          </td>
          <td style="text-align:start">
          <a href="./detailsTeam.html?id=${stand.team.id}">${stand.team.name}</a>
          </td>
          <td class="center">${stand.playedGames}</td>
          <td class="center">${stand.won}</td>
          <td class="center" >${stand.draw}</td>
          <td class="center">${stand.lost}</td>
          <td class="center">${stand.goalDifference}</td>
          <td class="center">${stand.goalsAgainst}</td>
          <td class="center">${stand.goalsFor}</td>
          <td class="center">${stand.position}</td>
        </tr>`;
  });
  document.getElementById("headerHome").innerHTML = containerHeaderHome;
  document.getElementById("headerStands").innerHTML = containerHeader;
  document.getElementById("containerStands").innerHTML = containerHTML;
  loadingHide();
};

// container cards getMatch
const cardsGetMatch = (matchs) => {
  let containerHTML = "";
  let containerHeaderHtml = `
          <header>
            <h5>Match of Premier League</h5>
            <h6>First Teams</h6>
            <hr />
          </header>`;
  let containerHeaderMatch = `
                                    <tr>
                                      <th class="center">Away Team</th>
                                      <th></th>
                                      <th class="center">Home Team</th>
                                      <th class="center">Date</th>
                                    </tr>`;
  matchs.matches.forEach((match) => {
    console.log(match);
    containerHTML += `
                        <tr>
                          <td class="right"><a href="./detailsTeam.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a> (${match.score.fullTime.awayTeam})</td>
                          <td class="center">VS</td>
                          <td class="left">(${match.score.fullTime.homeTeam}) <a href="./detailsTeam.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a></td>
                          <td class="center">${match.utcDate}</td>
                        </tr>
                          `;
  });
  document.getElementById("headerMatch").innerHTML = containerHeaderHtml;
  document.getElementById("headerMatchs").innerHTML = containerHeaderMatch;
  document.getElementById("containerMatch").innerHTML = containerHTML;
  loadingHide();
};

// container cards getSaveMyTeam
const cardsGetSaveMyTeam = (details) => {
  let containerHTML = "";
  if (details.length == 0) {
    containerHTML += `
    <div class="col s12">
       <h6 class="center-align noTeam">No favorite team found!</6>
    </div>`;
  }

  details.forEach((detail) => {
    // Menyusun komponen card artikel secara dinamis
    containerHTML += /*html*/ `

      <div class="col l4 m6 s12 cardDetails">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <a href="./detailsTeam.html?id=${detail.id}&favTeam=true">
            <img style="height:20px;" class="activator" src="${detail.crestUrl}" />
            <span class="card-title"></span>  
          </a>
        </div>
        <div class="card-content">${detail.name}
        </div>
      </div>
    </div>
  `;
  });
  document.getElementById("containerFavTeam").innerHTML = containerHTML;
};

var getCardsTeamById = (detail) => {
  let containerHTML = /*html*/ `
  <div class="row">
      <div class="col s12 center-align">
          <header>
          <h5>Team Details of ${detail.name} </h5>
              <hr />
          </header>
      </div>
</div>

        <div class="row">
        <div class="col s8 offset-s2 cardDetails">
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${detail.crestUrl}" />
        </div>
        <div class="card-content">
        <span class="card-title activator">${detail.name}</span>
        <p>Short Name :<i></i> ${detail.shortName}</p>
        <p>Club Color :<span></span> ${detail.clubColors}</p>
        <p>Address :<i></i> ${detail.address}</p>
        <p>Phone :<i></i> ${detail.phone}</p>
        </div>
        </div>
        </div>
        </div>`;
  return containerHTML;
};

const cardsDetailTeam = (details) => {
  let containerHTML = /*html*/ `
  <div class="row">
      <div class="col s12 center-align">
          <header>
          <h5>Team Details of ${details.name} </h5>
              <hr />
          </header>
      </div>
</div>
   
<div class="row">
<div class="col s8 offset-s2 cardDetails">
<div class="card">
<div class="card-image waves-effect waves-block waves-light">
<img class="activator" src="${details.crestUrl}" />
</div>
<div class="card-content">
<span class="card-title activator">${details.name}</span>
<p>Short Name :<i></i> ${details.shortName}</p>
<p>Club Color :<span></span> ${details.clubColors}</p>
<p>Address :<i></i> ${details.address}</p>
<p>Phone :<i></i> ${details.phone}</p>
</div>
</div>
</div>
</div>`;
  return containerHTML;
};

export {
  cardsGetStands,
  cardsGetMatch,
  cardsGetSaveMyTeam,
  getCardsTeamById,
  cardsDetailTeam,
};
