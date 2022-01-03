import { Component, OnInit } from '@angular/core';
import {LdapDetailComponent} from "../ldap-detail/ldap-detail.component";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {UsersService} from "../service/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ldap-add',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit {

  constructor(private usersService: UsersService,
              fb: FormBuilder,
              router: Router,
              private snackBar: MatSnackBar) {
    super(true, fb, router);
  }

  ngOnInit(): void {
    super.OnInit();
  }
  validateForm():void{
    console.log('LdapAddComponent - validateForm');
    this.processValidatedRunning = true;
    this.usersService.addUser(this.getUserFromFormControl()).subscribe(
      data => {
        this.processValidatedRunning = false;
        this.errorMessage = '';
        this.snackBar.open('utilisateur ajouté !', 'X');
      },
      error => {
        this.processValidatedRunning = false;
        this.errorMessage = '';//L'utilisateur n'a pas pu être ajouté ! -> enlever car erreur à l'intérieur des cotes
        this.snackBar.open('Erreur dans l\'ajout de l\'utilisateur !', 'X');
      }
    );
  }

}
