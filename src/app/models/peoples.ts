export class People {
    gender: string;
    email: string;
    phone: string;
    nat: string;
    name: {
        first: string;
        last: string;
    }
    dob: {
        age: string;
    }
    id: {
        value: string;
    }
    location: {
        street: string;
        city: string;
        state: string;
        coordinates: {
            latitude: string;
            longitude: string;
        }
    }
    picture: {
        large: string;
        medium: string;
        thumb: string;
    }
}

let items = new People();