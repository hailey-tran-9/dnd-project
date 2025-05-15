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
          options {
            ... on ProficiencyReferenceOption {
              item {
                index
                name
                type
              }
              option_type
            }
            ... on ProficiencyChoiceOption {
              choice {
                choose
                desc
                type
                from {
                  options {
                    ... on ProficiencyReferenceOption {
                      item {
                        index
                        name
                        type
                      }
                    }
                  }
                }
              }
              option_type
            }
          }
        }
      }
      starting_equipment {
        quantity
        equipment {
          desc
          index
          name
          equipment_category {
            index
            name
          }
        }
      }
      starting_equipment_options {
        choose
        desc
        type
        from {
          ... on EquipmentOptionSet {
            option_set_type
            options {
              ... on CountedReferenceOption {
                option_type
                count
                prerequisites {
                  proficiency {
                    index
                    name
                  }
                }
                of {
                  index
                  name
                }
              }
              ... on EquipmentCategoryChoiceOption {
                option_type
                choice {
                  choose
                  type
                  from {
                    equipment_category {
                      index
                      name
                    }
                  }
                }
              }
              ... on EquipmentMultipleOption {
                option_type
                items {
                  ... on EquipmentCategoryChoiceOption {
                    option_type
                    choice {
                      choose
                      type
                      from {
                        equipment_category {
                          index
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_RACE = gql`
  query Race($index: String) {
    race(index: $index) {
      index
      name
      alignment
      speed
      size
      ability_bonuses {
        bonus
        ability_score {
          index
        }
      }
      ability_bonus_options {
        choose
        type
        from {
          option_set_type
          options {
            option_type
            bonus
            ability_score {
              index
            }
          }
        }
      }
      languages {
        index
        name
      }
      language_options {
        choose
        type
        from {
          option_set_type
          options {
            option_type
            item {
              index
              name
            }
          }
        }
      }
      starting_proficiencies {
        index
        name
        type
      }
      starting_proficiency_options {
        desc
        choose
        type
        from {
          option_set_type
          options {
            ... on ProficiencyReferenceOption {
              option_type
              item {
                index
                name
                type
              }
            }
          }
        }
      }
      traits {
        index
        name
        desc
      }
    }
  }
`;

export const GET_SKILLS = gql`
  query Skills {
    skills {
      index
      name
      ability_score {
        index
      }
    }
  }
`;

export const GET_EQUIPMENT_INFO = gql`
  query EquipmentInfo($index: String) {
    equipment(index: $index) {
      desc
      index
      name
      equipment_category {
        index
        name
      }
    }
  }
`;

export const GET_EQUIPMENT_CATEGORY_INFO = gql`
  query EquipmentCategoryInfo($index: String) {
    equipmentCategory(index: $index) {
      index
      name
      equipment {
        desc
        index
        name
        equipment_category {
          index
          name
        }
      }
    }
  }
`;
