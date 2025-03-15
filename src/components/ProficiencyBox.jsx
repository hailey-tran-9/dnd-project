import { useContext } from "react";
import { CharacterContext } from "./contexts/CharacterContext.jsx";

export default function ProficiencyBox({ ability, isProficient }) {
    const { charData } = useContext(CharacterContext);
    let classes = "w-2 h-2 rounded border-2 border-black self-center mr-1";
    // if (charData.abilities[ability].proficient) {
    //     classes += " bg-black";
    // } else {
    //     classes += " bg-white";
    // }

    if (isProficient) {
        classes += " bg-black";
    } else {
        classes += " bg-white";
    }

    return (
        <div className={classes}></div>
    );
}