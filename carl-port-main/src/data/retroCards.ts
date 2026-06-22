import type { RetroCardData } from "../types/shared-types";

export const initialCards: RetroCardData[] = [
    {
        id: '1',
        name: 'SUPER MARIO',
        game: 'SUPER MARIO BROS. (1985)',
        badge: 'HERO',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaklEQVR42mNgGAU4gCbQAWJOIs3QBOJnQPwciPOJMUATiJ8C8X8o/YxYA56CNAD5z4g1QBeqGYaBeriaYYCmQPwBiwnvgTgPXQzZdkwvwGsAulegyTpf0NVhugtZM8w7cO/AXDNqAD4AAMz/HK7/r8LnAAAAAElFTkSuQmCC',
        stats: [
            { label: 'JUMP', value: 92 },
            { label: 'SPEED', value: 75 },
            { label: 'POWER', value: 80 }
        ],
        specialMove: 'FIREBALL'
    },
    {
        id: '2',
        name: 'PAC-MAN',
        game: 'PAC-MAN (1980)',
        badge: 'CLASSIC',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAY0lEQVR42mNgGAWDCmgC8TMgfo7GfwbEuiSaAVL7H4p/ArEuMQZoAvFPqKJnUPo5MQY8BeLnaPxnxBqgC8TPoPgZVA03YADVDNOMKeCFaobxcQE8GkG2Y3oBvwHoXhkFVAIAFw8crsW7hn4AAAAASUVORK5CYII=',
        stats: [
            { label: 'SPEED', value: 85 },
            { label: 'APPETITE', value: 100 },
            { label: 'EVASION', value: 88 }
        ],
        specialMove: 'GHOST CHOMPER'
    },
    {
        id: '3',
        name: 'SONIC',
        game: 'SONIC THE HEDGEHOG (1991)',
        badge: 'SPEEDSTER',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVR42mNgGAWDEmgC8XMgfg7Ez6D0cyDWJcYATSB+CsT/ofQzIA4kxoD/UPoZED8l1gBdIH4GxT+JNUATiD9ADfkAxHnEGqAJNQSGdYk1QBNqCIzWJdYAmFeew7xCrAF6QGwAxfoD75VRAAAjyx2u6hRrQAAAAABJRU5ErkJggg==',
        stats: [
            { label: 'SPEED', value: 99 },
            { label: 'JUMP', value: 82 },
            { label: 'ATTITUDE', value: 95 }
        ],
        specialMove: 'SPIN DASH'
    },
    {
        id: '4',
        name: 'LINK',
        game: 'THE LEGEND OF ZELDA (1986)',
        badge: 'LEGEND',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaklEQVR42mNgGAU4gCYQPwPi52j0MyDWJdIcTSB+CsT/gfgnEOcTYwC6QaS4QBdqyDMofk6sAZpA/AGIPwBxHrEGaALxczQXEm2AJhA/g2LiDYBphroKeAPQDXqGphmuGWYIcYaNAqoBABCfHK78kSlpAAAAAElFTkSuQmCC',
        stats: [
            { label: 'COURAGE', value: 97 },
            { label: 'WISDOM', value: 80 },
            { label: 'POWER', value: 85 }
        ],
        specialMove: 'MASTER SWORD'
    },
    {
        id: '5',
        name: 'SAMUS ARAN',
        game: 'METROID (1986)',
        badge: 'HUNTER',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaElEQVR42mNgGAU4gCYQPwPi51A6j0hz9IH4JxD/h+JnQKxLjAEw8AmIdYkxQBOIn8IMAeJ8Yg3QBOIPUEc8J9YAXah3YIboEmsAzPZnQJxHrAF6UO88I9YATajtz9BsJ84FWDS/GDUAFQAANV8cruoUa0AAAAAASUVORK5CYII=',
        stats: [
            { label: 'FIREPOWER', value: 95 },
            { label: 'DEFENSE', value: 90 },
            { label: 'AGILITY', value: 83 }
        ],
        specialMove: 'MORPH BALL'
    },
    {
        id: '6',
        name: 'RYU',
        game: 'STREET FIGHTER II (1991)',
        badge: 'FIGHTER',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR42mNgGAU4gCYQPwPi50CcR6Q5mkD8FIj/Q/EzINYlxgBNIH4KM4RYAzSB+AMQPwfiPGINgLkC5h1dYg2AeeMZEOcRa4AeVPMzYg3QhGp+RqwBmlDNz9BsJ84FWDS/GDUAFQAA5uEcrsUoZuIAAAAASUVORK5CYII=',
        stats: [
            { label: 'STRENGTH', value: 88 },
            { label: 'TECHNIQUE', value: 95 },
            { label: 'SPEED', value: 78 }
        ],
        specialMove: 'HADOUKEN'
    }
];