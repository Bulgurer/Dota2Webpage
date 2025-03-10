export default function SkillBuild({ abilitiesInfo }) {
  let relevantAbilities = abilitiesInfo
    ? DecideAbilitiesToKeep(abilitiesInfo)
    : null;
  if (relevantAbilities === null) {
    return;
  }
  const abilityNames = relevantAbilities.map((abilitiesInfo) => (
    <li key={abilitiesInfo.slot}>{abilitiesInfo.ability.name}</li>
  )); // Populate with ability names/icons if available
  return (
    <div>
      <h1>Skill Build</h1>
      <ol>{abilityNames}</ol>
    </div>
  );
}

function DecideAbilitiesToKeep(abilitiesInfo) {
  let filter = {
    // things to filter OUT
    name: "generic_hidden", // this is always the placeholder for an ability that doesnt exist
    isInnate: true, // Innates cannot be leveled as far as I know
    isGrantedByScepterOrAghs: true, // We dont want abilities that the hero does not have at start of game
    isReleaseAbility: true, // We dont want abilities that are just glorified stop key buttons.
    badAbilitiesIds: [980], // Abilities that need to be singled out because there is no other way to filter them
  };

  let filteredAbilitiesInfo = abilitiesInfo.filter((abilityInfo) => {
    for (let key in filter) {
      switch (key) {
        case "name":
          if (abilityInfo.ability.name === filter[key]) {
            // if ability name is generic_hidden, filter out
            return false;
          }
          break;
        case "isInnate":
          if (abilityInfo.ability.stat.isInnate) {
            // if ability is innate, filter out
            return false;
          }
          break;
        case "isGrantedByScepterOrAghs":
          if (
            abilityInfo.ability.stat.isGrantedByScepter ||
            abilityInfo.ability.stat.isGrantedByShard
          ) {
            // if ability is granted by scepter or aghs, filter out
            return false;
          }
          break;
        case "isReleaseAbility":
          if (!abilityInfo.ability.language.attributes.length) {
            /* this is some stupid shit, there is no way to check if an ability is just a 'release' ability 
            like primal beast's release onslaught. HOWEVER, those abilities have an empty array as their attribute value
            while everything else has at least something in that array. This is bad code but I cant figure out another way to
            account for these abilities*/
            return false;
          }
          break;
        case "badAbilitiesIds":
          if (filter[key].includes(abilityInfo.ability.id)) {
            return false;
          }
      }
    }
    return true; // if it passes all the filters, keep it
  });
  console.log(abilitiesInfo);
  return filteredAbilitiesInfo;
}
