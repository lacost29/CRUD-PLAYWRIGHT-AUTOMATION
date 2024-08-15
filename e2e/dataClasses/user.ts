export class User {
  name: string;
  profession: string;
  dob: Date;

  constructor(name: string, profession: string, dob: Date) {
    this.name = name;
    this.profession = profession;
    this.dob = dob;
  }
}
