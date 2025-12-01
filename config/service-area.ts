export const ALLOWED_POSTCODES = [
    // Central Auckland
    "1010", "1011", "1021", "1022", "1023", "1024", "1025", "1050", "1051", "1052",
    // North Shore
    "0620", "0622", "0624", "0626", "0627", "0629", "0630", "0632",
    // West Auckland
    "0600", "0602", "0604", "0610", "0612", "0614", "0618",
    // East Auckland
    "2010", "2012", "2013", "2014", "2016", "2019",
    // South Auckland
    "2022", "2023", "2024", "2025", "2102", "2103", "2104", "2105", "2110", "2112", "2113", "2120",
    // Add more postcodes as needed
];

export const isPostcodeAllowed = (postcode: string): boolean => {
    return ALLOWED_POSTCODES.includes(postcode);
};
