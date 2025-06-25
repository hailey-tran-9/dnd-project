import { gql } from "@apollo/client";

export const GET_CLASS = gql`
  query Class($index: String!) {
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
            option_type
            item {
              ... on Proficiency {
                index
                name
                type
                reference {
                  ... on Equipment {
                    index
                    name
                    desc
                    equipment_category {
                      index
                      name
                    }
                    gear_category {
                      index
                      name
                    }
                    properties {
                      desc
                      index
                      name
                    }
                  }
                }
              }
              ... on ProficiencyChoice {
                choose
                type
                from {
                  options {
                    option_type
                    item {
                      ... on Proficiency {
                        index
                        name
                      }
                    }
                  }
                }
                desc
              }
            }
          }
        }
      }
      starting_equipment {
        quantity
        equipment {
          ... on Armor {
            index
            name
            desc
            equipment_category {
              index
              name
            }
            gear_category {
              index
              name
            }
            properties {
              desc
              index
              name
            }
            armor_category
            armor_class {
              base
              dex_bonus
              max_bonus
            }
            str_minimum
            stealth_disadvantage
          }
        }
      }
      starting_equipment_options {
        choose
        desc
        type
        from {
          ... on EquipmentCategorySet {
            equipment_category {
              index
              name
              equipment {
                ... on Armor {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  armor_category
                  armor_class {
                    base
                    dex_bonus
                    max_bonus
                  }
                  str_minimum
                  stealth_disadvantage
                }
                ... on Weapon {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  weapon_category
                  weapon_range
                  category_range
                  damage {
                    damage_type {
                      desc
                      index
                      name
                    }
                    damage_dice
                  }
                  two_handed_damage {
                    damage_type {
                      desc
                      index
                      name
                    }
                    damage_dice
                  }
                  range {
                    normal
                  }
                  throw_range {
                    normal
                  }
                }
                ... on Tool {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  tool_category
                }
                ... on Gear {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                }
                ... on Pack {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  contents {
                    quantity
                    item {
                      ... on Armor {
                        index
                        name
                      }
                      ... on Weapon {
                        index
                        name
                      }
                      ... on Tool {
                        index
                        name
                      }
                      ... on Gear {
                        index
                        name
                      }
                      ... on Pack {
                        index
                        name
                      }
                      ... on Ammunition {
                        index
                        name
                      }
                      ... on Vehicle {
                        index
                        name
                      }
                    }
                  }
                }
                ... on Ammunition {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  quantity
                }
                ... on Vehicle {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  vehicle_category
                  speed {
                    quantity
                    unit
                  }
                  capacity
                }
                ... on MagicItem {
                  desc
                  equipment_category {
                    index
                    name
                  }
                  image
                  index
                  name
                  rarity {
                    name
                  }
                  variants {
                    index
                    name
                  }
                  variant
                }
              }
            }
            option_set_type
          }
          ... on EquipmentOptionSet {
            options {
              ... on CountedReferenceOption {
                option_type
                count
                of {
                  index
                  name
                  desc
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                }
              }
              ... on EquipmentCategoryChoiceOption {
                option_type
                choice {
                  choose
                  desc
                  type
                  from {
                    equipment_category {
                      index
                      name
                    }
                  }
                }
              }
              ... on MultipleItemsOption {
                option_type
                items {
                  ... on CountedReferenceOption {
                    option_type
                    count
                    of {
                      index
                      name
                      desc
                      equipment_category {
                        index
                        name
                      }
                      gear_category {
                        index
                        name
                      }
                      properties {
                        desc
                        index
                        name
                      }
                    }
                  }
                }
              }
            }
            option_set_type
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
          damage_type {
            index
            name
            desc
          }
          damage_at_character_level {
            level
            value
          }
        }
        dc {
          dc_type {
            index
            name
          }
          dc_success
          desc
        }
        desc
        duration
        heal_at_slot_level {
          level
          value
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
        info {
          desc
          name
        }
        level
        spellcasting_ability {
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
  query Race($index: String!) {
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
          options {
            option_type
            item {
              desc
              index
              name
              type
              typical_speakers
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
        choose
        type
        from {
          options {
            option_type
            item {
              ... on Proficiency {
                index
                name
                type
              }
              ... on ProficiencyChoice {
                choose
                type
                from {
                  options {
                    option_type
                    item {
                      ... on Proficiency {
                        index
                        name
                        type
                      }
                    }
                  }
                }
                desc
              }
            }
          }
        }
        desc
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
        desc
        full_name
        index
        name
        skills {
          index
          name
        }
      }
      desc
      index
      name
    }
  }
`;

export const GET_EQUIPMENT_INFO = gql`
  query EquipmentInfo($index: String!) {
    equipment(index: $index) {
      ... on Armor {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        armor_category
        armor_class {
          base
          dex_bonus
          max_bonus
        }
        str_minimum
        stealth_disadvantage
        desc
      }
      ... on Weapon {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          index
          name
        }
        weapon_category
        weapon_range
        category_range
        damage {
          damage_type {
            index
            name
          }
          damage_dice
        }
        two_handed_damage {
          damage_type {
            index
            name
          }
          damage_dice
        }
        range {
          normal
        }
        throw_range {
          normal
        }
        desc
      }
      ... on Tool {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        tool_category
        desc
      }
      ... on Gear {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        desc
      }
      ... on Pack {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        contents {
          quantity
          item {
            ... on Armor {
              index
              name
            }
            ... on Weapon {
              index
              name
            }
            ... on Tool {
              index
              name
            }
            ... on Gear {
              index
              name
            }
            ... on Pack {
              index
              name
            }
            ... on Ammunition {
              index
              name
            }
            ... on Vehicle {
              index
              name
            }
          }
        }
        desc
      }
      ... on Ammunition {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        quantity
        desc
      }
      ... on Vehicle {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        vehicle_category
        speed {
          quantity
          unit
        }
        capacity
        desc
      }
    }
  }
`;

export const GET_EQUIPMENT_CATEGORY_INFO = gql`
  query EquipmentCategoryInfo($index: String!) {
    equipmentCategory(index: $index) {
      index
      name
      equipment {
        ... on Armor {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          armor_category
          armor_class {
            base
            dex_bonus
            max_bonus
          }
          str_minimum
          stealth_disadvantage
        }
        ... on Weapon {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            index
            name
          }
          weapon_category
          weapon_range
          category_range
          damage {
            damage_type {
              index
              name
            }
            damage_dice
          }
          two_handed_damage {
            damage_type {
              index
              name
            }
            damage_dice
          }
          range {
            normal
          }
          throw_range {
            normal
          }
        }
        ... on Tool {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          tool_category
        }
        ... on Gear {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
        }
        ... on Pack {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          contents {
            quantity
            item {
              ... on Armor {
                index
                name
              }
              ... on Weapon {
                index
                name
              }
              ... on Tool {
                index
                name
              }
              ... on Gear {
                index
                name
              }
              ... on Pack {
                index
                name
              }
              ... on Ammunition {
                index
                name
              }
              ... on Vehicle {
                index
                name
              }
            }
          }
        }
        ... on Ammunition {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          quantity
        }
        ... on Vehicle {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          vehicle_category
          speed {
            quantity
            unit
          }
          capacity
        }
        ... on MagicItem {
          desc
          equipment_category {
            index
            name
          }
          image
          index
          name
          rarity {
            name
          }
          variants {
            index
            name
          }
          variant
        }
      }
    }
  }
`;

// TODO: Once 5e API updates backgrounds to include all of them, make it selectable
export const GET_BACKGROUNDS = gql`
  query Backgrounds {
    backgrounds {
      index
      name
      starting_proficiencies {
        index
        name
        type
        reference {
          ... on Equipment {
            index
            name
          }
          ... on EquipmentCategory {
            index
            name
          }
          ... on AbilityScore {
            desc
            index
            name
          }
          ... on Skill {
            desc
            index
            name
          }
        }
      }
      starting_equipment {
        equipment {
          index
          name
          desc
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
        }
        quantity
      }
      feature {
        desc
        name
      }
      flaws {
        choose
        type
        from {
          options {
            string
            option_type
          }
        }
      }
      bonds {
        choose
        type
        from {
          options {
            string
            option_type
          }
        }
      }
      personality_traits {
        choose
        type
        from {
          options {
            string
            option_type
          }
        }
      }
      ideals {
        choose
        type
        from {
          options {
            option_type
            desc
            alignments {
              desc
              index
              name
            }
          }
        }
      }
      language_options {
        choose
        type
        from {
          options {
            option_type
            item {
              desc
              index
              name
            }
          }
        }
      }
      starting_equipment_options {
        choose
        desc
        type
        from {
          ... on EquipmentCategorySet {
            equipment_category {
              index
              name
            }
          }
          ... on EquipmentOptionSet {
            options {
              ... on CountedReferenceOption {
                option_type
                count
                of {
                  index
                  name
                  desc
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
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
`;
