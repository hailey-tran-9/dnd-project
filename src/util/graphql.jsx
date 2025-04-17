import { gql } from "@apollo/client";

export const GET_CLASSES = gql`
  query Classes {
    classes {
      index
      name
      hit_die
      proficiencies {
        index
        name
        type
      }
      spellcasting {
        spellcasting_ability {
          index
          name
        }
      }
      starting_equipment {
        quantity
        equipment {
          index
          name
        }
      }
    }
  }
`;

export const GET_CLASS = gql`
  query Class($index: String) {
    class(index: $index) {
      index
      name
      hit_die
      proficiencies {
        type
        index
        name
      }
      proficiency_choices {
        desc
        choose
        type
        from {
          option_set_type
          options {
            ... on ProficiencyReferenceOption {
              item {
                index
                name
              }
            }
          }
        }
      }
    }
  }
`;
