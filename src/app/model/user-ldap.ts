export interface UserLdap {
  [x: string]: any;
  login: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  motDePasse: string;
  mail: string;
  role: string;
  employeNumero: number;
  emlpoyeNiveau: number;
  dateEmbauche: string;
  publisherId: number;
  active: boolean;
}
