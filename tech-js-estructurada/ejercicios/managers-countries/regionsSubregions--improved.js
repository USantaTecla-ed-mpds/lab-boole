const { Console } = require("console-mpds");
const console = new Console();

// 0-domains/managers/countries/4-programming/regionsSubregions.md

const REGIONS = ["Americas", "Americas", "Africa", "Africa", "Americas", "Oceania", "Asia", "Americas", "Americas", "Africa", "Asia", "Asia", "Americas", "Oceania", "Americas", "Africa", "Asia", "Asia", "Asia", "Americas", "Africa", "Oceania", "Africa", "Americas", "Asia", "Antarctic", "Americas", "Americas", "Africa", "Europe", "Americas", "Europe", "Africa", "Americas", "Oceania", "Oceania", "Africa", "Europe", "Asia", "Africa", "Europe", "Africa", "Europe", "Asia", "Africa", "Americas", "Americas", "Americas", "Americas", "Asia", "Americas", "Americas", "Europe", "Europe", "Americas", "Americas", "Africa", "Americas", "Europe", "Africa", "Americas", "Asia", "Asia", "Europe", "Americas", "Antarctic", "Europe", "Americas", "Antarctic", "Asia", "Europe", "Asia", "Americas", "Oceania", "Europe", "Africa", "Americas", "Africa", "Antarctic", "Europe", "Africa", "Europe", "Oceania", "Oceania", "Africa", "Europe", "Asia", "Europe", "Europe", "Asia", "Americas", "Europe", "Asia", "Asia", "Africa", "Asia", "Europe", "Americas", "Asia", "Americas", "Europe", "Europe", "Africa", "Oceania", "Europe", "Americas", "Africa", "Asia", "Europe", "Africa", "Asia", "Americas", "Africa", "Africa", "Africa", "Europe", "Africa", "Asia", "Americas", "Oceania", "Africa", "Oceania", "Europe", "Americas", "Oceania", "Oceania", "Europe", "Americas", "Americas", "Asia", "Europe", "Asia", "Oceania", "Oceania", "Africa", "Africa", "Americas", "Oceania", "Europe", "Europe", "Africa", "Europe", "Oceania", "Americas", "Africa", "Africa", "Asia", "Europe", "Americas", "Americas", "Oceania", "Africa", "Asia", "Oceania", "Asia", "Africa", "Asia", "Oceania", "Asia", "Asia", "Oceania", "Africa", "Europe", "Asia", "Europe", "Asia", "Oceania", "Europe", "Americas", "Africa", "Africa", "Europe", "Asia", "Africa", "Africa", "Africa", "Europe", "Europe", "Europe", "Asia", "Europe", "Antarctic", "Oceania", "Europe", "Europe", "Europe", "Americas", "Americas", "Europe", "Asia", "Americas", "Oceania", "Americas", "Americas", "Africa", "Americas", "Oceania", "Asia", "Asia", "Africa", "Americas", "Asia", "Africa", "Americas", "Africa", "Africa", "Europe", "Europe", "Americas", "Asia", "Africa", "Americas", "Europe", "Asia", "Africa", "Europe", "Asia", "Europe", "Asia", "Africa", "Asia", "Oceania", "Asia", "Africa", "Europe", "Africa", "Asia", "Asia", "Europe", "Africa", "Asia", "Europe", "Africa", "Africa", "Europe", "Asia", "Africa", "Asia", "Americas", "Africa", "Africa", "Africa", "Americas", "Americas", "Oceania", "Americas", "Europe", "Africa", "Americas", "Africa"];
const SUBREGIONS = ["South America", "South America", "Western Africa", "Eastern Africa", "Caribbean", "Micronesia", "Western Asia", "North America", "Central America", "Eastern Africa", "Western Asia", "Western Asia", "South America", "Micronesia", "South America", "Eastern Africa", "Western Asia", "South-Eastern Asia", "Eastern Asia", "South America", "Western Africa", "Micronesia", "Eastern Africa", "Caribbean", "Eastern Asia", undefined, "North America", "South America", "Western Africa", "Central Europe", "Caribbean", "Northern Europe", "Northern Africa", "Caribbean", "Micronesia", "Micronesia", "Western Africa", "Eastern Europe", "Eastern Asia", "Southern Africa", "Southern Europe", "Middle Africa", "Eastern Europe", "Southern Asia", "Southern Africa", "Caribbean", "Central America", "Caribbean", "Caribbean", "Western Asia", "South America", "Caribbean", "Southeast Europe", "Northern Europe", "Caribbean", "Caribbean", "Southern Africa", "Caribbean", "Southern Europe", "Western Africa", "Caribbean", "Western Asia", "Western Asia", "Northern Europe", "Caribbean", undefined, "Northern Europe", "Central America", undefined, "South-Eastern Asia", "Southeast Europe", "Southern Asia", "Central America", "Polynesia", "Southern Europe", "Eastern Africa", "Caribbean", "Eastern Africa", undefined, "Southeast Europe", "Western Africa", "Central Europe", "Polynesia", "Melanesia", "Eastern Africa", "Western Europe", "Western Asia", "Western Europe", "Western Europe", "Southern Asia", "Caribbean", "Northern Europe", "Southern Asia", "Central Asia", "Middle Africa", "Western Asia", "Southern Europe", "Caribbean", "Southern Asia", "Caribbean", "Northern Europe", "Northern Europe", "Eastern Africa", "Polynesia", "Northern Europe", "Caribbean", "Middle Africa", "Eastern Asia", "Northern Europe", "Eastern Africa", "Western Asia", "North America", "Northern Africa", "Eastern Africa", "Northern Africa", "Northern Europe", "Southern Africa", "Central Asia", "South America", "Polynesia", "Northern Africa", "Polynesia", "Central Europe", "Caribbean", "Australia and New Zealand", "Melanesia", "Northern Europe", "Caribbean", "Caribbean", "Southern Asia", "Southeast Europe", "Central Asia", "Polynesia", "Micronesia", "Eastern Africa", "Western Africa", "Caribbean", "Melanesia", "Southeast Europe", "Southern Europe", "Western Africa", "Northern Europe", "Polynesia", "South America", "Eastern Africa", "Middle Africa", "Western Asia", "Southern Europe", "South America", "South America", "Polynesia", "Western Africa", "South-Eastern Asia", "Polynesia", "Eastern Asia", "Western Africa", "Western Asia", "Australia and New Zealand", "Western Asia", "Southern Asia", "Polynesia", "Eastern Africa", "Northern Europe", "South-Eastern Asia", "Central Europe", "South-Eastern Asia", "Australia and New Zealand", "Southeast Europe", "Caribbean", "Middle Africa", "Western Africa", "Southern Europe", "Western Asia", "Northern Africa", "Eastern Africa", "Eastern Africa", "Western Europe", "Central Europe", "Central Europe", "Western Asia", "Southeast Europe", undefined, "Melanesia", "Southern Europe", "Eastern Europe", "Northern Europe", "Caribbean", "North America", "Eastern Europe", "Southern Asia", "Central America", "Australia and New Zealand", "North America", "Central America", "Eastern Africa", "Caribbean", "Micronesia", "Western Asia", "Central Asia", "Western Africa", "Central America", "South-Eastern Asia", "Middle Africa", "South America", "Southern Africa", "Eastern Africa", "Western Europe", "Southeast Europe", "Caribbean", "Central Asia", "Middle Africa", "Caribbean", "Northern Europe", "Eastern Asia", "Western Africa", "Western Europe", "Eastern Asia", "Southeast Europe", "Western Asia", "Middle Africa", "South-Eastern Asia", "Australia and New Zealand", "Eastern Asia", "Northern Africa", "Northern Europe", "Southern Africa", "Southern Asia", "South-Eastern Asia", "Western Europe", "Middle Africa", "South-Eastern Asia", "Western Europe", "Western Africa", "Northern Africa", "Southern Europe", "South-Eastern Asia", "Eastern Africa", "South-Eastern Asia", "North America", "Western Africa", "Western Africa", "Middle Africa", "North America", "South America", "Melanesia", "South America", "Southern Europe", "Western Africa", "Caribbean", "Eastern Africa"];

let uniqueRegions = [];
for (let region of REGIONS) {
    let isUniqueRegion = true;
    for (let uniqueRegion of uniqueRegions) {
        if (region === uniqueRegion) {
            isUniqueRegion = false;
        }
    }
    if (isUniqueRegion) {
        uniqueRegions[uniqueRegions.length] = region;
    }
}

for (let uniqueRegion of uniqueRegions) {
    let uniqueSubregions = [];
    console.writeln(`\n${uniqueRegion}:`);

    for (let i = 0; i < REGIONS.length; i++) {
        if (REGIONS[i] === uniqueRegion) {
            for (let j = 0; j < SUBREGIONS.length; j++) {
                let isUniqueSubregion = true;
                for (let uniqueSubregion of uniqueSubregions) {
                    if (SUBREGIONS[i] === uniqueSubregion) {
                        isUniqueSubregion = false;
                    }
                }
                if (isUniqueSubregion) {
                    uniqueSubregions[uniqueSubregions.length] = SUBREGIONS[i];
                    if (SUBREGIONS[i] !== undefined) {
                        console.writeln(`\t ${SUBREGIONS[i]}`);
                    }
                }
            }
        }
    }
}
