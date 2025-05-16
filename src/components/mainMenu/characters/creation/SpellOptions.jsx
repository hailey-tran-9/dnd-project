import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_SPELLCASTING_ABILITY } from "../../../../util/graphql";

export default function SpellOptions({ enteredClass }) {
  const { loading, error, data } = useQuery(GET_SPELLCASTING_ABILITY, {
    variables: { level: 1, class: enteredClass },
  });

  let content;
  let canCastSpells = false;
  if (loading) {
    console.log("Loading...");
  } else if (error) {
    content = <p>Error</p>;
  } else {
    console.log(data);
    if (data.spells.length > 0) {
      canCastSpells = true;
    }
    console.log("can cast spells:", canCastSpells);
  }

  return (
    canCastSpells && (
      <div>
        <h2>Spells</h2>
        {content}
      </div>
    )
  );
}
