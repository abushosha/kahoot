export interface Country {
    name: string;
    capital: string[];
    capitalWikipediaUrl: string;
    flag: string;
    region: string;
    subregion: string;
    population: number;
    area: number;
    unMember: boolean;
    startOfWeek: string;
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    googleMapUrl: string;
    timezones: string[];
    borders: string[];
    languages: {
        [key: string]: string;
    };
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    idd: string;
    code: string;
}
