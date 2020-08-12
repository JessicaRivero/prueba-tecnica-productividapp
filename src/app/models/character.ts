import { Location } from "./location";
import { Origin } from "./origin";

export class Character {

    public id:number;
    public name: string;
    public status: string;
    public species: string;
    public type: string;
    public created: string;
    public gender: string;
    public image: string;
    public location: Location;
    public origin:Origin;
    public url: string;

    constructor(id,name,status,species,type,created,gender,image,location,origin,url) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = status;
        this.type = type;
        this.created = created;
        this.gender = gender;
        this.image = image;
        this.location = location;
        this.origin= origin;
        this.url = url;
    }

}