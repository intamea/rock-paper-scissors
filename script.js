/*NEXT TODO:
 * - Nerf Rock
 * - Update README.md
 * - Make the 'draw' text white with paper & scissors
 * - Implement scissors specials
 * - Add function for achievements
 */
//Initial VARIABLES
const l_body = document.getElementById("body");

//GameGuide
const l_gameGuide = document.getElementById("gameGuide");
const l_guideLink = document.getElementById("guideLink");
const l_closeGuideBtn = document.getElementById("closeGuideBtn");

//Results Overview
const l_resultsScreen = document.getElementById("resultsPage");
const l_closeResultsBtn = document.getElementById("closeResultsBtn");
const l_victoryOrDeath = document.getElementById("victoryOrDeath");

const l_baseExpBreakdown = document.getElementById("baseExpBreakdown");
const l_winMarginText = document.getElementById("winMargin");
const l_expMultiplierBreakdown = document.getElementById("expMultiplierBreakdown");
const l_experienceFinal = document.getElementById("experienceBreakdown");
const l_resultsHeaderRow = document.getElementById("resultsHeaderRow");
const l_resultsBreakdownRow = document.getElementById("resultsBreakdownRow");

//HOMESCREEN
const l_homeScreenItems = document.querySelectorAll(".homeScreen");
const l_startGameBtn = document.getElementById("startButton");
const l_experienceDisplay = document.getElementById("currentExperience");
const l_activeEffects = document.getElementById("activeEffects");

//floatDown animation items
const l_floatItems = document.querySelectorAll(".animatedItems");

//upgrade table
const l_rockUpgradeBtn = document.getElementById("rockUpgradeBtn");
const l_paperUpgradeBtn = document.getElementById("paperUpgradeBtn");
const l_scissorUpgradeBtn = document.getElementById("scissorUpgradeBtn");
const l_expBonusBtn = document.getElementById("expBonusBtn");
const l_expBonusCostSpan = document.getElementById("expBonusCost");

const l_rockRankText = document.getElementById("rockRank");
const l_paperRankText = document.getElementById("paperRank");
const l_scissorsRankText = document.getElementById("scissorsRank");

const l_rockUpgradeTitle = document.getElementById("rockUpgradeTitle");
const l_paperUpgradeTitle = document.getElementById("paperUpgradeTitle");
const l_scissorsUpgradeTitle = document.getElementById("scissorsUpgradeTitle");

const l_rockUpgradeDescription = document.getElementById("rockUpgradeDescription");
const l_paperUpgradeDescription = document.getElementById("paperUpgradeDescription");
const l_scissorsUpgradeDescription = document.getElementById("scissorsUpgradeDescription");

const l_equippedRock = document.getElementById("equippedRock");
const l_equippedPaper = document.getElementById("equippedPaper");
const l_equippedScissors = document.getElementById("equippedScissors");

const l_rockNextUpgradeReqExp = document.getElementById("rockNextUpgradeReqExp");
const l_paperNextUpgradeReqExp = document.getElementById("paperNextUpgradeReqExp");
const l_scissorsNextUpgradeReqExp = document.getElementById("scissorsNextUpgradeReqExp");

//GAMESCREEN
const l_gameScreenItems = document.querySelectorAll(".gameScreen");
const l_returnBtn = document.getElementById("backBtnContainer");
const l_outcomeText = document.getElementById("outcomeText");
const l_rockBtn = document.getElementById("rockBtn");
const l_paperBtn = document.getElementById("paperBtn");
const l_scissorsBtn = document.getElementById("scissorsBtn");

const l_userChoice = document.getElementById("userSelection");
const l_computerChoice = document.getElementById("computerSelection");
const l_userScore = document.getElementById("userScore");
const l_computerScore = document.getElementById("computerScore");

//DEFAULTS
//gameScreen elements are hidden by default
for(let element of l_gameScreenItems) {
  element.remove();
}

//results is hidden by default
l_resultsScreen.remove();

//computer choice chances are 33.33% at the beginning
let l_rockChance = 33.33;
let l_paperChance = 33.33;
let l_scissorsChance = 33.33;

//rank of each is 0 at the start
let l_rockRank = 0;
let l_paperRank = 0;
let l_scissorsRank = 0;

//cost of each upgrade
let l_rockUpgradeCost = 50;
let l_paperUpgradeCost = 50;
let l_scissorsUpgradeCost = 50;
let l_expBonusCost = 25;

//players start the game at 0 xp
let l_playerExperience = 0;

//player & computer start game at 0 points
let l_playerPoints = 0;
let l_computerPoints = 0;
let l_pointMultiplier = 1;

//spell VARIABLES
let l_spellFlatExperienceBonus = 0;
let l_spellExperienceMultiplier = 1;
let l_spellWinNextDraw = false;
let l_spellWinAllDraws = false;
let l_numEpicSpells = 4;
let l_numLegendarySpells = 5;
let m_hasRockDwayne = false;
let m_hasPaperDwayne = false;
let m_hasScissorsDwayne = false;

//rock special VARIABLES
let m_protected = false;

//BUTTON FUNCTIONALITY
//game guide
l_guideLink.addEventListener("click", function() {
  l_body.appendChild(l_gameGuide); //opens game guide
});
l_closeGuideBtn.addEventListener("click", function() {
  l_gameGuide.remove();
});

//results overview
function showResults() {
	l_body.appendChild(l_resultsScreen);
}
l_closeResultsBtn.addEventListener("click", function() {
	//reset spell multiplier
	if(l_spellExperienceMultiplier > 1) {
		l_resultsHeaderRow.deleteCell(4);
		l_resultsBreakdownRow.deleteCell(4);
	}
	//reset spell experience gains
	if(l_spellFlatExperienceBonus > 0){
		l_resultsHeaderRow.deleteCell(4);
		l_resultsBreakdownRow.deleteCell(4);
	}

	//reset spell pertinent spell effects
	l_spellFlatExperienceBonus = 0;
	l_spellExperienceMultiplier = 1;

	l_resultsScreen.remove();
});

//homeScreen
l_startGameBtn.addEventListener("click", function(e) {
  for(let i = 0; i < l_homeScreenItems.length; i++) {
    //remove homeScreen items
    l_homeScreenItems[i].remove();

    //add gameScreen items
    l_body.appendChild(l_gameScreenItems[i]);

  }
	//reset points
	l_playerPoints = 0;
	l_computerPoints = 0;
});
//upgrade buttons
l_rockUpgradeBtn.addEventListener("click", function() {
	//check if they even have enough xp
	if(l_playerExperience >= l_rockUpgradeCost) {
		if(l_rockRank == 4) {
			l_rockUpgradeBtn.disabled = true;
			l_rockUpgradeBtn.innerText = "Maxed Out";
			l_rockUpgradeBtn.classList.remove("glow");
		}

		//decrease player Experience accordingly
		l_playerExperience -= l_rockUpgradeCost;

		//increase cost of next upgrade
		switch(l_rockRank) {
			case 0:
				l_rockUpgradeCost = 100;
				l_equippedRock.innerText = "Coal";
				l_rockRankText.innerText = "I";
				l_rockUpgradeTitle.innerText = "Quartz";
				l_rockUpgradeDescription.innerText = "There is a 75% chance on a loss this round that your opponent will not gain a point.";
				if(!m_hasRockDwayne) {
					l_rockBtn.src = "img/rock/coal.jpg";
				}
				break;
			case 1:
				l_rockUpgradeCost = 200;
				l_equippedRock.innerText = "Quartz";
				l_rockRankText.innerText = "II";
				l_rockUpgradeTitle.innerText = "Topaz";
				l_rockUpgradeDescription.innerText = "There is a 75% chance on your next loss this game that your opponent will not gain a point.";
				if(!m_hasRockDwayne) {
					l_rockBtn.src = "img/rock/quartz.jpg";
				}
				break;
			case 2:
				l_rockUpgradeCost = 500;
				l_equippedRock.innerText = "Topaz"
				l_rockRankText.innerText = "III";
				l_rockUpgradeTitle.innerText = "Moissanite";
				l_rockUpgradeDescription.innerText = "There is a 75% chance on a loss this round that your opponent will not gain a point and a 50% chance that your opponent will not gain a point on your next loss this game.";
				if(!m_hasRockDwayne) {
					l_rockBtn.src = "img/rock/topaz.png";
				}
				break;
			case 3:
				l_rockUpgradeCost = 1000;
				l_equippedRock.innerText = "Moissanite";
				l_rockRankText.innerText = "IV";
				l_rockUpgradeTitle.innerText = "Diamond";
				l_rockUpgradeDescription.innerText = "There is a 90% chance on a loss this round that your opponent will not gain a point and a 90% chance on your next loss this game that your opponent will not gain a point.";
				if(!m_hasRockDwayne) {
					l_rockBtn.src = "img/rock/moissanite.png";
				}
				break;
			case 4:
				l_rockUpgradeCost = 9999;
				l_equippedRock.innerText = "Diamond";
				l_rockRankText.innerText = "V";
				l_rockUpgradeTitle.innerText = "Fully Upgraded";
				l_rockUpgradeDescription.innerText = "";
				if(!m_hasRockDwayne) {
					l_rockBtn.src = "img/rock/diamond.png";
				}
				break;
		}

		//increase rank of rock
		l_rockRank++;

		//update the expreience counter at the Top 
		l_experienceDisplay.innerText = l_playerExperience + " xp";


		//adjust the necessary elements to reflect the upgrade
		if(l_rockRank == 5) {
			l_rockNextUpgradeReqExp.innerText = "";
		} else {
			l_rockNextUpgradeReqExp.innerText = l_rockUpgradeCost + " xp";
		}
		
		
		//adjust the chance that the computer will choose paper over rock and scissors
		l_rockChance -= 1;
		l_paperChance += 2;
		l_scissorsChance -= 1;
	} else {
		alert(`You need ${l_rockUpgradeCost - l_playerExperience} more experience to upgrade!  Play more games to increase your experience!`);
	}
	
});

l_paperUpgradeBtn.addEventListener("click", function() {
	if(l_playerExperience >= l_paperUpgradeCost) {
		if(l_paperRank == 4) {
			l_paperUpgradeBtn.disabled = true;
			l_paperUpgradeBtn.innerText = "Maxed Out";
			l_paperUpgradeBtn.classList.remove("glow");
		}

		//decrease player Experience accordingly
		l_playerExperience -= l_paperUpgradeCost;

		switch(l_paperRank) {
			case 0:
				l_paperUpgradeCost = 100;
				l_equippedPaper.innerText = "Scroll";
				l_paperRankText.innerText = "I";
				l_paperUpgradeTitle.innerText = "Spellbook";
				l_paperUpgradeDescription.innerText = "Upon winning with paper, there is a 75% chance to activate a common spell, a 20% chance to activate a rare spell, and a 5% chance to activate an epic spell.";
				if(!m_hasPaperDwayne) { 
					l_paperBtn.src = "img/paper/scroll.png";
				}		
				
				break;
			case 1:
				l_paperUpgradeCost = 200;
				l_equippedPaper.innerText = "Spellbook";
				l_paperRankText.innerText = "II";
				l_paperUpgradeTitle.innerText = "Lexicon";
				l_paperUpgradeDescription.innerText = "Upon winning with paper, there is a 25% chance to activate a common spell, a 50% chance to activate a rare spell, and a 25% chance to activate an epic spell.";
				if(!m_hasPaperDwayne) { 
					l_paperBtn.src = "img/paper/spellbook.png";
				}
				
				break;
			case 2:
				l_paperUpgradeCost = 500;
				l_equippedPaper.innerText = "Lexicon"
				l_paperRankText.innerText = "III";
				l_paperUpgradeTitle.innerText = "Grimoire";
				l_paperUpgradeDescription.innerText = "Upon winning with paper, there is a 60% chance to activate a rare spell, a 35% chance to activate an epic spell, and a 5% chance to activate a LEGENDARY spell.";
				if(!m_hasPaperDwayne) {
					l_paperBtn.src = "img/paper/lexicon.png";
				}
				break;
			case 3:
				l_paperUpgradeCost = 1000;
				l_equippedPaper.innerText = "Grimoire";
				l_paperRankText.innerText = "IV";
				l_paperUpgradeTitle.innerText = "Sovereign Intellect";
				l_paperUpgradeDescription.innerText = "Regardless of the outcome, there is a 30% chance to activate a rare spell, a 60% chance to activate an epic spell, and a 10% chance to activate a LEGENDARY spell.";
				if(!m_hasPaperDwayne) {
					l_paperBtn.src = "img/paper/grimoire.png";
				}
				
				break;
			case 4:
				l_paperUpgradeCost = 9999;
				l_equippedPaper.innerText = "Sovereign Intellect";
				l_paperRankText.innerText = "V";
				l_paperUpgradeTitle.innerText = "Fully Upgraded";
				l_paperUpgradeDescription.innerText = "";
				if(!m_hasPaperDwayne) {
					l_paperBtn.src = "img/paper/sovereignIntellect.jpg";
				}
				break;
		}

		//incrase rank of paper
		l_paperRank++;

		//update the expreience counter at the Top 
		l_experienceDisplay.innerText = l_playerExperience + " xp";

		if(l_paperRank == 5) {
			l_paperNextUpgradeReqExp.innerText = "";
		} else {
			l_paperNextUpgradeReqExp.innerText = l_paperUpgradeCost + " xp";
		}

		//adjust the chance that the computer will choose paper over rock or scissors
		l_rockChance -= 1;
		l_paperChance -= 1;
		l_scissorsChance += 2;
	} else {
		alert(`You need ${l_paperUpgradeCost - l_playerExperience} more experience to upgrade!  Play more games to increase your experience!`);
	}
	
});

l_scissorUpgradeBtn.addEventListener("click", function() {
	if(l_playerExperience >= l_scissorsUpgradeCost) {
		if(l_scissorsRank == 4) {
			l_scissorUpgradeBtn.disabled = true;
			l_scissorUpgradeBtn.innerText = "Maxed Out";
			l_scissorUpgradeBtn.classList.remove("glow");
		}

		//decrease player Experience accordingly
		l_playerExperience -= l_scissorsUpgradeCost;

		switch(l_scissorsRank) {
			case 0:
				l_scissorsUpgradeCost = 100;
				l_equippedScissors.innerText = "Kitchen Scissors";
				l_scissorsRankText.innerText = "I";
				l_scissorsUpgradeTitle.innerText = "Sheep Shears";
				l_scissorsUpgradeDescription.innerText = "Upon winning with scissors, there is a 75% chance to gain an additional point.";
				if(!m_hasScissorsDwayne) {
					l_scissorsBtn.src = "img/scissors/kitchenScissors.png";
				}
				break;
			case 1:
				l_scissorsUpgradeCost = 200;
				l_equippedScissors.innerText = "Trauma Scissors";
				l_scissorsRankText.innerText = "II";
				l_scissorsUpgradeTitle.innerText = "Sheep Shears";
				l_scissorsUpgradeDescription.innerText = "Upon winning with scissors, there is a 75% chance to gain an additional point, or a 10% chance to gain 2 additional points.";
				if(!m_hasScissorsDwayne) {
					l_scissorsBtn.src = "img/scissors/traumaScissors.jpg";
				}
				break;
			case 2:
				l_scissorsUpgradeCost = 500;
				l_equippedScissors.innerText = "Sheep Shears"
				l_scissorsRankText.innerText = "III";
				l_scissorsUpgradeTitle.innerText = "Bolt Cutters";
				l_scissorsUpgradeDescription.innerText = "Upon winning with scissors, there is a 75% chance to gain an additional point, or a 20% chance to gain 2 additional points.";
				if(!m_hasScissorsDwayne) {
					l_scissorsBtn.src = "img/scissors/sheepShears.jpg";
				}
				break;
			case 3:
				l_scissorsUpgradeCost = 1000;
				l_equippedScissors.innerText = "Bolt Cutters";
				l_scissorsRankText.innerText = "IV";
				l_scissorsUpgradeTitle.innerText = "Gro'noth, Destroyer of Worlds";
				l_scissorsUpgradeDescription.innerText = "Upon losing with scissors, you have a 50% chance of gaining an additional point. If you win with scissors, there is a 50% chance to gain 2 additional points, and a 10% chance to win the game immedietly.";
				if(!m_hasScissorsDwayne) {
					l_scissorsBtn.src = "img/scissors/boltCutters.jpg";
				}
				break;
			case 4:
				l_scissorsUpgradeCost = 9999;
				l_equippedScissors.innerText = "Gro'noth, Destroyer of Worlds";
				l_scissorsRankText.innerText = "V";
				l_scissorsUpgradeTitle.innerText = "Fully Upgraded";
				l_scissorsUpgradeDescription.innerText = "";
				if(!m_hasScissorsDwayne) {
					l_scissorsBtn.src = "img/scissors/worldEnder.png";
				}
				break;
		}

		//increase rank of scissors
		l_scissorsRank++;

		//update the expreience counter at the Top 
		l_experienceDisplay.innerText = l_playerExperience + " xp";

		if(l_scissorsRank == 5) {
			l_scissorsNextUpgradeReqExp.innerText = "";
		} else {
			l_scissorsNextUpgradeReqExp.innerText = l_scissorsUpgradeCost + " xp";
		}

		//adjust the chance that the computer will choose scissors over rock or paper
		l_rockChance += 2;
		l_paperChance -= 1;
		l_scissorsChance -= 1;
	} else {
		alert(`You need ${l_scissorsUpgradeCost - l_playerExperience} more experience to upgrade!  Play more games to increase your experience!`);
	}
});

l_expBonusBtn.addEventListener("click", function() {
	//make sure user has enough points 
	if(l_playerExperience < l_expBonusCost) {
		alert(`You need ${l_expBonusCost - l_playerExperience} more experience to buy that!`);
	} else {
		//deduct experience from user
		l_playerExperience -= l_expBonusCost;

		//apply bonus xp
		if(l_pointMultiplier == 1) {
			l_pointMultiplier = 2;
		} else {
			l_pointMultiplier += 2;
		}

		//reflect changes on active activeEffects & experience
		l_activeEffects.innerText = `Experience Bonus: ${l_pointMultiplier}`;
		l_experienceDisplay.innerText = l_playerExperience + " xp";
	}
});

//GAMESCREEN
//button functionality
l_returnBtn.addEventListener("click", function() {
	returnToHome();
});

function returnToHome() {
	for(let i = 0; i < l_gameScreenItems.length; i++) {
    //remove gameScreen items
    l_gameScreenItems[i].remove();

    //add homeScreen items
    l_body.appendChild(l_homeScreenItems[i]);
  }
  //reset the images of the choices
  l_userChoice.src = "";
  l_computerChoice.src = "";
}

//User Selection Buttons
l_rockBtn.addEventListener("click", function() {
	let l_outcome = playRound("rock");

	//Spell to win draws
	if(l_outcome == 0 && (l_spellWinNextDraw || l_spellWinAllDraws)) {
		l_outcome = 1;
		l_spellWinNextDraw = false;
	}

	  //change image of userSelection to a rock appropriate to their winnings
	if(m_hasRockDwayne) {
		l_userChoice.src = "img/rock/Dwayne_rock.png";
	} else {
		switch(l_rockRank) {
			case 1: //Coal
				l_userChoice.src = "img/rock/coal.jpg";

				//coal special ability
				if(l_outcome == -1 && getRandomInt(0, 1) == 1) {
					l_outcome = 1;
					showPopUp("coal", "Opponent didn't gain a point");
				}
				break;
			case 2: //Quartz
				l_userChoice.src = "img/rock/quartz.jpg";

				//quartz special ability
				if(l_outcome == -1 && getRandomInt(0, 3) > 0) {
					l_outcome = 1;
					showPopUp('quartz', "Opponent didn't gain a point");
				}
				break;
			case 3: //Topaz
				l_userChoice.src = "img/rock/topaz.png";

				//topaz special ability
				if(getRandomInt(0, 3) > 0) {
					m_protected = true;
					showPopUp('protection', "Your next loss won't hurt!");
				}
				break;
			case 4: //Moissanite
				l_userChoice.src = "img/rock/moissanite.png";

				//moissanite special ability
				if(l_outcome == -1 && getRandomInt(0, 3) > 0) {
					l_outcome = 1;
					showPopUp('moissanite', "Opponent didn't gain a point");
				}
				if(getRandomInt(0,1) == 1) {
					m_protected = true;
					showPopUp('protection', "Your next loss won't hurt!");
				}
				break;
			case 5: //Diamond
				l_userChoice.src = "img/rock/diamond.png";

				//diamond special ability
				if(l_outcome == -1 && getRandomInt(1, 10) > 1) {
					l_outcome = 1;
					showPopUp('diamond', "Opponent didn't gain a point");
				}
				if(getRandomInt(1, 10) > 1) {
					showPopUp('protection', "Your next loss won't hurt!");
					m_protected = true;
				}
				break;
			default: //rock
				l_userChoice.src = "img/rock/rock.jpg";
				break;
		}
	}	

	//rock special
	if(m_protected && l_outcome == -1) {
		l_outcome = 1;
		m_protected = false;
		showPopUp('rockSpecial', "Opponent didn't gain a point");
	}
	//outcome logic
	if(l_outcome == -1) { //loss
		l_outcomeText.innerText = "You Lost!";
		l_outcomeText.style.color = "red";
		l_computerPoints++;
		l_computerScore.innerText = l_computerPoints;
	} else if(l_outcome == 0) { //draw
		l_outcomeText.innerText = "Draw!";
		l_outcomeText.style.color = "white";
	} else if(l_outcome == 1) { //win
		l_outcomeText.innerText = "You won!";
		l_outcomeText.style.color = "green";
		l_playerPoints++;
		l_userScore.innerText = l_playerPoints;
	}

	//test if the player or computer has won the game
	if(l_playerPoints >= 5) {
		endGame(true);
	} else if(l_computerPoints == 5) {
		endGame(false);
	}
});
l_paperBtn.addEventListener("click", function() {
	//change image of userSelection to a paper appropriate to their winnings
	if(m_hasPaperDwayne) {
		l_userChoice.src = "img/paper/Dwayne_paper.png";
	} else {
		switch(l_paperRank) {
			case 1: //Scroll
				l_userChoice.src = "img/paper/scroll.png";
				break;
			case 2: //Spellbook
				l_userChoice.src = "img/paper/spellbook.png";
				break;
			case 3: //Lexicon
				l_userChoice.src = "img/paper/lexicon.png";
				break;
			case 4: //Grimiore
				l_userChoice.src = "img/paper/grimoire.png";
				break;
			case 5: //Sovereign Intellect
				l_userChoice.src = "img/paper/sovereignIntellect.jpg";
				break;
			default: //paper
				l_userChoice.src = "img/paper/paper.jpg";
				break;
		}
	}	

	let l_outcome = playRound("paper");

	//Spell to win draws
	if(l_outcome == 0 && (l_spellWinNextDraw || l_spellWinAllDraws)) {
		l_outcome = 1;
		l_spellWinNextDraw = false;
	}

	//rock special
	if(m_protected && l_outcome == -1) {
		l_outcome = 1;
		m_protected = false;
		showPopUp('rockSpecial', "Opponent didn't gain a point");
	}

	//outcome logic
	if(l_outcome == -1) { //loss
		l_outcomeText.innerText = "You Lost!";
		l_outcomeText.style.color = "red";
		l_computerPoints++;
		l_computerScore.innerText = l_computerPoints;
	} else if(l_outcome == 0) { //draw
		l_outcomeText.innerText = "Draw!";
	} else if(l_outcome == 1) { //win
		//spells
		let l_determinator = getRandomInt(1, 100);
		if(l_paperRank == 1) { //rank 1
			if(l_determinator <= 50) {
				console.log("casting a common spell");
				commonSpell();
			} else if(l_determinator <= 55) {
				console.log("casting a rare spell");
				rareSpell();
			}
		} else if(l_paperRank == 2) { //rank 2
			if(l_determinator <= 75) {
				commonSpell();
			} else if(l_determinator <= 95) {
				rareSpell();
			} else if(l_determinator <= 100) {
				epicSpell();
			}
		} else if(l_paperRank == 3) { //rank 3
			if(l_determinator <= 25) {
				commonSpell();
			} else if(l_determinator <= 75) {
				rareSpell();
			} else if(l_determinator <= 100) {
				epicSpell();
			}
		} else if(l_paperRank == 4) { //rank 4
			if(l_determinator <= 60) {
				rareSpell();
			} else if(l_determinator <= 95) {
				epicSpell();
			} else if(l_determinator <= 100) {
				legendarySpell();
			}
		} else if(l_paperRank == 5) { //rank 5
			if(l_determinator <= 80) {
				epicSpell();
			} else if(l_determinator <= 100) {
				legendarySpell();
			}
		}

		l_outcomeText.innerText = "You won!";
		l_outcomeText.style.color = "green";
		l_playerPoints++;
		l_userScore.innerText = l_playerPoints;
	}

	//test if the player or computer has won the game
	if(l_playerPoints >= 5) {
		endGame(true);
	} else if(l_computerPoints == 5) {
		endGame(false);
	}
});

//spell functions
function commonSpell() {
	//determine the spell that will be cast
	const l_determinator = getRandomInt(1, 3);
	let l_spellDescription = "Default";
	
	if(l_determinator == 1) { //+1-5 xp
		let l_awardedXpBonus = getRandomInt(1, 5);
		l_spellFlatExperienceBonus += l_awardedXpBonus;
		l_spellDescription = `+${l_awardedXpBonus} experience`;
	} else if(l_determinator == 2) { //random background Color
		//repeat if the color isn't dark enough
		let l_tooLight = true;
		let l_color;
		while(l_tooLight) {;
			//generate the random background
			let l_options = "0123456789ABCDEF"
			l_color = "#";
			for(let i = 0; i < 6; i++) {
				l_color += l_options[getRandomInt(0, 15)];
			}
			console.log(`color: ${l_color}`);
			//test if the color is too light.
			if(parseInt(l_color) > 16565444) {
				l_tooLight = true;
				console.log("too light");
			} else {
				l_tooLight = false;
			}
		}

		//set background temporarily
		l_body.style.backgroundColor = l_color;
		l_spellDescription = "Changed background!";
	} else if(l_determinator == 3) { //Randomize the Scores
		l_spellDescription = "Randomized Scores!";
		l_playerPoints = getRandomInt(0, 4);
		l_userScore.innerText = l_playerPoints;
		l_computerPoints = getRandomInt(0, 4);
		l_computerScore.innerText = l_computerPoints;
	}
	//show the spell
	showPopUp('common', l_spellDescription);
}
function rareSpell() {
	let l_spellDescription = "Default";

	//determine which spell will be cast
	const l_determinator = getRandomInt(1, 4);

	switch(l_determinator) {
		//+20 xp bonus
		case 1:
			l_spellFlatExperienceBonus += 20;
			l_spellDescription = '+20 experience';
			break;
		//Gain x2 xp bonus
		case 2:
			if(l_spellExperienceMultiplier == 1) {
				l_spellExperienceMultiplier = 2;
			} else {
				l_spellExperienceMultiplier += 2;
			}
			l_spellDescription = 'x2 Experience Multiplier!';
			break;
		//Win the next draw
		case 3:
			l_spellWinNextDraw = true;
			l_spellDescription = 'Win NEXT draw this game';
			break;
		//Reverse Scores
		case 4:
			//change points
			let l_tempPoints = l_playerPoints;
			l_playerPoints = l_computerPoints;
			l_computerPoints = l_tempPoints;

			//reflect that on the DOM
			l_userScore.innerText = l_playerPoints;
			l_computerScore.innerText = l_computerPoints;

			l_spellDescription = 'Switch Scores!';
			break;
	}

	showPopUp('rare', l_spellDescription);
}
function epicSpell() {
	//determine which spell will be cast
	const l_determinator = getRandomInt(1, l_numEpicSpells);
	let l_spellDescription = "Default";

	switch(l_determinator) {
		//Gain x4 exp bonus THIS game
		case 1:
			if(l_spellExperienceMultiplier == 1) {
				l_spellExperienceMultiplier = 4;
			} else {
				l_spellExperienceMultiplier += 4;
			}
			l_spellDescription = 'x4 Experience Multiplier!';
			break;
		//Win all draws this game
		case 2:
			l_spellWinAllDraws = true;
			l_spellDescription = "Win ALL draws this game";
			break;
		//Set opponents score to 0
		case 3:
			l_computerPoints = 0;
			l_computerScore.innerText = l_computerPoints;
			l_spellDescription = "Computer Score set to 0";
			break;
		//change experience requirement for experience bonus
		case 4: 
			l_numEpicSpells = 3; //user can't cast this anymore
			l_expBonusCostSpan.innerText = "10 xp";
			l_expBonusCost = 10;
			l_spellDescription = "WHOA!  Experience bonus' cost 10 xp now instead of 25 xp!"
			break;
	}

	showPopUp('epic', l_spellDescription);
}
function legendarySpell() {
	let l_spellDescription = "Default";

	//determine which spell will be cast
	const l_determinator = getRandomInt(1, l_numLegendarySpells);

	if(l_determinator > 2) { //they get a Dwayne card
		if(!m_hasRockDwayne) {
			l_rockBtn.src = 'img/rock/Dwayne_rock.png';
			l_spellDescription = "UNLOCK!\nDWAYNE 'THE ROCK' JOHNSON";
			m_hasRockDwayne = true;
		} else if(!m_hasPaperDwayne) {
			l_paperBtn.src = 'img/paper/Dwayne_paper.png';
			l_spellDescription = "UNLOCK!\nDWAYNE 'THE PAPER' JOHNSON";
			m_hasPaperDwayne = true;
		} else if(!m_hasScissorsDwayne){
			l_scissorsBtn.src = 'img/scissors/Dwayne_scissors.png';
			l_spellDescription = "UNLOCK!\nDWAYNE 'THE SCISSORS' JOHNSON";
			m_hasScissorsDwayne = true;
		}
		l_numLegendarySpells--;
	} else {
		if(l_determinator == 1) { // Insta win!
			l_playerPoints = 10;
			l_userScore.innerText = 10;

			l_computerPoints = -10;
			l_computerScore.innerText = -10;
			l_spellDescription = 'Instant Win!!';
		} else if(l_determinator == 2) { //x10 multiplier
			if(l_spellExperienceMultiplier == 1) {
				l_spellExperienceMultiplier = 10;
			} else {
				l_spellExperienceMultiplier += 10;
			}
			l_spellDescription = "x10 Experience Multiplier";
		}
	}

	showPopUp('legendary', l_spellDescription);
}

l_scissorsBtn.addEventListener("click", function() {
	//change image of userSelection to a scissors appropriate to their winnings
	if(m_hasScissorsDwayne) {
		l_userChoice.src = "img/scissors/Dwayne_scissors.png";
	} else {
		switch(l_scissorsRank) {
			case 1: //Scroll
				l_userChoice.src = "img/scissors/kitchenScissors.png";
				break;
			case 2: //Spellbook
				l_userChoice.src = "img/scissors/traumaScissors.jpg";
				break;
			case 3: //Lexicon
				l_userChoice.src = "img/scissors/sheepShears.jpg";
				break;
			case 4: //Grimiore
				l_userChoice.src = "img/scissors/boltCutters.jpg";
				break;
			case 5: //Sovereign Intellect
				l_userChoice.src = "img/scissors/worldEnder.png";
				break;
			default: //scissors
				l_userChoice.src = "img/scissors/scissors.jpg";
				break;
		}
	}

	let l_outcome = playRound("scissors");

	//Spell to win draws
	if(l_outcome == 0 && (l_spellWinNextDraw || l_spellWinAllDraws)) {
		l_outcome = 1;
		l_spellWinNextDraw = false;
	}

	//rock special
	if(m_protected && l_outcome == -1) {
		l_outcome = 1;
		m_protected = false;
		showPopUp('rockSpecial', "Opponent didn't gain a point");
	}

	//outcome logic
	if(l_outcome == -1) { //loss
		l_outcomeText.innerText = "You Lost!";
		l_outcomeText.style.color = "red";
		l_computerPoints++;
		l_computerScore.innerText = l_computerPoints;
	} else if(l_outcome == 0) { //draw
		l_outcomeText.innerText = "Draw!";
	} else if(l_outcome == 1) { //win
		l_outcomeText.innerText = "You won!";
		l_outcomeText.style.color = "green";
		l_playerPoints++;
		l_userScore.innerText = l_playerPoints;
	}
	//test if the player or computer has won the game
	if(l_playerPoints >= 5) {
		endGame(true);
	} else if(l_computerPoints == 5) {
		endGame(false);
	}
});

//GAME LOGIC
//randomly returns with 'rock', 'paper', or 'scissors'
function getComputerChoice() {
    //declare return variable
    let l_computerSelection = "";

    //generate a number between 1-100
    let l_determinator = parseInt(Math.random() * 100) + 1;
		
		let l_rockDeterminator = l_rockChance;
		let l_paperDeterminator = l_rockChance + l_paperChance;

    //determine if that number will be a rock, paper or scissors
    if(l_determinator <= l_rockDeterminator) {
			l_computerSelection = "rock";
		} else if(l_determinator <= l_paperDeterminator) {
			l_computerSelection = "paper";
		} else {
			l_computerSelection = "scissors";
		}
		l_computerChoice.src = `img/${l_computerSelection}/${l_computerSelection}.jpg`;
    return l_computerSelection;
}

//handles logic of a round.  Returns a 0 for a draw, 1 for a player win, and -1 for a computer win
function playRound(a_playerChoice) {
  let l_computerSelection= getComputerChoice();
  if(a_playerChoice == l_computerSelection) {
    return 0;
  } else if((a_playerChoice == "rock" && l_computerSelection == "scissors") 
          || (a_playerChoice == "paper" && l_computerSelection == "rock")
          || (a_playerChoice == "scissors" && l_computerSelection == "paper")) {
    return 1;
  } else {
    return -1;
  }
}

//wraps up the final score
function endGame(a_isVictorious) {
	//reset game Elements
	l_userScore.innerText = "0";
	l_computerScore.innerText = "0";
	l_outcomeText.innerText = "";

	if(a_isVictorious) {
		returnToHome();

		showResults();
		l_victoryOrDeath.innerText = "VICTORY!";
		l_victoryOrDeath.style.color ="green";
		
		//calcuate points
		l_playerExperience += 5 * (l_playerPoints - l_computerPoints) * l_pointMultiplier * l_spellExperienceMultiplier + l_spellFlatExperienceBonus;
		l_experienceDisplay.innerText = l_playerExperience + " xp";

		//show breakown correctly
		l_baseExpBreakdown.innerText = "5";
		l_winMarginText.innerText = l_playerPoints - l_computerPoints;
		l_expMultiplierBreakdown.innerText = l_pointMultiplier;
		l_experienceFinal.innerText = 5 * (l_playerPoints - l_computerPoints) * l_pointMultiplier * l_spellExperienceMultiplier + l_spellFlatExperienceBonus;

		//if there was added xp from spells, add that in the table here
		if(l_spellFlatExperienceBonus > 0) {
			let l_addedFlatExpCellTitle = l_resultsHeaderRow.insertCell(4);
			l_addedFlatExpCellTitle.innerText = "Flat Spell Bonus";
			l_addedFlatExpCellTitle.style.fontSize = "16px";
			l_addedFlatExpCellTitle.style.fontWeight = "bold";
			let l_addedFlatExpCellData = l_resultsBreakdownRow.insertCell(4);
			l_addedFlatExpCellData.style.fontSize = "16px";
			l_addedFlatExpCellData.innerText = `+ ${l_spellFlatExperienceBonus}`;
		}
		if(l_spellExperienceMultiplier > 1) { //tests if there was a multiplier added
			let l_addedSpellMultiplierTitle = l_resultsHeaderRow.insertCell(4);
			l_addedSpellMultiplierTitle.innerText = "Spell Multiplier";
			l_addedSpellMultiplierTitle.style.fontSize = "16px";
			l_addedSpellMultiplierTitle.style.fontWeight = "bold";
			let l_addedSpellMultiplierData = l_resultsBreakdownRow.insertCell(4);
			l_addedSpellMultiplierData.innerText = l_spellExperienceMultiplier;
		}
	} else {
		returnToHome();
		showResults();

		l_victoryOrDeath.innerText = "DEFEAT";
		l_victoryOrDeath.style.color ="red";

		l_baseExpBreakdown.innerText = 0;
		l_winMarginText.innerText = 0;
		l_expMultiplierBreakdown.innerText = l_pointMultiplier;
		l_experienceFinal.innerText = 0;

		//spell effects on defeat
		l_spellExperienceMultiplier = 1;
		l_spellFlatExperienceBonus = 0;
	}

	//reset spell effects
	l_spellWinAllDraws = false;
	l_spellWinNextDraw = false;

	//reset activeEffects
	l_activeEffects.innerText = "";
	l_pointMultiplier = 1;
	l_body.style.backgroundColor = "black";
}

async function showPopUp(a_title, a_description) {
	//create a div to show the spell
	const l_spellEffectScreen = document.createElement("div");
	l_spellEffectScreen.classList.add("spellEffect");
	//the div will spawn on a random part of the screen
	l_spellEffectScreen.style.left = `${getRandomInt(15, 80)}%`;
	l_spellEffectScreen.style.top = `-${getRandomInt(300, 900)}px`;
	l_body.appendChild(l_spellEffectScreen);

	const l_spellEffectTitle = document.createElement("H1");
	l_spellEffectTitle.style.color = "white";
	l_spellEffectScreen.appendChild(l_spellEffectTitle);

	const l_spellDescription = document.createElement("p");
	l_spellDescription.style.fontSize = "18px";
	l_spellDescription.innerText = a_description;
	l_spellEffectScreen.appendChild(l_spellDescription);

	//change title and description based on rarity of the spell
	switch(a_title) {
		case 'common':
			l_spellEffectTitle.innerText = "Common";
			l_spellEffectScreen.style.backgroundColor = "grey";
			break;
		case 'rare':
			l_spellEffectTitle.innerText = "Rare";
			l_spellEffectScreen.style.backgroundColor = "blue";
			break;
		case 'epic':
			l_spellEffectTitle.innerText = "Epic";
			l_spellEffectScreen.style.backgroundColor = "purple";
			break;
		case 'legendary':
			l_spellEffectTitle.innerText = "Legendary";
			l_spellEffectScreen.style.backgroundColor = "orange";
			break;
		case 'coal':
			l_spellEffectTitle.innerText = "Coal Special";
			l_spellEffectScreen.style.backgroundColor = "black";
			break;
		case 'quartz':
			l_spellEffectTitle.innerText = "Quartz Special";
			l_spellEffectScreen.style.backgroundColor = "#51414F";
			break;
		case 'moissanite':
			l_spellEffectTitle.innerText = "Moissanite Special";
			l_spellEffectScreen.style.backgroundColor = "#201935";
			break;
		case 'diamond':
			l_spellEffectTitle.innerText = "Diamond Special";
			l_spellEffectScreen.style.backgroundColor = "#cbe3f0";
			break;
		case 'rockSpecial':
			l_spellEffectTitle.innerText = "Rock Protection!";
			l_spellEffectScreen.style.backgroundColor = "#918E85";
			break;
		case 'protection':
			l_spellEffectTitle.innerText = "Future Protection";
			l_spellEffectScreen.style.backgroundColor = "#918E85";
	}
	

	l_spellEffectScreen.classList.add("fadeInItems");
	await sleep(2000);
	l_spellEffectScreen.classList.remove("fadeInItems");
	l_spellEffectScreen.classList.add("fadeOutItems");
	await sleep(2000);
	l_spellEffectScreen.classList.remove("fadeOutItems");
	l_spellEffectScreen.remove();
}

//returns an int between two numbers (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//sleeps for ms amount (ref: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}