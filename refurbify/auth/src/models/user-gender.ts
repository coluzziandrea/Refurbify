interface Gender {
  value: string;
  viewValue: string;
}

export class UserGender {
  public static values: Gender[] = [
    { value: 'maschio', viewValue: 'Maschio' },
    {
      value: 'femmina',
      viewValue: 'Femmina',
    },
  ];

  public static valuesArr: string[] = ['maschio', 'femmina'];
}
