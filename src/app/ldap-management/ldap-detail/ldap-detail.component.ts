import {Router} from "@angular/router";
import {UserLdap} from "../../model/user-ldap";
import {FormBuilder} from "@angular/forms";
import {ConfirmValidaParentMatcher, passwordValidator} from './passwords-validator.directive';


export abstract class LdapDetailComponent {
  user: UserLdap;
  processLoadRunning = false;
  processValidatedRunning = false;
  passwordPlaceHolder: string;
  confirmValidParentMatcher = new ConfirmValidaParentMatcher();
  errorMessage = '';

  userForm = this.fb.group({
    login: [''], //Valeur de départ vide
    nom: [''],
    prenom: [''],
    //Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator }),
    mail: {value: '', disabled: true },
  });

  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
    /*private route: ActivatedRoute*/
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé)');
  }
  protected OnInit(): void{

  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }
  goToLdap() : void {
    //this.router.navigate(['/users/list']);
    this.router.navigate(['/users/list']).then((e) => {
      if (! e) {
        console.log("Navigation has failed!");
      }
    });
  }

  updateLogin() : void {
    if (this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom')
        + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }
  updateMail() : void {
    if (this.addForm) {
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase()
        + '@domain.com');
    }
  }
  abstract  validateForm():void;

  onSubmitForm(): void {
    this.validateForm();
  }
  isFormValid() : boolean {
    return this.userForm.valid
      //Exemple de validation d'un champ :
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  protected copyUserToFormControl():void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('publisherId').setValue(this.user.publisherId);
    this.userForm.get('active').setValue(this.user.active);
  }
  protected  getUserFromFormControl():UserLdap {
    return {
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }

}
