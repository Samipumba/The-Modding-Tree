addLayer("Z", {
    name: "Zero", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Z", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Zero points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('Z', 13)) mult = mult.times(upgradeEffect('Z', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
        title: "The First Upgrade",
        description: "Double your point gain.",
        cost: new Decimal(1),

        },
        12: {
            title: "The Second Upgrade",
            description: "Gain more points based on you Zero Points.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(0.1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    
        },
        13: {
                title: "Reverse",
                description: "Gain more Zero Points based on your Numbers",
                cost: new Decimal(10),
                effect() {
                    return player.points.add(0.2).pow(0.1)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
})
