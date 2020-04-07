var ssuCardData = [
    {
        'name1': 'Winter Child',
        'name2': 'Colonel Ivan Vasiliev, Smersh',
        'ap': 21,
        'hp': 6,
        'move': 3,
        'march': 6,
        'type': 'Infantry',
        'armor': 4,
        'abilities': [
            {
                'name': 'Damage Resilient',
                'description': 'Roll one die for each point of Damage the Unit Takes, negating one point for each ☭ rolled. Does not apply to Units Joined.'
            },
            {
                'name': 'Flying',
                'description': 'Unit ignores terrain. Does not share with units joined.'
            },
            {
                'name': 'Radiation',
                'description': 'Targets re-roll successful Saves against the weapon.'
            },
            {
                'name': 'Superhuman',
                'description': 'Passes Infantry Save on 🛡 as well as ☭ and can benefit from Cover, but not at the same time. May not Join a Unit.'
            }
        ],
        'attacks': [
            {
                'name': '2x Dual Steel Fists',
                'range': 'C',
                'infantry': [
                    '3/☠', '3/☠', '3/☠', '3/☠'
                ],
                'vehicle': [
                    '3/3', '3/3', '3/3', '3/3', '3/3', '3/3', '3/3'
                ],
                'aircraft': [
                    '3/3', '2/3', '1/3'
                ]
            },
            {
                'name': '2x Radiation Beam',
                'range': '4',
                'infantry': [
                    '🜹/1', '🜹/1', '🜹/1', '🜹/1'
                ],
                'vehicle': [
                    '🜹/☠', '🜹/☠', '🜹/4', '🜹/4', '🜹/3', '🜹/3', '🜹/2'
                ],
                'aircraft': [
                    '-', '-', '-'
                ]
            }
        ]
    }
];