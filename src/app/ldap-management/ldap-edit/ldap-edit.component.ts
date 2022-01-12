import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../service/users.service";
import {LdapDetailComponent} from "../ldap-detail/ldap-detail.component";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapEditComponent extends LdapDetailComponent implements OnInit {

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              fb: FormBuilder,
              router: Router,
              private snackBar: MatSnackBar) {
    super(false, fb, router);
  }

  ngOnInit(): void {
    super.OnInit();
    // Obtention de l'utilisateur
    this.getUser();
  }
  validateForm():void{
    console.log('LdapEditComponent - validateForm');
    this.processValidatedRunning = true;
    this.usersService.updateUser(this.getUserFromFormControl()).subscribe(
      data => {
        this.processValidatedRunning = false;
        this.errorMessage = '';
        this.snackBar.open('utilisateur modifié !', 'x');
      },
      error => {
        this.processValidatedRunning = false;
        this.errorMessage = 'Une erreur est survenue dans la modification !';   // ->enlever car erreur à l'intérieur des cotes
        this.snackBar.open('Utilisateur non modifié !', 'x');
      }
    );
  }
  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');
    this.processValidatedRunning = true;
    this.usersService.getUser(login).subscribe(
      user => {
        this.user = user;
        this.copyUserToFormControl();
        this.processValidatedRunning = false;
      },
      error => {
        this.processLoadRunning = false;
        this.errorMessage = 'L\'utilisateur n\'existe pas !';    // ->enlever car erreur à l'intérieur des cotes
        this.snackBar.open('Utilisateur non trouvé !', 'x');
      }
    );
  }

}
