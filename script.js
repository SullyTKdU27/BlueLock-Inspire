const gameState = {
    player: {
        name: 'Isagi Yoichi',
        club: '',
        energy: 1000,
        attributes: {
            shooting: 1,
            passing: 1,
            defense: 1,
            speed: 1,
            stamina: 1,
            luck: 1
        }
    },
    career: {
        season: 1,
        week: 1,
        marketValue: 1000000,
        gamesPlayed: 0,
        goals: 0,
        assists: 0,
        trophies: [],
        matchHistory: []
    },
    league: {
        clubs: [
            { name: "Bayern Munich", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { name: "Juventus", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { name: "Manchester City", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { name: "Manchester United", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { name: "PSG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { name: "Barcelona", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ]
    }
};

// DOM Elements
const sections = document.querySelectorAll('.section');
const newGameBtn = document.getElementById('newGameBtn');
const loadGameBtn = document.getElementById('loadGameBtn');
const startCareerBtn = document.getElementById('startCareerBtn');
const playerNameInput = document.getElementById('playerName');
const playerNameDisplay = document.getElementById('playerNameDisplay');
const clubOptions = document.querySelectorAll('.club-option');
const energyValue = document.getElementById('energyValue');
const energyBar = document.getElementById('energyBar');
const currentClub = document.getElementById('currentClub');
const currentSeason = document.getElementById('currentSeason');
const currentWeek = document.getElementById('currentWeek');
const trainingBtn = document.getElementById('trainingBtn');
const matchBtn = document.getElementById('matchBtn');
const leagueTableBtn = document.getElementById('leagueTableBtn');
const careerStatsBtn = document.getElementById('careerStatsBtn');
const nextWeekBtn = document.getElementById('nextWeekBtn');
const saveGameBtn = document.getElementById('saveGameBtn');
const trainingOptions = document.querySelectorAll('.training-option');
const trainingResult = document.getElementById('trainingResult');
const backFromTrainingBtn = document.getElementById('backFromTrainingBtn');
const opponentSelection = document.getElementById('opponentSelection');
const startMatchBtn = document.getElementById('startMatchBtn');
const backFromMatchBtn = document.getElementById('backFromMatchBtn');
const matchDetails = document.getElementById('matchDetails');
const matchHighlights = document.getElementById('matchHighlights');
const continueAfterMatchBtn = document.getElementById('continueAfterMatchBtn');
const leagueTableBody = document.getElementById('leagueTableBody');
const backFromLeagueBtn = document.getElementById('backFromLeagueBtn');
const careerGamesPlayed = document.getElementById('careerGamesPlayed');
const careerGoals = document.getElementById('careerGoals');
const careerAssists = document.getElementById('careerAssists');
const marketValue = document.getElementById('marketValue');
const matchHistoryBody = document.getElementById('matchHistoryBody');
const backFromCareerBtn = document.getElementById('backFromCareerBtn');
const notification = document.getElementById('notification');
const cheatCode = document.getElementById('cheatCode');
const applyCheatBtn = document.getElementById('applyCheatBtn');

// Helper Functions
function showSection(sectionId) {
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function updatePlayerStats() {
    // Update Shooting
    document.getElementById('shootingValue').textContent = `${gameState.player.attributes.shooting}/99`;
    document.getElementById('shootingBar').style.width = `${(gameState.player.attributes.shooting / 99) * 100}%`;

    // Update Passing
    document.getElementById('passingValue').textContent = `${gameState.player.attributes.passing}/99`;
    document.getElementById('passingBar').style.width = `${(gameState.player.attributes.passing / 99) * 100}%`;

    // Update Defense
    document.getElementById('defenseValue').textContent = `${gameState.player.attributes.defense}/99`;
    document.getElementById('defenseBar').style.width = `${(gameState.player.attributes.defense / 99) * 100}%`;

    // Update Speed
    document.getElementById('speedValue').textContent = `${gameState.player.attributes.speed}/99`;
    document.getElementById('speedBar').style.width = `${(gameState.player.attributes.speed / 99) * 100}%`;

    // Update Stamina
    document.getElementById('staminaValue').textContent = `${gameState.player.attributes.stamina}/99`;
    document.getElementById('staminaBar').style.width = `${(gameState.player.attributes.stamina / 99) * 100}%`;

    // Update Luck
    document.getElementById('luckValue').textContent = `${gameState.player.attributes.luck}/99`;
    document.getElementById('luckBar').style.width = `${(gameState.player.attributes.luck / 99) * 100}%`;
}

function updateEnergy() {
    energyValue.textContent = gameState.player.energy;
    energyBar.style.width = `${(gameState.player.energy / 1000) * 100}%`;
}

function updateGameInfo() {
    currentClub.textContent = gameState.player.club || 'Unknown Club';
    document.getElementById('currentSeason').textContent = gameState.career.season;
    document.getElementById('currentWeek').textContent = gameState.career.week;
    document.getElementById('marketValueDisplay').textContent = `€${(gameState.career.marketValue / 1000000).toFixed(2)} million`;
    document.getElementById('seasonProgress').textContent = `${gameState.career.week}/25 weeks completed`;
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function updateLeagueTable() {
    // Sort clubs by points, then goal difference
    const sortedClubs = [...gameState.league.clubs].sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points;
        const aGD = a.goalsFor - a.goalsAgainst;
        const bGD = b.goalsFor - b.goalsAgainst;
        if (aGD !== bGD) return bGD - aGD;
        return b.goalsFor - a.goalsFor;
    });
    
    leagueTableBody.innerHTML = '';
    sortedClubs.forEach((club, index) => {
        const row = document.createElement('tr');
        const goalDiff = club.goalsFor - club.goalsAgainst;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${club.name}</td>
            <td>${club.played}</td>
            <td>${club.won}</td>
            <td>${club.drawn}</td>
            <td>${club.lost}</td>
            <td>${club.goalsFor}</td>
            <td>${club.goalsAgainst}</td>
            <td>${goalDiff > 0 ? '+' + goalDiff : goalDiff}</td>
            <td>${club.points}</td>
        `;
        if (club.name === gameState.player.club) {
            row.style.backgroundColor = 'rgba(76, 201, 240, 0.3)';
            row.style.fontWeight = 'bold';
        }
        leagueTableBody.appendChild(row);
    });
}

function updateCareerStats() {
    careerGamesPlayed.textContent = gameState.career.gamesPlayed;
    careerGoals.textContent = gameState.career.goals;
    careerAssists.textContent = gameState.career.assists;
    marketValue.textContent = `€${(gameState.career.marketValue / 1000000).toFixed(2)} million`;

    // Display trophies
    const trophies = gameState.career.trophies || [];
    const trophyContainer = document.getElementById('careerTrophies');
    trophyContainer.innerHTML = '';
    
    if (trophies.length === 0) {
        trophyContainer.textContent = "None";
    } else {
        trophies.forEach(trophy => {
            const trophyIcon = document.createElement('img');
            trophyIcon.src = `images/${trophy.replace(/\s+/g, '_').toLowerCase()}.png`; // Example: league_title.png
            trophyIcon.alt = trophy;
            trophyIcon.title = trophy;
            trophyIcon.style.width = '30px';
            trophyIcon.style.marginRight = '5px';
            trophyContainer.appendChild(trophyIcon);
        });
    }

    // Fix match history display by always initializing it
    if (!gameState.career.matchHistory) {
        gameState.career.matchHistory = [];
    }

    // Display match history
    matchHistoryBody.innerHTML = '';
    gameState.career.matchHistory.slice().reverse().forEach(match => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${match.week}</td>
            <td>${match.season}</td>
            <td>${match.opponent}</td>
            <td>${match.result}</td>
            <td>${match.goals}</td>
            <td>${match.assists}</td>
        `;
        matchHistoryBody.appendChild(row);
    });
}

function saveGame() {
    localStorage.setItem('blueLockGameSave', JSON.stringify(gameState));
    showNotification('Game saved successfully!');
}

function loadGame() {
    const savedGame = localStorage.getItem('blueLockGameSave');
    if (savedGame) {
        gameState = JSON.parse(savedGame);
        updatePlayerStats();
        updateEnergy();
        updateGameInfo();
        showSection('mainGame');
        showNotification('Game loaded successfully!');
    } else {
        showNotification('No saved game found!');
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulateTraining(type, cost) {
    console.log(`Training Type: ${type}, Cost: ${cost}`);

    if (gameState.player.energy < cost) {
        showNotification('Not enough energy!');
        return;
    }

    // Deduct energy
    gameState.player.energy -= cost;
    
    // Define stat gain based on training type
    let statGain = 1; // Default gain
    let statsToUpdate = [];
    
    if (type === "double") {
        // Double intensity training improves two random stats
        statGain = 1;
        const allStats = ["shooting", "passing", "defense", "speed", "stamina"];
        // Randomly select 2 stats to improve
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * allStats.length);
            statsToUpdate.push(allStats.splice(randomIndex, 1)[0]);
        }
    } else if (type === "hardcore") {
        // Hardcore training improves all stats more significantly
        statGain = 2;
        statsToUpdate = ["shooting", "passing", "defense", "speed", "stamina"];
    } else if (type === "luck") {
        // Luck training specifically for luck stat
        statsToUpdate = ["luck"];
    } else {
        // Regular training for a specific stat
        statsToUpdate = [type];
    }
    
    // Update each stat in the list
    let statsImproved = [];
    statsToUpdate.forEach(stat => {
        if (gameState.player.attributes[stat] < 99) {
            gameState.player.attributes[stat] += statGain;
            // Cap at 99
            if (gameState.player.attributes[stat] > 99) {
                gameState.player.attributes[stat] = 99;
            }
            statsImproved.push(stat);
        }
    });
    
    // Show notification about improvement
    if (statsImproved.length > 0) {
        const improvedMessage = statsImproved.map(
            stat => `${stat.charAt(0).toUpperCase() + stat.slice(1)} +${statGain}`
        ).join(', ');
        showNotification(`Training successful! ${improvedMessage}`);
    } else {
        showNotification('No stats improved. All selected stats already at maximum level!');
    }

    // Update the UI
    updatePlayerStats();
    updateEnergy();
}

function populateOpponents() {
    opponentSelection.innerHTML = '';
    gameState.league.clubs.forEach(club => {
        if (club.name !== gameState.player.club) {
            const div = document.createElement('div');
            div.className = 'club-option';
            div.setAttribute('data-opponent', club.name);
            div.textContent = club.name;
            opponentSelection.appendChild(div);
        }
    });
    
    // Add event listeners for opponent selection
    document.querySelectorAll('#opponentSelection .club-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('#opponentSelection .club-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            gameState.selectedOpponent = this.getAttribute('data-opponent');
            startMatchBtn.disabled = false;
        });
    });
}

function simulateMatch(opponent) {
    // Check if this opponent has been played 5 times already this season
    const opponentMatches = gameState.career.matchHistory.filter(
        match => match.opponent === opponent && match.season === gameState.career.season
    ).length;
    
    if (opponentMatches >= 5) {
        showNotification(`You cannot play against ${opponent} more than 5 times in a season!`);
        return null;
    }

    if (gameState.career.matchPlayedThisWeek) {
        showNotification('You can only play one match per week!');
        return null;
    }

    if (gameState.player.energy < 100) {
        showNotification('Not enough energy!');
        return null;
    }

    if (gameState.player.fatigued) {
        showNotification('You are fatigued and cannot play!');
        return null;
    }

    gameState.career.matchPlayedThisWeek = true; // Mark match as played
    gameState.player.energy -= 100;

    const playerClub = gameState.league.clubs.find(club => club.name === gameState.player.club);
    const opponentClub = gameState.league.clubs.find(club => club.name === opponent);

    const teamBoost = gameState.player.teamBoost || 0; // Apply Wild Card boost
    const luckFactor = gameState.player.attributes.luck / 100; // Luck contributes up to 5% at max level
    const playerTeamStrength = 75 + teamBoost + getRandomInt(-10, 10) + Math.floor(luckFactor * 10); // Luck adds up to +10 strength
    const opponentStrength = 70 + getRandomInt(-10, 10);

    // Player team goals
    const basePlayerGoals = Math.max(0, Math.floor(playerTeamStrength / 15));
    const playerRandomFactor = Math.random() < 0.5 ? getRandomInt(-1, 1) : 0;
    const playerTightGameChance = Math.random() < 0.1;
    const playerClubGoals = playerTightGameChance
        ? Math.max(0, basePlayerGoals + playerRandomFactor - 1)
        : Math.max(0, basePlayerGoals + playerRandomFactor);

    // Opponent team goals
    const baseOpponentGoals = Math.max(0, Math.floor(opponentStrength / 15));
    const randomFactor = Math.random() < 0.5 ? getRandomInt(-1, 1) : 0;
    const tightGameChance = Math.random() < 0.3;
    const opponentGoals = tightGameChance
        ? Math.max(0, baseOpponentGoals + randomFactor - 1)
        : Math.max(0, baseOpponentGoals + randomFactor);

    // Limit player's involvement in team goals
    const teamInvolvementFactor = 0.75; // Player can only contribute to 75% of team goals
    const maxPlayerInvolvement = Math.ceil(playerClubGoals * teamInvolvementFactor);

    let playerGoals = 0;
    let playerAssists = 0;

    for (let i = 0; i < maxPlayerInvolvement; i++) {
        if (Math.random() < 0.5) {
            playerGoals++;
        } else {
            playerAssists++;
        }
    }

    // Update league statistics
    playerClub.played += 1;
    opponentClub.played += 1;
    playerClub.goalsFor += playerClubGoals;
    playerClub.goalsAgainst += opponentGoals;
    opponentClub.goalsFor += opponentGoals;
    opponentClub.goalsAgainst += playerClubGoals;

    if (playerClubGoals > opponentGoals) {
        playerClub.won += 1;
        playerClub.points += 3;
        opponentClub.lost += 1;
    } else if (playerClubGoals < opponentGoals) {
        opponentClub.won += 1;
        opponentClub.points += 3;
        playerClub.lost += 1;
    } else {
        playerClub.drawn += 1;
        opponentClub.drawn += 1;
        playerClub.points += 1;
        opponentClub.points += 1;
    }

    // Update player career statistics
    gameState.career.gamesPlayed += 1;
    gameState.career.goals += playerGoals;
    gameState.career.assists += playerAssists;

    // Market value adjustment based on performance and stats
    const performanceFactor = (playerGoals * 2 + playerAssists) * 1000000; // Increase by millions
    const statsFactor = Object.values(gameState.player.attributes).reduce((sum, attr) => sum + attr, 0) * 5000;
    const resultFactor = playerClubGoals > opponentGoals ? 2000000 : playerClubGoals === opponentGoals ? -500000 : -1000000;
    gameState.career.marketValue = Math.max(100000, gameState.career.marketValue + performanceFactor + statsFactor + resultFactor); // Ensure it doesn't drop below 100k

    // Update the UI
    updateGameInfo();

    // Create match record with proper result format
    const result = playerClubGoals > opponentGoals 
        ? 'W ' + playerClubGoals + '-' + opponentGoals 
        : playerClubGoals < opponentGoals 
        ? 'L ' + playerClubGoals + '-' + opponentGoals 
        : 'D ' + playerClubGoals + '-' + opponentGoals;
        
    const matchRecord = {
        season: gameState.career.season,
        week: gameState.career.week,
        opponent: opponent,
        result: result,
        goals: playerGoals,
        assists: playerAssists
    };

    // Add match to history
    if (!gameState.career.matchHistory) {
        gameState.career.matchHistory = [];
    }
    gameState.career.matchHistory.push(matchRecord);

    // Simulate other matches
    simulateOtherMatches(opponent);

    return {
        playerClub: gameState.player.club,
        opponent: opponent,
        playerClubGoals: playerClubGoals,
        opponentGoals: opponentGoals,
        playerGoals: playerGoals,
        playerAssists: playerAssists,
        result: playerClubGoals > opponentGoals ? 'win' : (playerClubGoals < opponentGoals ? 'loss' : 'draw')
    };
}

function generateMatchHighlights(matchResult) {
    const highlights = [];
    
    // Pre-match
    highlights.push(`The match between ${matchResult.playerClub} and ${matchResult.opponent} is about to begin!`);
    
    // First half events
    highlights.push("First half begins!");
    
    // Generate goal events
    const playerGoalsFirst = Math.min(matchResult.playerGoals, Math.floor(matchResult.playerClubGoals / 2));
    const playerGoalsSecond = matchResult.playerGoals - playerGoalsFirst;
    
    const playerTeamGoalsFirst = Math.min(matchResult.playerClubGoals, Math.ceil(matchResult.playerClubGoals / 2));
    const playerTeamGoalsSecond = matchResult.playerClubGoals - playerTeamGoalsFirst;
    
    const opponentGoalsFirst = Math.min(matchResult.opponentGoals, Math.floor(matchResult.opponentGoals / 2));
    const opponentGoalsSecond = matchResult.opponentGoals - opponentGoalsFirst;
    
    // Player goals in first half
    for (let i = 0; i < playerGoalsFirst; i++) {
        const minute = getRandomInt(5, 45);
        highlights.push(`${minute}' GOAL! ${gameState.player.name} scores for ${matchResult.playerClub}!`);
    }
    
    // Team goals (excluding player goals) in first half
    for (let i = 0; i < playerTeamGoalsFirst - playerGoalsFirst; i++) {
        const minute = getRandomInt(5, 45);
        const wasAssist = matchResult.playerAssists > 0 && i < matchResult.playerAssists;
        if (wasAssist) {
            highlights.push(`${minute}' GOAL! Teammate scores for ${matchResult.playerClub} with an assist from ${gameState.player.name}!`);
        } else {
            highlights.push(`${minute}' GOAL! Teammate scores for ${matchResult.playerClub}!`);
        }
    }
    
    // Opponent goals in first half
    for (let i = 0; i < opponentGoalsFirst; i++) {
        const minute = getRandomInt(5, 45);
        highlights.push(`${minute}' Goal. ${matchResult.opponent} scores.`);
        if (Math.random() < 0.1) {
            highlights.push(`${minute}' Foul! ${matchResult.opponent} commits a foul.`);
        }
        if (Math.random() < 0.05) {
            highlights.push(`${minute}' Yellow Card! A player from ${matchResult.opponent} is booked.`);
        }
    }
    
    // Half time
    highlights.push(`Half time: ${matchResult.playerClub} ${playerTeamGoalsFirst}-${opponentGoalsFirst} ${matchResult.opponent}`);
    
    // Second half
    highlights.push("Second half begins!");
    
    // Player goals in second half
    for (let i = 0; i < playerGoalsSecond; i++) {
        const minute = getRandomInt(46, 90);
        highlights.push(`${minute}' GOAL! ${gameState.player.name} scores for ${matchResult.playerClub}!`);
    }
    
    // Team goals (excluding player goals) in second half
    for (let i = 0; i < playerTeamGoalsSecond - playerGoalsSecond; i++) {
        const minute = getRandomInt(46, 90);
        const remainingAssists = matchResult.playerAssists - (playerTeamGoalsFirst - playerGoalsFirst);
        const wasAssist = remainingAssists > 0 && i < remainingAssists;
        if (wasAssist) {
            highlights.push(`${minute}' GOAL! Teammate scores for ${matchResult.playerClub} with an assist from ${gameState.player.name}!`);
        } else {
            highlights.push(`${minute}' GOAL! Teammate scores for ${matchResult.playerClub}!`);
        }
    }
    
    // Opponent goals in second half
    for (let i = 0; i < opponentGoalsSecond; i++) {
        const minute = getRandomInt(46, 90);
        highlights.push(`${minute}' Goal. ${matchResult.opponent} scores.`);
        if (Math.random() < 0.1) {
            highlights.push(`${minute}' Foul! ${matchResult.opponent} commits a foul.`);
        }
        if (Math.random() < 0.05) {
            highlights.push(`${minute}' Yellow Card! A player from ${matchResult.opponent} is booked.`);
        }
    }
    
    // Full time
    highlights.push(`Full time: ${matchResult.playerClub} ${matchResult.playerClubGoals}-${matchResult.opponentGoals} ${matchResult.opponent}`);
    
    // Match summary
    if (matchResult.result === 'win') {
        highlights.push(`${matchResult.playerClub} wins! Great performance!`);
    } else if (matchResult.result === 'loss') {
        highlights.push(`${matchResult.opponent} wins. Better luck next time.`);
    } else {
        highlights.push("The match ends in a draw.");
    }
    
    // Player stats
    highlights.push(`Your stats: ${matchResult.playerGoals} goals, ${matchResult.playerAssists} assists`);
    
    return highlights;
}

function advanceWeek() {
    // Check if we're at the end of the season
    if (gameState.career.week === 25) {
        // Check for trophies
        checkForTrophies();
    } else if (gameState.career.week < 25) {
        // Advance the week
        gameState.career.week += 1;

        // Restore energy (e.g., restore 300 energy per week, capped at 1000)
        const energyRestored = 300;
        gameState.player.energy = Math.min(1000, gameState.player.energy + energyRestored);

        // Reset the matchPlayedThisWeek flag
        gameState.career.matchPlayedThisWeek = false;

        // Adjust market value slightly each week (e.g., random fluctuation)
        const fluctuation = getRandomInt(-50000, 50000); // Random fluctuation between -50k and +50k
        gameState.career.marketValue = Math.max(100000, gameState.career.marketValue + fluctuation); // Ensure it doesn't drop below 100k

        // Update the UI
        updateGameInfo();
        updateEnergy();

        showNotification(`Week advanced! Energy restored by ${energyRestored}. Market value updated.`);
    } else {
        // This shouldn't happen with proper trophy checking but just in case
        showNotification('The season has ended!');
    }
}

function applyCheat(code) {
    if (code === "LOCK OFF") {
        for (const attr in gameState.player.attributes) {
            gameState.player.attributes[attr] = 99;
        }
        showNotification('Cheat activated: All stats maxed!');
        updatePlayerStats();
    } else if (code.startsWith("ENERGY ")) {
        const energyValue = parseInt(code.split(" ")[1]);
        if (!isNaN(energyValue) && energyValue >= 0 && energyValue <= 1000) {
            gameState.player.energy = energyValue;
            showNotification(`Cheat activated: Energy set to ${energyValue}`);
            updateEnergy();
        } else {
            showNotification('Invalid energy value. Must be between 0 and 1000.');
        }
    } else if (code.startsWith("MARKET VALUE ")) {
        const marketValue = parseInt(code.split(" ")[2]);
        if (!isNaN(marketValue) && marketValue >= 0) {
            gameState.career.marketValue = marketValue * 1000000; // Convert to millions
            showNotification(`Cheat activated: Market Value set to €${marketValue} million`);
            updateGameInfo();
        } else {
            showNotification('Invalid market value. Must be a positive number.');
        }
    } else if (code === "WILD CARD") {
        gameState.player.teamBoost = (gameState.player.teamBoost || 0) + 10; // Add +10 boost
        showNotification('Cheat activated: Wild Card! Your team strength is permanently boosted by +10.');
    } else if (code === "CONTRACT OFFER") {
        forceContractOffer();
    } else {
        showNotification('Invalid cheat code');
    }
}

function simulateOtherMatches(playerOpponent) {
    // Create a copy of the clubs array excluding the player's club and the opponent they just played against
    const clubs = gameState.league.clubs.filter(
        club => club.name !== gameState.player.club && club.name !== playerOpponent
    );

    // Shuffle the clubs to randomize matchups
    const shuffledClubs = [...clubs].sort(() => Math.random() - 0.5);

    // Ensure every team plays exactly once
    while (shuffledClubs.length >= 2) {
        const clubA = shuffledClubs.pop(); // Take one club
        const clubB = shuffledClubs.pop(); // Take another club

        // Simulate the match between clubA and clubB
        const clubAStrength = 70 + getRandomInt(-10, 10);
        const clubBStrength = 70 + getRandomInt(-10, 10);

        const clubAGoals = Math.max(0, Math.floor(clubAStrength / 15));
        const clubBGoals = Math.max(0, Math.floor(clubBStrength / 15));

        // Update league statistics
        clubA.played += 1;
        clubB.played += 1;
        clubA.goalsFor += clubAGoals;
        clubA.goalsAgainst += clubBGoals;
        clubB.goalsFor += clubBGoals;
            if (clubAGoals > clubBGoals) {
                clubA.won += 1;
                clubA.points += 3;
                clubB.lost += 1;
            } else if (clubAGoals < clubBGoals) {
                clubB.won += 1;
                clubB.points += 3;
                clubA.lost += 1;
            } else {
                clubA.drawn += 1;
                clubB.drawn += 1;
                clubA.points += 1;
                clubB.points += 1;
            }
        }
    }

function checkForTransfers() {
    if (gameState.career.marketValue > 5000000 && Math.random() < 0.3) { // 30% chance of offer
        const newClub = gameState.league.clubs[getRandomInt(0, gameState.league.clubs.length - 1)].name;
        if (newClub !== gameState.player.club) {
            const accept = confirm(`You have received an offer from ${newClub}. Do you want to transfer?`);
            if (accept) {
                gameState.player.club = newClub;
                showNotification(`You have transferred to ${newClub}!`);
            }
        }
    }
}

function forceContractOffer() {
    // Get a random club that is not the player's current club
    const availableClubs = gameState.league.clubs.filter(club => club.name !== gameState.player.club);
    const randomClub = availableClubs[getRandomInt(0, availableClubs.length - 1)];

    // Generate a random transfer fee based on the player's market value
    const transferFee = getRandomInt(
        Math.floor(gameState.career.marketValue * 0.8), // 80% of market value
        Math.floor(gameState.career.marketValue * 1.2) // 120% of market value
    );

    // Prompt the player to accept or reject the offer
    const accept = confirm(`You have received a contract offer from ${randomClub.name} for a transfer fee of €${(transferFee / 1000000).toFixed(2)} million. Do you want to accept?`);

    if (accept) {
        // Update the player's club and notify them
        gameState.player.club = randomClub.name;
        showNotification(`You have transferred to ${randomClub.name} for €${(transferFee / 1000000).toFixed(2)} million!`);
        updateGameInfo();
    } else {
        showNotification('You rejected the contract offer.');
    }
}

function checkForTrophies() {
    // Check if the league has ended (week 25)
    if (gameState.career.week === 25) {
        // Sort clubs by points to find the champion
        const sortedClubs = [...gameState.league.clubs].sort((a, b) => {
            if (a.points !== b.points) return b.points - a.points;
            const aGD = a.goalsFor - a.goalsAgainst;
            const bGD = b.goalsFor - b.goalsAgainst;
            if (aGD !== bGD) return bGD - aGD;
            return b.goalsFor - a.goalsFor;
        });
        
        // Check if player's club is the champion
        if (sortedClubs[0].name === gameState.player.club) {
            // Initialize trophies array if it doesn't exist
            if (!gameState.career.trophies) {
                gameState.career.trophies = [];
            }
            
            // Add the league title trophy
            const trophy = `Season ${gameState.career.season} League Title`;
            gameState.career.trophies.push(trophy);
            
            // Show a notification
            showNotification(`Congratulations! ${gameState.player.club} has won the league!`);
        }
        
        // Reset league for next season
        resetLeagueForNewSeason();
    }
}

// Event Listeners
newGameBtn.addEventListener('click', () => {
    showSection('characterCreation');
});

loadGameBtn.addEventListener('click', loadGame);

clubOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Highlight the selected club
        clubOptions.forEach(club => club.classList.remove('selected'));
        this.classList.add('selected');

        // Set the selected club in the game state
        gameState.player.club = this.getAttribute('data-club');

        // Enable the "Start Career" button
        startCareerBtn.disabled = false;
    });
});

startCareerBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        gameState.player.name = playerName; // Update the player's name in the game state
        playerNameDisplay.textContent = playerName; // Update the name on the Home Page
        showSection('mainGame'); // Navigate to the Home Page
    } else {
        alert('Please enter a valid name!');
    }
});

trainingBtn.addEventListener('click', () => {
    showSection('trainingScreen');
    trainingResult.innerHTML = '';
});

matchBtn.addEventListener('click', () => {
    showSection('matchScreen');
    populateOpponents();
});

leagueTableBtn.addEventListener('click', () => {
    showSection('leagueTableScreen');
    updateLeagueTable();
});

careerStatsBtn.addEventListener('click', () => {
    showSection('careerStatsScreen');
    updateCareerStats();
});

nextWeekBtn.addEventListener('click', () => {
    advanceWeek();
});

saveGameBtn.addEventListener('click', saveGame);

trainingOptions.forEach(option => {
    option.addEventListener('click', function () {
        const cost = parseInt(this.getAttribute('data-cost')); // Get the energy cost
        const type = this.getAttribute('data-type'); // Get the training type
        simulateTraining(type, cost); // Pass the type and cost to the simulateTraining function
    });
});

backFromTrainingBtn.addEventListener('click', () => {
    showSection('mainGame');
});

startMatchBtn.addEventListener('click', () => {
    const opponent = gameState.selectedOpponent;
    const matchResult = simulateMatch(opponent);

    if (matchResult) {
        matchDetails.innerHTML = `
            <h3>${matchResult.playerClub} ${matchResult.playerClubGoals} - ${matchResult.opponentGoals} ${matchResult.opponent}</h3>
            <p>${matchResult.playerGoals} goals, ${matchResult.playerAssists} assists</p>
        `;
        const highlights = generateMatchHighlights(matchResult);
        matchHighlights.innerHTML = ''; // Clear previous highlights
        highlights.forEach(highlight => {
            const div = document.createElement('div');
            div.className = 'match-highlight';
            div.textContent = highlight;
            matchHighlights.appendChild(div);
        });
        showSection('matchSimulation');
    }
});

backFromMatchBtn.addEventListener('click', () => {
    showSection('mainGame');
});

continueAfterMatchBtn.addEventListener('click', () => {
    showSection('mainGame');
});

backFromLeagueBtn.addEventListener('click', () => {
    showSection('mainGame');
});

backFromCareerBtn.addEventListener('click', () => {
    showSection('mainGame');
});

applyCheatBtn.addEventListener('click', () => {
    applyCheat(cheatCode.value);
    cheatCode.value = '';
});

// Initialize the game
updatePlayerStats();
updateEnergy();
