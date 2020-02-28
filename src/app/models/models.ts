export interface IPerson {
  firstName: string;
  middleName: string;
  lastName: string;
}

export class Person implements IPerson {
  constructor(public firstName: string,
              public middleName: string,
              public lastName: string) {}
}
