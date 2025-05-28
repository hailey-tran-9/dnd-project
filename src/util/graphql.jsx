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
                  ... on CountedReferenceOption {
                    count
                    option_type
                    of {
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
              }
            }
          }
          ... on EquipmentCategoryOptionSet {
            option_set_type
            equipment_category {
              index
              name
              equipment {
                desc
                index
                name
              }
            }
          }
        }
      }
      spells {
        area_of_effect {
          size
          type
        }
        attack_type
        casting_time
        concentration
        damage {
          damage_at_character_level {
            damage
            level
          }
        }
        dc {
          desc
          success
          type {
            index
            name
            full_name
          }
        }
        desc
        duration
        heal_at_slot_level {
          healing
          level
        }
        higher_level
        index
        level
        name
        range
        ritual
        school {
          desc
          index
          name
        }
      }
      spellcasting {
        spellcasting_ability {
          desc
          full_name
          index
          name
        }
      }
      class_levels {
        ability_score_bonuses
        features {
          index
          name
          level
          desc
        }
        spellcasting {
          cantrips_known
          spell_slots_level_1
          spell_slots_level_2
          spell_slots_level_3
          spell_slots_level_4
          spell_slots_level_5
          spell_slots_level_6
          spell_slots_level_7
          spell_slots_level_8
          spell_slots_level_9
          spells_known
        }
        level
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
      ability_score {
        index
        name
      }
      desc
      index
      name
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