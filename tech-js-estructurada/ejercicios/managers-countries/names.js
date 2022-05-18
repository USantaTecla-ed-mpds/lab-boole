const { Console } = require("console-mpds");
const console = new Console();

// 0-domains/managers/countries/4-programming/names.md

let userChoice;
const COUNTRIES = ["Uruguay", "Paraguay", "Gambia", "Djibouti", "Martinique", "Guam", "Georgia", "United States", "Belize", "Mauritius", "Lebanon", "Saudi Arabia", "Ecuador", "Marshall Islands", "Brazil", "Uganda", "Qatar", "Timor-Leste", "Mongolia", "Chile", "Liberia", "Nauru", "Réunion", "Montserrat", "Taiwan", "Antarctica", "Saint Pierre and Miquelon", "Argentina", "Togo", "Austria", "Grenada", "Faroe Islands", "Morocco", "Anguilla", "Palau", "Northern Mariana Islands", "Mauritania", "Ukraine", "China", "Lesotho", "Cyprus", "DR Congo", "Russia", "Bangladesh", "South Africa", "Curaçao", "Guatemala", "Puerto Rico", "Antigua and Barbuda", "Israel", "Guyana", "Cayman Islands", "Croatia", "Iceland", "Caribbean Netherlands", "Sint Maarten", "Namibia", "Dominica", "Gibraltar", "Senegal", "Saint Kitts and Nevis", "Oman", "Kuwait", "Åland Islands", "United States Virgin Islands", "Bouvet Island", "United Kingdom", "Honduras", "South Georgia", "Cambodia", "North Macedonia", "Iran", "Panama", "Cook Islands", "Andorra", "Burundi", "Trinidad and Tobago", "Comoros", "French Southern and Antarctic Lands", "Kosovo", "Nigeria", "Poland", "Niue", "New Caledonia", "Ethiopia", "Germany", "Azerbaijan", "Netherlands", "France", "Nepal", "Barbados", "Jersey", "India", "Kyrgyzstan", "South Sudan", "Iraq", "Italy", "Cuba", "Bhutan", "Bahamas", "Norway", "Lithuania", "Kenya", "Pitcairn Islands", "Sweden", "Guadeloupe", "Gabon", "Macau", "Guernsey", "Rwanda", "Syria", "Canada", "Algeria", "British Indian Ocean Territory", "Western Sahara", "Isle of Man", "Botswana", "Kazakhstan", "Venezuela", "French Polynesia", "Sudan", "Wallis and Futuna", "Slovakia", "Saint Barthélemy", "Christmas Island", "Solomon Islands", "Latvia", "British Virgin Islands", "Jamaica", "Afghanistan", "Serbia", "Tajikistan", "Tonga", "Kiribati", "Eritrea", "Mali", "Haiti", "Vanuatu", "Bosnia and Herzegovina", "Vatican City", "Benin", "Svalbard and Jan Mayen", "Samoa", "Bolivia", "Madagascar", "São Tomé and Príncipe", "Bahrain", "Greece", "Peru", "Suriname", "American Samoa", "Niger", "Thailand", "Tuvalu", "North Korea", "Ivory Coast", "Yemen", "New Zealand", "Armenia", "Pakistan", "Tokelau", "Malawi", "Ireland", "Philippines", "Czechia", "Myanmar", "Cocos (Keeling) Islands", "Romania", "Dominican Republic", "Equatorial Guinea", "Ghana", "Malta", "Turkey", "Egypt", "Mozambique", "Mayotte", "Belgium", "Slovenia", "Hungary", "United Arab Emirates", "Albania", "Heard Island and McDonald Islands", "Fiji", "San Marino", "Moldova", "Estonia", "Saint Vincent and the Grenadines", "United States Minor Outlying Islands", "Belarus", "Sri Lanka", "El Salvador", "Australia", "Bermuda", "Nicaragua", "Somalia", "Turks and Caicos Islands", "Micronesia", "Palestine", "Turkmenistan", "Burkina Faso", "Costa Rica", "Vietnam", "Cameroon", "French Guiana", "Eswatini", "Zambia", "Liechtenstein", "Montenegro", "Saint Lucia", "Uzbekistan", "Chad", "Aruba", "Denmark", "Japan", "Cape Verde", "Switzerland", "Hong Kong", "Bulgaria", "Jordan", "Republic of the Congo", "Laos", "Norfolk Island", "South Korea", "Tunisia", "Finland", "Zimbabwe", "Maldives", "Singapore", "Monaco", "Angola", "Malaysia", "Luxembourg", "Guinea", "Libya", "Spain", "Indonesia", "Seychelles", "Brunei", "Mexico", "Saint Helena", "Ascension and Tristan da Cunha", "Sierra Leone", "Central African Republic", "Greenland", "Colombia", "Papua New Guinea", "Falkland Islands", "Portugal", "Guinea-Bissau", "Saint Martin", "Tanzania" ];
const nCountries = COUNTRIES.length;

do {
    userChoice = console.readNumber(`1. Ver países\n2. Buscar país\n3. Salir\nEscoge opción [1-3]:`);
    switch (userChoice) {
        case 1:
            let countriesList = '';
            for (let i = 0; i < nCountries; i++) {
                let divider = i < nCountries - 1 ? ', ' : '.\n';
                countriesList += `${i + 1}. ${COUNTRIES[i]}${divider}`;
            }

            console.writeln(countriesList); //?
            break;

        case 2:
            let countryName = console.readString(`Dame el nombre del país:`);
            let countryExist;

            for (let i = 0; i < nCountries; i++) {
                if (COUNTRIES[i] === countryName) {
                    countryExist = true;
                }
            }

            console.writeln(`El país ${countryName} ${countryExist ? 'SÍ' : 'NO'} está incluido.\n`);
            break;
    }

} while (userChoice != 3);